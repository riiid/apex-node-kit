import func from '../';

describe('functions/hello', () => {
  it('should response hello', done => {
    func({}, {}, (err, msg) => {
      expect(msg).toBe('hello');
      done();
    });
  });
});
