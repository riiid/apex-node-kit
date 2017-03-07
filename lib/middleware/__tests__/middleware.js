import {Observable} from 'rxjs';
import Middleware from '../';

describe('middleware', () => {
  it('should pass with normal object.', done => {
    const response = {body: 'ok'};
    const event = {httpMethod: 'GET'};
    const context = {};
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual(response);
        done();
      });
  });

  it('should pass error without "body" in response.', done => {
    const response = {};
    const event = {httpMethod: 'GET'};
    const context = {};
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, (err, response) => {
        const {message} = JSON.parse(response.body);
        expect(err).toBeNull();
        expect(message).toBe('response should contain "body".');
        done();
      });
  });

  it('should pass error without matched middlewares.', done => {
    const event = {httpMethod: 'POST'};
    const context = {};
    new Middleware()
      .get(() => Observable.of({}))
      .run()(event, context, (err, response) => {
        const {message} = JSON.parse(response.body);
        expect(err).toBeNull();
        expect(message).toBe('response cannot be null or undefined.');
        done();
      });
  });

  it('should response default result without matched middlewares.', done => {
    const defaultResponse = {body: 'ok'};
    const event = {};
    const context = {};
    new Middleware()
      .default(() => defaultResponse)
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual({
          'statusCode': 200,
          'headers': {
            'Content-Type': 'text/plain'
          },
          ...defaultResponse
        });
        done();
      });
  });

  it('should response with "PATCH" method.', done => {
    const event = {httpMethod: 'PATCH'};
    const context = {};
    new Middleware()
      .patch(() => Observable.of({body: 'patched'}))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body).toBe('patched');
        done();
      });
  });

  it('should response with "DELETE" method.', done => {
    const event = {httpMethod: 'DELETE'};
    const context = {};
    new Middleware()
      .delete(() => Observable.of({body: 'deleted'}))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body).toBe('deleted');
        done();
      });
  });

  it('should response with "OPTIONS" method.', done => {
    const event = {httpMethod: 'OPTIONS'};
    const context = {};
    new Middleware()
      .options()
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body).toBe('');
        done();
      });
  });

  it('should response converted result with use middleware.', done => {
    const defaultResponse = {body: 0};
    const event = {};
    const context = {};
    new Middleware()
      .default(() => defaultResponse)
      .use(d => ({...d, body: d.body+ 1}))
      .use(d => ({...d, body: d.body+ 1}))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body).toBe(2);
        done();
      });
  });
});
