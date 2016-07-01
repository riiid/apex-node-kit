variable "aws_region" {}

variable "rest_api_id" {}

variable "parent_id" {}

variable "resource_id" {}

variable "method" {}

variable "lambda_function" {}

variable "authorization" {
  type    = "string"
  default = "NONE"
}

variable "credentials" {
  type    = "string"
  default = "arn:aws:iam::432787031635:role/apigateway-lambda"
}

/**
 * resources
 */

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${var.rest_api_id}"
  resource_id   = "${var.resource_id}"
  http_method   = "${var.method}"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = "${var.rest_api_id}"
  resource_id             = "${var.resource_id}"
  http_method             = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "${aws_api_gateway_method.method.http_method}"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_function}/invocations"
  credentials             = "${var.credentials}"
}

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "response-integration" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"
}

resource "null_resource" "dummy" {
  depends_on = ["aws_api_gateway_integration_response.response-integration", "aws_api_gateway_method_response.200", "aws_api_gateway_integration.integration", "aws_api_gateway_method.method"]
}

/**
 * outputs
 */
output "id" {
  value = "${null_resource.dummy.id}"
}
