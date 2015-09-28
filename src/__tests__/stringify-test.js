import { stringify } from '../';

const type = 'ACTION_TYPE';

describe('stringify()', () => {

  it('throws error if action is not FSA', () => {
    const action = {};
    expect(() => stringify(action)).to.throw('Argument is not a Flux Standard Action');
  });

  it('throws error if action type is a Symbol without key', () => {
    const action = {type: Symbol()};
    expect(() => stringify(action)).to.throw('Action type is a Symbol without key');
  });

  it('stringifies Symbol', () => {
    const foobar = { foo: 'bar' };
    const action = {
      type: Symbol(type),
      payload: foobar
    };
    const json = stringify(action);
    expect(json).to.equal(`{"type":"Symbol(${type})","payload":{"foo":"bar"}}`);
  });

  it('stringifies Error', () => {
    const action = {
      type,
      error: true,
      payload: new Error('You are wrong!')
    };
    const json = stringify(action);
    expect(json).to.equal(`{"type":"${type}","error":true,"payload":{"name":"Error","message":"You are wrong!"}}`);
  });

  it('stringifies Error with stack', () => {
    const action = {
      type,
      error: true,
      payload: new Error('You are wrong!')
    };
    const json = stringify(action, { error: { stack: true } });
    expect(json).to.contain('"stack":');
  });

});
