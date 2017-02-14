import Middleware from 'middleware';
import html from 'html';
import gql from 'gql';

export default new Middleware()
  .get(() => html())
  .post(event => gql(event))
  .default(() => ({'Content-Type': 'text/plain', 'result': 'default response'}))
  .run();
