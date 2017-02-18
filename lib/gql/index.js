import {graphql} from 'graphql';
import schema from 'gql/schema';

/* eslint max-len: 0 */
export default ({body}) => {
  const {query, variables = {}} = JSON.parse(body);
  return graphql(schema, query, {}, {}, variables)
    .then(res => {
      if (res.errors) {
        throw new Error(res.errors);
      }
      return {
        'headers': {
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTION',
          'Access-Controll-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(res.data, null, 2)
      };
    });
};
