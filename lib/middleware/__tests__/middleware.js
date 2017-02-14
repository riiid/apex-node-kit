import {Observable} from 'rxjs';
import Middleware from '../';

describe('middleware', () => {
  it('should pass with normal object.', done => {
    const response = {'Content-Type': 'text/html', result: 'html'};
    const event = {method: 'GET'};
    const context = {};
    const cb = (err, response) => {
      expect(err).toBeNull();
      expect(response).toEqual(response)
      done();
    };
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, cb);
  });

  it("should pass error without 'Content-Type' in response.", done => {
    const response = {result: 'html'};
    const event = {method: 'GET'};
    const context = {};
    const cb = (err, response) => {
      expect(err.message).toBe("response should contain 'Content-Type'.")
      expect(response).toBeUndefined();
      done();
    };
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, cb);
  });

  it("should pass error without 'result' in response.", done => {
    const response = {'Content-Type': 'text/html'};
    const event = {method: 'GET'};
    const context = {};
    const cb = (err, response) => {
      expect(err.message).toBe("response should contain 'result'.")
      expect(response).toBeUndefined();
      done();
    };
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, cb);
  });

  it("should pass error without matched middlewares.", done => {
    const response = {'Content-Type': 'text/html'};
    const event = {method: 'POST'};
    const context = {};
    const cb = (err, response) => {
      expect(err.message).toBe("response cannot be null or undefined.")
      expect(response).toBeUndefined();
      done();
    };
    new Middleware()
      .get(() => Observable.of(response))
      .run()(event, context, cb);
  });

  it("should response default result without method middlewares.", done => {
    const defaultResponse = {'Content-Type': 'application/json', result: 'ok'};
    const event = {};
    const context = {};
    const cb = (err, response) => {
      expect(err).toBeNull();
      expect(response).toEqual(defaultResponse);
      done();
    };
    new Middleware()
      .default(() => defaultResponse)
      .run()(event, context, cb);
  });

  it("should response converted result with use middleware.", done => {
    const defaultResponse = {'Content-Type': 'text/html', result: 0};
    const event = {};
    const context = {};
    const cb = (err, response) => {
      expect(err).toBeNull();
      expect(response).toEqual({
        'Content-Type': 'text/html', result: 2
      });
      done();
    };
    new Middleware()
      .default(() => defaultResponse)
      .use(d => ({...d, result: d.result + 1}))
      .use(d => ({...d, result: d.result + 1}))
      .run()(event, context, cb);
  });
});
