import func from '../';

describe('functions/hello', () => {
  it("should response 'text/html' with 'GET' method", done => {
    func({method: 'GET'}, {}, (err, response) => {
      expect(response['Content-Type']).toBe('text/html');
      done();
    });
  });

  it("should response 'application/json' with 'POST' method", done => {
    func({method: 'POST'}, {}, (err, response) => {
      expect(response['Content-Type']).toBe('application/json');
      done();
    });
  });
});
