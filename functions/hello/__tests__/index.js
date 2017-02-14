import func from '../';

describe('functions/hello', () => {
  describe('GET', () => {
    it('should response "text/html" with "GET" request.', done => {
      const event = {method: 'GET'};
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response['Content-Type']).toBe('text/html');
        done();
      });
    });
  });

  describe('POST', () => {
    it('should response with "query {hello}"', done => {
      const event = {
        method: 'POST', body: {query: 'query {hello}'}
      };
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.result).toEqual({hello: 'hello'});
        expect(response['Content-Type']).toBe('application/json');
        done();
      });
    });

    it('should response with "query {helloAsync}".', done => {
      const event = {
        method: 'POST', body: {query: 'query {helloAsync}'}
      };
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.result).toEqual({helloAsync: 'hello async'});
        expect(response['Content-Type']).toBe('application/json');
        done();
      });
    });

    it('should response with "mutation".', done => {
      const query = `
        mutation {
          createHello(prefix: "wow")
        }
      `;
      const event = {method: 'POST', body: {query}};
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.result).toEqual({createHello: 'wow world!'});
        expect(response['Content-Type']).toBe('application/json');
        done();
      });
    });

    it('should response error with invalid query.', done => {
      const event = {
        method: 'POST', body: {query: 'query hello}'}
      };
      const context = {};
      func(event, context, (err, response) => {
        expect(err).not.toBeNull();
        done();
      });
    });
  });

  describe('ETC', () => {
    it('should response "text/plain" with unmatched request.', done => {
      const event = {method: 'ANY'};
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response['Content-Type']).toBe('text/plain');
        done();
      });
    });
  });
});
