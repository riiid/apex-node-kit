import func from '../';

describe('functions/hello', () => {
  it('should response "text/html" with "GET" method', done => {
    const event = {method: 'GET'};
    const context = {};
    func(event, context, (err, response) => {
      expect(err).toBeNull();
      expect(response['Content-Type']).toBe('text/html');
      done();
    });
  });

  it('should response "application/json" with "POST" method', done => {
    const event = {
      method: 'POST', body: {query: 'query {hello}'}
    };
    const context = {};
    func(event, context, (err, response) => {
      expect(err).toBeNull();
      expect(response['Content-Type']).toBe('application/json');
      done();
    });
  });
});
