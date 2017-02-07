const path = require('path');
const prompt = require('prompt');
const utils = require('./utils');
const banner = require('./banner');

const SCHEMA = {
  properties: {
    name: {
      message: 'name',
      required: true,
      default: path.basename(utils.root)
    },
    description: {
      message: 'description'
    },
    role_lambda: {
      message: 'IAM role for Lambda',
      required: true
    },
    role_agw: {
      message: 'IAM role for API Gateway',
      required: true
    },
  }
};

prompt.message = '';
prompt.delimiter = ':';
prompt.colors = false;
prompt.run = cb => {
  banner();
  utils.nl();
  prompt.start();
  prompt.get(SCHEMA, (err, result) => {
    utils.nl();
    cb(err, result);
    utils.nl();
  });
};

module.exports = prompt;
