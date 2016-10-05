import hello$ from '../hello';

describe('hello', () => {

  it('should respond "hello" string', done => {
    hello$().subscribe(res => {
      expect(res).toBe('hello');
      done();
    });
  });

});
