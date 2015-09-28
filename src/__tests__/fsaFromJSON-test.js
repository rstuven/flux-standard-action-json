import { fsaFromJSON } from '../';

const type = 'ACTION_TYPE';

describe('fsaFromJSON()', () => {

  it('throws error if action is not FSA', () => {
    const json = `{}`;
    expect(() => fsaFromJSON(json)).to.throw('Argument is not a Flux Standard Action');
  });

  it('parses Symbol', () => {
    const json = `{"type":"Symbol(${type})"}`;
    const parsed = fsaFromJSON(json);
    expect(typeof parsed.type).to.equal('symbol');
    expect(parsed).to.deep.equal({
      type: Symbol.for(type)
    });
  });

  it('throws error if action type is a Symbol without key', () => {
    const json = `{"type":"Symbol()"}`;
    expect(() => fsaFromJSON(json)).to.throw('Action type is a Symbol without key');
  });

  it('parses Error', () => {
    const json = `{"type":"${type}","error":true,"payload":{"name":"Error","message":"You are wrong!","stack":"here\\nand here"}}`;
    const parsed = fsaFromJSON(json);
    expect(parsed.payload).instanceof(Error);
    expect(parsed).to.deep.equal({
      type,
      error: true,
      payload: {
        name: 'Error',
        message: 'You are wrong!',
        stack: 'here\nand here'
      }
    });
  });

});
