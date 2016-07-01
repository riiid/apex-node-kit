console.log('hello there');
export default (event, context, cb) => {
  cb(null, {event, context});
};
