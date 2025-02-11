terraform {
  cloud {
    organization = "hulk510"
    workspaces {
      name = "playground-prod"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.86.1"
    }
  }

  required_version = "1.10.5"
}

provider "aws" {
  region = var.aws_region
}
