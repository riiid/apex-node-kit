variable "name" {
  type = "string"
}

resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.name}"
  description = "api for ${var.name}"
}

output "id" {
  value = "${aws_api_gateway_rest_api.api.id}"
}

output "root_resource_id" {
  value = "${aws_api_gateway_rest_api.api.root_resource_id}"
}
