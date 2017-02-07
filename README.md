# ∆pex-node-kit

[![CircleCI](https://circleci.com/gh/riiid/apex-node-kit.svg?style=shield)](https://circleci.com/gh/riiid/apex-node-kit)

Riiid flavored [apex](https://github.com/apex/apex) starter kit.
Write & deploy [AWS Lambda](http://aws.amazon.com/lambda/) functions with `webpack` & `babel`. Enjoy :alien:

## start

```
$ git clone riiid/apex-node-kit <YOUR_DIR>
$ cd <YOUR_DIR>
$ npm run new
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
