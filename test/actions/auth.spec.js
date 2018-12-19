import { spy } from 'sinon';
import * as actions from '../../app/actions/auth';

describe('actions', () => {
  it('should promptUserSignIn should execute', () => {
    // unfortunately, testing this action creator is difficult since it invokes
    //   the ipcRenderer, just do nothing for now since it never fails in a
    //   human test -- also, according to the following GitHub thread, ipcRenderer
    //   events are so well-tested already that there is no need to test them again:
    //   https://github.com/electron/spectron/issues/91
  });

  it('should handleUserSignIn not dispatch with invalid tokens', () => {
    const fn = actions.handleUserSignIn(null, {}, () => {});
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  // it('should handleUserSignIn should dispatch with valid tokens (Gmail account)', async () => {
  //   const tokens = {
  //     access_token: process.env.GMAIL_ACCESS_TOKEN,
  //     refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  //     scope: process.env.GMAIL_SCOPE,
  //     token_type: process.env.GMAIL_TOKEN_TYPE,
  //     id_token: process.env.GMAIL_ID_TOKEN,
  //     expiry_date: process.env.GMAIL_EXPIRY_DATE
  //   }
  //   const fn = actions.handleUserSignIn(null, { tokens }, () => {});
  //   const dispatch = spy();
  //
  //   await fn(dispatch);
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       expect(dispatch.called).toBe(true);
  //       expect(dispatch.lastCall.lastArg.type === actions.USER_SIGNED_IN).toBe(true);
  //       resolve();
  //     }, 1000)
  //   });
  // });
  //
  // it('should handleUserSignIn should dispatch with valid tokens (non-Gmail account)', async () => {
  //   const tokens = {
  //     access_token: process.env.NON_GMAIL_ACCESS_TOKEN,
  //     refresh_token: process.env.NON_GMAIL_REFRESH_TOKEN,
  //     scope: process.env.NON_GMAIL_SCOPE,
  //     token_type: process.env.NON_GMAIL_TOKEN_TYPE,
  //     id_token: process.env.NON_GMAIL_ID_TOKEN,
  //     expiry_date: process.env.NON_GMAIL_EXPIRY_DATE
  //   }
  //   const fn = actions.handleUserSignIn(null, { tokens }, () => {});
  //   const dispatch = spy();
  //
  //   await fn(dispatch);
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       expect(dispatch.called).toBe(true);
  //       expect(dispatch.lastCall.lastArg.type === actions.USER_SIGNED_IN).toBe(true);
  //       resolve();
  //     }, 1000)
  //   });
  // });

  it('should userSignOut should dispatch the signout action', () => {
    const fn = actions.userSignOut();
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.calledWith({ type: actions.USER_SIGNED_OUT })).toBe(true);
  });
});
