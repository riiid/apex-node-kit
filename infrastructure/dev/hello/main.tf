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

resource "aws_api_gateway_resource" "hello" {
  rest_api_id = "${var.api_id}"
  parent_id   = "${var.api_root_resource_id}"
  path_part   = "hello"
}

/**
 * resource ANY
 */

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${var.api_id}"
  resource_id   = "${aws_api_gateway_resource.hello.id}"
  http_method   = "ANY"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "request_integration" {
  rest_api_id             = "${var.api_id}"
  resource_id             = "${aws_api_gateway_resource.hello.id}"
  http_method             = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${var.lambda_function}/invocations"
  credentials             = "${var.role}"

  request_templates = {
    "application/json" = <<EOF
{
  "method": "$context.httpMethod",
  "body": $input.json('$')
}
EOF
  }
}

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.hello.id}"
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
  resource_id = "${aws_api_gateway_resource.hello.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,PATCH,OPTION'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
    "method.response.header.Content-Type"                 = "integration.response.body.Content-Type"
  }

  response_templates = {
    "text/html" = "$input.path('$.result')"
  }
}

output "url" {
  value = "https://${var.api_id}.execute-api.${var.region}.amazonaws.com/${var.environment}/${aws_api_gateway_resource.hello.path_part}"
}
