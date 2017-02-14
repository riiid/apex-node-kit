import {graphql} from 'graphql';
import schema from 'gql/schema';

export default ({body: {query, variables = {}}}) => {
  return graphql(schema, query, {}, {}, variables)
    .then(res => {
      if (res.errors) {
        throw new Error(res.errors);
      }
      return {
        'Content-Type': 'application/json',
        'result': res.data
      };
    });
};
