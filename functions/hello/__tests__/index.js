import func from '../';

describe('functions/hello', () => {
  describe('GET', () => {
    it('should response "text/html" with "GET" request.', done => {
      const event = {httpMethod: 'GET'};
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.headers['Content-Type']).toBe('text/html');
        done();
      });
    });
  });

  describe('POST', () => {
    it('should response with "query {hello}"', done => {
      const event = {
        httpMethod: 'POST', body: JSON.stringify({query: 'query {hello}'})
      };
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body)
          .toEqual(JSON.stringify({hello: 'hello'}, null, 2));
        expect(response.headers['Content-Type']).toBe('application/json');
        done();
      });
    });

    it('should response with "query {helloAsync}".', done => {
      const event = {
        httpMethod: 'POST', body: JSON.stringify({query: 'query {helloAsync}'})
      };
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body)
          .toEqual(JSON.stringify({helloAsync: 'hello async'}, null, 2));
        expect(response.headers['Content-Type']).toBe('application/json');
        done();
      });
    });

    it('should response with "mutation".', done => {
      const query = `
        mutation {
          createHello(prefix: "wow")
        }
      `;
      const event = {httpMethod: 'POST', body: JSON.stringify({query})};
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.body)
          .toEqual(JSON.stringify({createHello: 'wow world!'}, null, 2));
        expect(response.headers['Content-Type']).toBe('application/json');
        done();
      });
    });

    it('should response error with invalid query.', done => {
      const event = {
        httpMethod: 'POST', body: JSON.stringify({query: 'query hello}'})
      };
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  describe('ETC', () => {
    it('should response "text/plain" with unmatched request.', done => {
      const event = {httpMethod: 'ANY'};
      const context = {};
      func(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.headers['Content-Type']).toBe('text/plain');
        done();
      });
    });
  });
});
