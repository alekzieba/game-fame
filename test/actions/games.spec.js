import { spy } from 'sinon';
import * as actions from '../../app/actions/games';

describe('actions', () => {
  it('should getGames should not dispatch for bad userId', () => {
    const fn = actions.getGames('test');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  // TODO make a test where getGames is able to successfully dispatch
});
