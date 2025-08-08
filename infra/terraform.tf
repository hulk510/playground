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
      version = "6.8.0"
    }
  }

  required_version = "1.12.2"
}

provider "aws" {
  region = var.aws_region
}
