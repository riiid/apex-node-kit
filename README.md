# ∆pex-node-kit

Riiid flavored [apex](https://github.com/apex/apex) starter kit.
Write your [AWS Lambda](http://aws.amazon.com/lambda/) functions with `webpack` & `babel`. Enjoy :alien:

## start

```
$ git clone riiid/apex-node-kit <YOUR_DIR>
$ cd <YOUR_DIR>
$ npm run new
```

open `project.json` and  update `name`, `role` props.

## deploy functions

```
$ apex deploy
$ apex invoke hello
$ apex logs hello
```

## deploy api gateway

following command will create rest api on [API Gateway](http://aws.amazon.com/api-gateway/) and connect deployed `hello` function.

```
$ apex infra get
$ apex infra plan
$ apex infra apply
```

## development

* create more functions under [functions](https://github.com/riiid/apex-node-kit/tree/master/functions) directory and deploy again.
* update more api resource with [main.tf](https://github.com/riiid/apex-node-kit/blob/master/infrastructure/dev/main.tf) and deploy again.
* lint function code with,

```
$ npm run lint
```
