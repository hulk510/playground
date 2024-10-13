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
      version = "5.71.0"
    }
  }

  required_version = "1.9.7"
}

provider "aws" {
  region = var.aws_region
}
