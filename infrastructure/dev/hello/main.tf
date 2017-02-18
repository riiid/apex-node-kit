variable "api_id" {}

variable "api_root_resource_id" {}

variable "region" {}

variable "environment" {}

variable "lambda_function" {}

variable "authorization" {
  type    = "string"
  default = "NONE"
}

variable "role" {}

resource "aws_api_gateway_resource" "res" {
  rest_api_id = "${var.api_id}"
  parent_id   = "${var.api_root_resource_id}"
  path_part   = "{proxy+}"
}

/**
 * resource ANY
 */

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${var.api_id}"
  resource_id   = "${aws_api_gateway_resource.res.id}"
  http_method   = "ANY"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "request_integration" {
  rest_api_id             = "${var.api_id}"
  resource_id             = "${aws_api_gateway_resource.res.id}"
  http_method             = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${var.lambda_function}/invocations"
  credentials             = "${var.role}"
}

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.res.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Content-Type"                 = true
  }
}

resource "aws_api_gateway_integration_response" "response_integration" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.res.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"
}

output "url" {
  value = "https://${var.api_id}.execute-api.${var.region}.amazonaws.com/${var.environment}/${aws_api_gateway_resource.res.path_part}"
}
