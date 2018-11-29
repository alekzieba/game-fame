import { spy } from 'sinon';
import * as actions from '../../app/actions/games';

describe('actions', () => {
  it('should getGames should not dispatch for bad sanitized email', () => {
    const fn = actions.getGames('test');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should getGames should dispatch for good sanitized email', () => {
    const fn = actions.getGames('alekrzieba|gmail=com');
    const dispatch = spy();
    setTimeout(() => {
      fn(dispatch);
      expect(dispatch.called).toBe(true);
    }, 1000);
  });
});
