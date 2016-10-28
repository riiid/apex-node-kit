import hello$ from 'hello';

export default (event, context, cb) => {
  hello$().subscribe(msg => {
    cb(null, msg);
  }, err => {
    cb(err);
  });
};
