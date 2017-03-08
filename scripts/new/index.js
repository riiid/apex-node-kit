require('colors');
const prompt = require('./prompt');
const Init = require('./init');

prompt.run$().subscribe(result => {
  Init.create(result)
    .run()
    .result();
}, err => {
  console.error('canceled'.red);
});
