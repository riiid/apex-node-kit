import {graphql} from 'graphql';
import schema from 'gql/schema';

export default ({body: {query}}) => {
  return graphql(schema, query)
    .then(res => {
      if (res.errors) {
        throw new Error(res.errors);
      }
      return {
        'Content-Type': 'application/json',
        result: res.data
      };
    });
};
