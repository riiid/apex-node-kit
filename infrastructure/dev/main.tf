variable "name" {}

variable "aws_region" {}

variable "apex_environment" {}

variable "apex_function_hello" {}

variable "api-gateway-role" {}

variable "deploy_description" {
  default = ""
}

resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.name}"
  description = "api for ${var.name}"
}

module "hello" {
  source               = "./hello"
  api_id               = "${aws_api_gateway_rest_api.api.id}"
  api_root_resource_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
  region               = "${var.aws_region}"
  environment          = "${var.apex_environment}"
  lambda_function      = "${var.apex_function_hello}"
  role                 = "${var.api-gateway-role}"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.apex_environment}"
  description = "${var.deploy_description}"

  depends_on = [
    "module.hello",
  ]
}

output "hello-url" {
  value = "${module.hello.url}"
}
