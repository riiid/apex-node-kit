variable "api_id" {}

variable "api_root_resource_id" {}

variable "region" {}

variable "environment" {}

variable "lambda_function" {}

resource "aws_api_gateway_resource" "graphql" {
  rest_api_id = "${var.api_id}"
  parent_id   = "${var.api_root_resource_id}"
  path_part   = "graphql"
}

module "graphql-post" {
  source          = "../../api-gateway-method"
  method          = "POST"
  rest_api_id     = "${var.api_id}"
  parent_id       = "${var.api_root_resource_id}"
  resource_id     = "${aws_api_gateway_resource.graphql.id}"
  aws_region      = "${var.region}"
  lambda_function = "${var.lambda_function}"
}

module "deploy" {
  source      = "../../api-gateway-deploy"
  rest_api_id = "${var.api_id}"
  stage_name  = "${var.environment}"
  depends_id  = "${module.graphql-post.id}"
}

output "url" {
  value = "https://${var.api_id}.execute-api.${var.region}.amazonaws.com/${var.environment}/graphql"
}
