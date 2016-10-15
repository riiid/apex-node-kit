import {graphql} from 'graphql';
import schema from '../schema.js';

describe('schema', () => {
  it('should work "query {hello}"', () => {
    return graphql(schema, 'query {hello}').then(res => {
      const {data: {hello}} = res;
      expect(hello).toBe('hello');
    });
  });

  it('should work "query {helloAsync}"', () => {
    return graphql(schema, 'query {helloAsync}').then(res => {
      const {data: {helloAsync}} = res;
      expect(helloAsync).toBe('hello');
    });
  });

  it('should work "mutation {createHello(prefix: "hello")}"', () => {
    graphql(schema, 'mutation {createHello(prefix: "hello")}').then(res => {
      const {data: {createHello}} = res;
      expect(createHello).toBe('hello world!');
    });
  });
});
