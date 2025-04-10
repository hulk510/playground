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
      version = "5.94.1"
    }
  }

  required_version = "1.11.4"
}

provider "aws" {
  region = var.aws_region
}
