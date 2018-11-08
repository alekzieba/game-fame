import { spy } from 'sinon';
import * as actions from '../../app/actions/tictactoe';

describe('actions', () => {
  it('should resetBoard should succeed', () => {
    expect(actions.resetBoard('test')).toMatchSnapshot();
  });

  // TODO write a test where getBoard succeeds

  it('should getBoard should fail for bad gameKey', () => {
    const fn = actions.getBoard('test');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should createBoard should succeed', () => {
    expect(actions.createBoard('test')).toMatchSnapshot();
  });
});
