import {graphql} from 'graphql';
import schema from 'schema';

export default (event, context, cb) => {
  const {query} = event;
  graphql(schema, query).then(res => {
    if (res.errors) {
      return cb(res.error);
    }
    return cb(null, res.data);
  });
};
