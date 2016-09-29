require('colors');
const utils = require('./utils');

module.exports = () => {
  utils.nl();
  console.log('   ┌─────────────────┐');
  console.log('   |', ' ∆pex-node-kit '.white, '|');
  console.log('   └─────────────────┘');

  utils.nl();
  console.log('Enter information of your project.');
};
