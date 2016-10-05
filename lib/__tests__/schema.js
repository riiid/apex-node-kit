import {graphql} from 'graphql';
import schema from '../schema.js';

describe('schema', () => {

  it('should work "query {hello}"', done => {
    graphql(schema, 'query {hello}').then(res => {
      const {data: {hello}} = res;
      expect(hello).toBe('hello');
      done();
    });
  });

  it('should work "mutation {createHello(prefix: "hello")}"', done => {
    graphql(schema, 'mutation {createHello(prefix: "hello")}').then(res => {
      const {data: {createHello}} = res;
      expect(createHello).toBe('hello world!');
      done();
    });
  });

});
