variable "name" {}

variable "aws_region" {}

variable "apex_function_api" {}

variable "apex_function_api_name" {}

variable "api-gateway-role" {}

variable "deploy_stage" {}

variable "deploy_description" {}

resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.name}"
  description = "gateway for ${var.name}"
}

module "api" {
  source               = "./api"
  api_id               = "${aws_api_gateway_rest_api.api.id}"
  api_root_resource_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
  region               = "${var.aws_region}"
  stage                = "${var.deploy_stage}"
  lambda_function      = "${var.apex_function_api}"
  role                 = "${var.api-gateway-role}"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.deploy_stage}"
  description = "${var.deploy_description}"

  variables = {
    func  = "${var.apex_function_api_name}"
    alias = "current"
  }

  depends_on = [
    "module.api",
  ]
}

output "url" {
  value = "${module.api.url}"
}
