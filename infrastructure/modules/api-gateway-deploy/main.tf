variable rest_api_id {}

variable stage_name {}

variable description {
  default = ""
}

variable depends_id {}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = "${var.rest_api_id}"
  stage_name  = "${var.stage_name}"
  description = "${var.description}"

  provisioner "local-exec" {
    command = "echo 'Waited for ${var.depends_id} to complete'"
  }
}

output "id" {
  value = "${aws_api_gateway_deployment.deployment.id}"
}
