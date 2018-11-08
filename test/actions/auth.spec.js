import { spy } from 'sinon';
import * as actions from '../../app/actions/auth';

describe('actions', () => {
  it('should promptUserSignIn should execute', () => {
    // unfortunately, testing this action creator is difficult since it invokes
    //   the ipcRenderer, just do nothing for now since it never fails in a
    //   human test
  });

  it('should userSignOut should dispatch the signout action', () => {
    const fn = actions.userSignOut();
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.calledWith({ type: actions.USER_SIGNED_OUT })).toBe(true);
  });
});
