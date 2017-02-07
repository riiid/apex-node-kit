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
 * resource ANY
 */

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${var.rest_api_id}"
  resource_id   = "${var.resource_id}"
  http_method   = "${var.method}"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "request_integration" {
  rest_api_id             = "${var.rest_api_id}"
  resource_id             = "${var.resource_id}"
  http_method             = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_function}/invocations"
  credentials             = "${var.credentials}"

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
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
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
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
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

resource "null_resource" "dummy" {
  depends_on = [
    "aws_api_gateway_integration_response.response_integration",
    "aws_api_gateway_method_response.200",
    "aws_api_gateway_integration.request_integration",
    "aws_api_gateway_method.method",
  ]
}

/**
 * outputs
 */
output "id" {
  value = "${null_resource.dummy.id}"
}
