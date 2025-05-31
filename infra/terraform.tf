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
      version = "5.99.1"
    }
  }

  required_version = "1.12.1"
}

provider "aws" {
  region = var.aws_region
}
