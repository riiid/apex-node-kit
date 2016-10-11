require('colors');

const values = require('lodash.values');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const rimraf = require('rimraf');
const pkg = require('../../package');
const project = require('../../project');

function Result(prefix) {
  this.prefix = prefix;
  this.result = {};
}

Result.prototype.add = function(result) {
  Object.assign(this.result, result);
};

Result.prototype.print = function() {
  values(this.result)
  .forEach(t => {
    console.log(`${this.prefix} ${t}`);
  });
};

function Init(prompt) {
  this.prompt = prompt || {};
  this.created = new Result('  [+] created'.green);
  this.deleted = new Result('  [-] deleted'.red);
  this.updated = new Result('  [*] updated'.yellow);
}

Init.prototype.git = function() {
  try {
    rimraf.sync(path.join(utils.root, '.git'));
    this.deleted.add({git: '.git'});
  } catch (err) {
  }
};

Init.prototype.pkg = function() {
  try {
    var _opt = this.prompt;
    var _pkg = Object.assign(pkg, {
      name: _opt.name,
      version: '0.0.1',
      description: _opt.description,
      homepage: '',
      author: ''
    });
    var filepath = path.join(utils.root, 'package.json');
    fs.writeFileSync(filepath, JSON.stringify(_pkg, null, 2));
    this.updated.add({pkg: 'package.json'});
  } catch (err) {
  }
};

Init.prototype.tfvars = function() {
  try {
    var _opt = this.prompt;
    var _tfvars = {
      name: _opt.name
    };
    var filepath = path.join(utils.root, 'infrastructure', 'dev', 'terraform.tfvars');
    fs.writeFileSync(filepath, JSON.stringify(_tfvars, null, 2));
    this.created.add({tfvars: 'infrastructure/dev/terraform.tfvars'});
  } catch (err) {
  }
}

Init.prototype.project= function() {
  try {
    var _opt = this.prompt;
    var _project = Object.assign(project, {
      name: _opt.name,
      role: _opt.role,
      description: _opt.description
    });
    var filepath = path.join(utils.root, 'project.json');
    fs.writeFileSync(filepath, JSON.stringify(_project, null, 2));
    this.updated.add({proect: 'project.json'});
  } catch (err) {
  }
};

Init.prototype.readme = function() {
  try {
    fs.writeFileSync(path.join(utils.root, 'README.md'), `# ${this.prompt.name}

${this.prompt.description}

## development

\`\`\`
$ npm run lint
$ npm test
\`\`\`

## deploy function

\`\`\`
$ apex deploy
$ echo -n '{"query": "query{hello}"}' | apex invoke graphql
\`\`\`

## deploy infra

\`\`\`
$ apex infra get
$ apex infra plan
$ apex infra apply
<url>
$ curl -H "Content-Type: application/json" -d '{"query": "query{hello}"}' <url>/dev/graphql
\`\`\``);
    this.updated.add({readme: 'README.md'});
  } catch (err) {
  }
};

Init.prototype.run = function() {
  this.pkg();
  this.tfvars();
  this.project();
  this.git();
  this.readme();
  return this;
};

Init.prototype.result = function() {
  this.created.print();
  this.deleted.print();
  this.updated.print();
  return this;
};

Init.create = prompt => new Init(prompt);

module.exports = Init;
