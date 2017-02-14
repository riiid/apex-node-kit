import {Observable} from 'rxjs';
import Middleware from '../';

describe('middleware', () => {
  it('should pass with normal object.', done => {
    const response = {'Content-Type': 'text/html', 'result': 'html'};
    const event = {method: 'GET'};
    const context = {};
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual(response);
        done();
      });
  });

  it('should pass error without "Content-Type" in response.', done => {
    const response = {result: 'html'};
    const event = {method: 'GET'};
    const context = {};
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, (err, response) => {
        expect(err.message).toBe('response should contain "Content-Type".');
        expect(response).toBeUndefined();
        done();
      });
  });

  it('should pass error without "result" in response.', done => {
    const response = {'Content-Type': 'text/html'};
    const event = {method: 'GET'};
    const context = {};
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, (err, response) => {
        expect(err.message).toBe('response should contain "result".');
        expect(response).toBeUndefined();
        done();
      });
  });

  it('should pass error without matched middlewares.', done => {
    const response = {'Content-Type': 'text/html'};
    const event = {method: 'POST'};
    const context = {};
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, (err, response) => {
        expect(err.message).toBe('response cannot be null or undefined.');
        expect(response).toBeUndefined();
        done();
      });
  });

  it('should response default result without matched middlewares.', done => {
    const defaultResponse = {
      'Content-Type': 'application/json', 'result': 'ok'
    };
    const event = {};
    const context = {};
    new Middleware()
      .default(() => defaultResponse)
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual(defaultResponse);
        done();
      });
  });

  it('should response with "PATCH" method.', done => {
    const event = {method: 'PATCH'};
    const context = {};
    new Middleware()
      .patch(() => Observable.of({
        'Content-Type': 'application/json', 'result': 'patched'
      }))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        done();
      });
  });

  it('should response with "DELETE" method.', done => {
    const event = {method: 'DELETE'};
    const context = {};
    new Middleware()
      .delete(() => Observable.of({
        'Content-Type': 'application/json', 'result': 'deleted'
      }))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        done();
      });
  });

  it('should response converted result with use middleware.', done => {
    const defaultResponse = {'Content-Type': 'text/html', 'result': 0};
    const event = {};
    const context = {};
    new Middleware()
      .default(() => defaultResponse)
      .use(d => ({...d, result: d.result + 1}))
      .use(d => ({...d, result: d.result + 1}))
      .run()(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual({
          'Content-Type': 'text/html', 'result': 2
        });
        done();
      });
  });
});
