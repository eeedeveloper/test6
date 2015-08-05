import expect from 'expect';
import * as actions from '../../actions/CounterActions';
import * as types from '../../constants/ActionTypes';

describe('actions', () => {

  it('increment should create increment action', () => {
    expect(actions.increment()).toEqual({ type: types.INCREMENT_COUNTER });
  });

  it('decrement should create decrement action', () => {
    expect(actions.decrement()).toEqual({ type: types.DECREMENT_COUNTER });
  });

  it('incrementIfOdd should create increment action', () => {
    let fn = actions.incrementIfOdd();
    expect(fn).toBeA('function');
    let dispatch = expect.createSpy();
    let getState = () => ({ counter: 1 });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: types.INCREMENT_COUNTER });
  });

  it('incrementIfOdd shouldnt create increment action if counter is even', () => {
    let fn = actions.incrementIfOdd();
    let dispatch = expect.createSpy();
    let getState = () => ({ counter: 2 });
    fn(dispatch, getState);
    expect(dispatch.calls.length).toBe(0);
  });

  // There's no nice way to test this at the moment...
  it('incrementAsync', (done) => {
    let fn = actions.incrementAsync(1);
    expect(fn).toBeA('function');
    let dispatch = expect.createSpy();
    fn(dispatch);
    setTimeout(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: types.INCREMENT_COUNTER });
      done();
    }, 5);
  });
});

