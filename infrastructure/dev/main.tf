variable "aws_region" {}

variable "apex_environment" {}

variable "apex_function_graphql" {}

module "api" {
  source = "../api-gateway-rest-api"
  name   = "apex-node-kit"
}

module "graphql" {
  source               = "./graphql"
  api_id               = "${module.api.id}"
  api_root_resource_id = "${module.api.root_resource_id}"
  region               = "${var.aws_region}"
  environment          = "${var.apex_environment}"
  lambda_function      = "${var.apex_function_graphql}"
}

output "graphql-url" {
  value = "${module.graphql.url}"
}
