module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "playground-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-northeast-1a", "ap-northeast-1c"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.101.0/24"]

  enable_nat_gateway            = false
  enable_vpn_gateway            = false
  manage_default_route_table    = false
  manage_default_security_group = false

  tags = {
    Terraform   = "true"
    Environment = "prod"
  }
}

module "endpoints" {
  source = "terraform-aws-modules/vpc/aws//modules/vpc-endpoints"

  vpc_id = module.vpc.vpc_id

  create_security_group      = true
  security_group_name_prefix = "playground-vpc-endpoints-"
  security_group_description = "VPC endpoint security group"
  security_group_rules = {
    ingress_https = {
      description = "HTTPS from VPC"
      cidr_blocks = [module.vpc.vpc_cidr_block]
    }
  }


  endpoints = {
    ecs_telemetry = {
      service             = "logs"
      private_dns_enabled = true
      subnet_ids          = module.vpc.private_subnets
    },
    ecr_api = {
      service             = "ecr.api"
      private_dns_enabled = true
      subnet_ids          = module.vpc.private_subnets
    },
    ecr_dkr = {
      service             = "ecr.dkr"
      private_dns_enabled = true
      subnet_ids          = module.vpc.private_subnets
    },
    s3 = {
      service         = "s3"
      service_type    = "Gateway"
      route_table_ids = module.vpc.private_route_table_ids
    },
  }

  tags = {
    Owner       = "user"
    Environment = "dev"
  }
}

module "ecr" {
  source = "terraform-aws-modules/ecr/aws"

  repository_name = "playground-ecr-repo"
  repository_lifecycle_policy = jsonencode({
    rules = [
      {
        rulePriority = 1,
        description  = "Keep last 30 images",
        selection = {
          tagStatus     = "tagged",
          tagPrefixList = ["v"],
          countType     = "imageCountMoreThan",
          countNumber   = 30
        },
        action = {
          type = "expire"
        }
      }
    ]
  })
  tags = {
    Terraform   = "true"
    Environment = "prod"
  }
}

module "ecs" {
  source = "terraform-aws-modules/ecs/aws"

  cluster_name = "playground-ecs-cluster"

  fargate_capacity_providers = {
    FARGATE = {
      default_capacity_provider_strategy = {
        weight = 50
      }
    }
    FARGATE_SPOT = {
      default_capacity_provider_strategy = {
        weight = 50
      }
    }
  }

  services = {
    frontend = {
      cpu    = 512
      memory = 1024

      # Container definition(s)
      container_definitions = {
        ecs-sample = {
          cpu       = 512
          memory    = 1024
          essential = true
          image     = "${module.ecr.repository_url}"
          port_mappings = [
            {
              name          = "ecs-sample"
              containerPort = 80
              protocol      = "tcp"
            }
          ]

          # 必要に応じて変える
          readonly_root_filesystem = false
        }
      }

      load_balancer = {
        service = {
          target_group_arn = module.alb.target_groups["ecs_target_group"].arn
          container_name   = "ecs-sample"
          container_port   = 80
        }
      }

      security_group_rules = {
        alb_ingress_3000 = {
          type                     = "ingress"
          from_port                = 80
          to_port                  = 80
          protocol                 = "tcp"
          description              = "Service port"
          source_security_group_id = module.alb.security_group_id
        }
        egress_all = {
          type        = "egress"
          from_port   = 0
          to_port     = 0
          protocol    = "-1"
          cidr_blocks = ["0.0.0.0/0"]
        }
      }

      subnet_ids = [module.vpc.private_subnets[0]]
    }
  }

  tags = {
    Environment = "Development"
    Project     = "Example"
  }
}

# module "zones" {
#   source = "terraform-aws-modules/route53/aws//modules/zones"
#   zones = {
#     "terraform-aws-modules-example.com" = {
#       comment = "terraform-aws-modules-examples.com (production)"
#       tags = {
#         env = "production"
#       }
#     }
#   }

#   tags = {
#     ManagedBy = "Terraform"
#   }
# }

# module "acm" {
#   source = "terraform-module/acm/aws"

#   domain_name = module.zones.route53_zone_name["terraform-aws-modules-example.com"]
#   zone_id     = module.zones.route53_zone_zone_id["terraform-aws-modules-example.com"]

#   validation_method = "DNS"
#   depends_on        = [module.zones]
# }

module "alb" {
  source = "terraform-aws-modules/alb/aws"

  name    = "playground-alb"
  vpc_id  = module.vpc.vpc_id
  subnets = [module.vpc.public_subnets[0], module.vpc.public_subnets[1]]

  enable_deletion_protection = false

  security_group_name = "playground-alb-sg"
  security_group_ingress_rules = {
    all_http = {
      from_port   = 80
      to_port     = 80
      ip_protocol = "tcp"
      description = "HTTP web traffic"
      cidr_ipv4   = "0.0.0.0/0"
    }
    all_https = {
      from_port   = 443
      to_port     = 443
      ip_protocol = "tcp"
      description = "HTTPS web traffic"
      cidr_ipv4   = "0.0.0.0/0"
    }
  }
  security_group_egress_rules = {
    all = {
      ip_protocol = "-1"
      cidr_ipv4   = "10.0.0.0/16"
    }
  }

  # access_logs = {
  #   bucket = "my-alb-logs"
  # }

  listeners = {
    http = {
      port     = 80
      protocol = "HTTP"
      forward = {
        target_group_key = "ecs_target_group"
      }
    }
    # https = {
    #   port     = 443
    #   protocol = "HTTPS"
    #   # certificate_arn = module.acm.arn

    #   # forward = {
    #   # target_group_key = "ecs_target_group"
    #   # }
    # }
  }

  target_groups = {
    ecs_target_group = {
      name              = "playground-ecs-tg"
      port              = 80
      protocol          = "HTTP"
      target_type       = "ip"
      create_attachment = false
      health_check = {
        enabled             = true
        healthy_threshold   = 5
        interval            = 30
        matcher             = "200"
        path                = "/"
        port                = "traffic-port"
        protocol            = "HTTP"
        timeout             = 5
        unhealthy_threshold = 2
      }
    }
  }
  # wafの設定
}
