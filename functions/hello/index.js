import Middleware from 'middleware';
import html from 'html';
import gql from 'gql';

export default new Middleware()
  .get(event => html(event))
  .post(event => gql(event))
  .default(() => ({body: 'default response'}))
  .run();
