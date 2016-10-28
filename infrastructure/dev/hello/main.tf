variable "api_id" {}

variable "api_root_resource_id" {}

variable "region" {}

variable "environment" {}

variable "lambda_function" {}

resource "aws_api_gateway_resource" "hello" {
  rest_api_id = "${var.api_id}"
  parent_id   = "${var.api_root_resource_id}"
  path_part   = "hello"
}

module "hello-post" {
  source          = "../../modules/api-gateway-method-post"
  method          = "POST"
  rest_api_id     = "${var.api_id}"
  parent_id       = "${var.api_root_resource_id}"
  resource_id     = "${aws_api_gateway_resource.hello.id}"
  aws_region      = "${var.region}"
  lambda_function = "${var.lambda_function}"
}

module "deploy" {
  source      = "../../modules/api-gateway-deploy"
  rest_api_id = "${var.api_id}"
  stage_name  = "${var.environment}"
  depends_id  = "${module.hello-post.id}"
}

output "url" {
  value = "https://${var.api_id}.execute-api.${var.region}.amazonaws.com/${var.environment}/hello"
}
