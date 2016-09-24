variable "lambda_function" {}

variable "rule_name" {}

variable "description" {}

variable "schedule_expression" {
  type    = "string"
  default = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_rule" "rule" {
  name                = "${var.rule_name}"
  description         = "${var.description}"
  schedule_expression = "${var.schedule_expression}"
}

resource "aws_cloudwatch_event_target" "tweet_every_thirty_minutes" {
  rule = "${aws_cloudwatch_event_rule.rule.name}"
  arn  = "${var.lambda_function}"
}

resource "aws_lambda_permission" "allow" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = "${var.lambda_function}"
  principal     = "events.amazonaws.com"
  source_arn    = "${aws_cloudwatch_event_rule.rule.arn}"
}
