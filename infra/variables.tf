variable "aws_region" {
  description = "AWS region to launch the instance"
  type        = string
  default     = "ap-northeast-1"
}

variable "docker_username" {
  description = "Dockerhub username"
  type        = string
}

variable "docker_password" {
  description = "Dockerhub password"
  type        = string
}
