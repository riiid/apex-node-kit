# ∆pex-node-kit

[![CircleCI](https://circleci.com/gh/riiid/apex-node-kit.svg?style=shield)](https://circleci.com/gh/riiid/apex-node-kit)

Riiid flavored simple backend starter kit with [apex](https://github.com/apex/apex).
Write & deploy [AWS Lambda](http://aws.amazon.com/lambda/) functions with `webpack` & `babel`. Enjoy :alien:

## features

* Handle every http method (`GET`, `POST` ...) in single lambda function.
* Support React Server Side Rendering with `GET` request.
* Support Graphql query with `POST` request.

## start

```
$ git clone riiid/apex-node-kit <YOUR_DIR>
$ cd <YOUR_DIR>
$ npm run new
```

## development

```
$ npm run lint
$ npm run test:dev
```

## deploy

### lambda functions

```
$ apex deploy
```

### api gateway

after deploy lambda functions,

```
$ apex infra get
$ apex infra plan
$ apex infra apply
```

> Because of this [issue](https://github.com/hashicorp/terraform/issues/6613), you need to `taint` resource for multiple deployment.
> ```
> $ apex infra taint aws_api_gateway_deployment.deployment
> $ apex infra apply
> ```
