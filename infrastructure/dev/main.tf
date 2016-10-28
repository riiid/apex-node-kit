variable "name" {}

variable "aws_region" {}

variable "apex_environment" {}

variable "apex_function_hello" {}

module "api" {
  source = "../modules/api-gateway-rest-api"
  name   = "${var.name}"
}

module "hello" {
  source               = "./hello"
  api_id               = "${module.api.id}"
  api_root_resource_id = "${module.api.root_resource_id}"
  region               = "${var.aws_region}"
  environment          = "${var.apex_environment}"
  lambda_function      = "${var.apex_function_hello}"
}

output "hello-url" {
  value = "${module.hello.url}"
}
