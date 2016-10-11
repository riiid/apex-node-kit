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
 * resources post
 */

resource "aws_api_gateway_method" "method_post" {
  rest_api_id   = "${var.rest_api_id}"
  resource_id   = "${var.resource_id}"
  http_method   = "${var.method}"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "integration_post" {
  rest_api_id             = "${var.rest_api_id}"
  resource_id             = "${var.resource_id}"
  http_method             = "${aws_api_gateway_method.method_post.http_method}"
  integration_http_method = "${aws_api_gateway_method.method_post.http_method}"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_function}/invocations"
  credentials             = "${var.credentials}"

  request_templates = {
    "application/x-www-form-urlencoded" = <<EOF
{
  "postBody": $input.json('$')
}
EOF
  }
}

resource "aws_api_gateway_method_response" "200_post" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method_post.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "response_integration_post" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method_post.http_method}"
  status_code = "${aws_api_gateway_method_response.200_post.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

/**
 * resources option
 */

resource "aws_api_gateway_method" "method_option" {
  rest_api_id   = "${var.rest_api_id}"
  resource_id   = "${var.resource_id}"
  http_method   = "OPTIONS"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "integration_option" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method_option.http_method}"
  type        = "MOCK"

  request_templates = {
    "application/json" = <<EOF
{
  "statusCode": 200
}
EOF
  }
}

resource "aws_api_gateway_method_response" "200_option" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method_option.http_method}"
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "response_integration_option" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method_option.http_method}"
  status_code = "${aws_api_gateway_method_response.200_option.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

resource "null_resource" "dummy" {
  depends_on = [
    "aws_api_gateway_integration_response.response_integration_option",
    "aws_api_gateway_method_response.200_option",
    "aws_api_gateway_integration.integration_option",
    "aws_api_gateway_method.method_option",
    "aws_api_gateway_integration_response.response_integration_post",
    "aws_api_gateway_method_response.200_post",
    "aws_api_gateway_integration.integration_post",
    "aws_api_gateway_method.method_post",
  ]
}

/**
 * outputs
 */
output "id" {
  value = "${null_resource.dummy.id}"
}
