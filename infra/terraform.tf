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
      version = "6.17.0"
    }
  }

  required_version = "1.13.4"
}

provider "aws" {
  region = var.aws_region
}
