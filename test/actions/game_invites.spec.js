import { spy } from 'sinon';
import * as actions from '../../app/actions/game_invites';

import { firebaseapp } from '../../app/constants/firebase';

describe('actions', () => {
  it('should getGameInvites should not dispatch for bad sanitized email', () => {
    const fn = actions.getGameInvites('test-bad');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should getGameInvites should dispatch for good sanitized email', async () => {
    const fn = actions.getGameInvites('getGameInvites-test');
    let dispatch = spy();

    await firebaseapp
      .database()
      .ref(`users/getGameInvites-test`)
      .transaction(() => ({
        email: 'getGameInvites-test',
        name: 'getGameInvites-test',
        given_name: 'getGameInvites-test',
        picture: 'getGameInvites-test',
        sanitized_email: 'getGameInvites-test',
        game_ids: [],
        game_invite_ids: ['getGameInvites-abc'],
        wins: 0,
        losses: 0
      }));
    await firebaseapp
      .database()
      .ref(`game_info/getGameInvites-abc`)
      .set('test');

    await fn(dispatch);
    await new Promise(resolve => {
      setTimeout(() => {
        expect(dispatch.called).toBe(true);
        expect(
          dispatch.firstCall.lastArg.type === actions.CLEAR_GAME_INVITES
        ).toBe(true);
        expect(
          dispatch.secondCall.lastArg.type === actions.GET_GAME_INVITE
        ).toBe(true);
        resolve();
      }, 1000);
    });

    dispatch = spy();

    await firebaseapp
      .database()
      .ref(`users/getGameInvites-test/game_invite_ids`)
      .set(null);

    await fn(dispatch);
    await new Promise(resolve => {
      setTimeout(() => {
        expect(dispatch.called).toBe(true);
        expect(
          dispatch.lastCall.lastArg.type === actions.CLEAR_GAME_INVITES
        ).toBe(true);
        resolve();
      }, 1000);
    });
  });

  it('should acceptGameInvite work for a user with no games yet', async () => {
    await firebaseapp
      .database()
      .ref(`users/test`)
      .transaction(() => ({
        email: 'test',
        name: 'test',
        given_name: 'test',
        picture: 'test',
        sanitized_email: 'test',
        game_ids: [],
        game_invite_ids: ['abc'],
        wins: 0,
        losses: 0
      }));

    const fn = actions.acceptGameInvite('abc', ['abc'], undefined, 'test');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should acceptGameInvite work for a user with games already', async () => {
    await firebaseapp
      .database()
      .ref(`users/test`)
      .transaction(() => ({
        email: 'test',
        name: 'test',
        given_name: 'test',
        picture: 'test',
        sanitized_email: 'test',
        game_ids: ['cde'],
        game_invite_ids: ['abc'],
        wins: 0,
        losses: 0
      }));

    const fn = actions.acceptGameInvite('abc', ['abc'], ['cde'], 'test');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should declineGameInvite work', async () => {
    await firebaseapp
      .database()
      .ref(`users/test`)
      .transaction(() => ({
        email: 'test',
        name: 'test',
        given_name: 'test',
        picture: 'test',
        sanitized_email: 'test',
        game_ids: ['cde'],
        game_invite_ids: ['abc'],
        wins: 0,
        losses: 0
      }));

    const fn = actions.declineGameInvite('abc', ['abc'], 'test');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should createGameInvite work for users without friends', async () => {
    console.log('working1');
    await firebaseapp
      .database()
      .ref(`users/test`)
      .transaction(() => ({
        email: 'test',
        name: 'test',
        given_name: 'test',
        picture: 'test',
        sanitized_email: 'test',
        game_ids: null,
        game_invite_ids: null,
        wins: 0,
        losses: 0
      }));

    await firebaseapp
      .database()
      .ref(`users/test2`)
      .transaction(() => ({
        email: 'test2',
        name: 'test2',
        given_name: 'test2',
        picture: 'test2',
        sanitized_email: 'test2',
        game_ids: null,
        game_invite_ids: null,
        wins: 0,
        losses: 0
      }));

    const fn = actions.createGameInvite(
      {
        type: 'tictactoe',
        lastMoveTime: 'never',
        whoseTurn: 'test',
        status: 'ongoing',
        inviterEmail: 'test',
        inviterName: 'test',
        inviterAvatar: 'test',
        invitedEmail: 'test2'
      },
      'abc',
      undefined,
      null,
      () => {}
    );

    const dispatch = spy();

    await fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should createGameInvite work for users with friends', async () => {
    await firebaseapp
      .database()
      .ref(`users/test3`)
      .transaction(() => ({
        email: 'test3',
        name: 'test3',
        given_name: 'test3',
        picture: 'test3',
        sanitized_email: 'test3',
        wins: 0,
        losses: 0,
        friends_list: [{ email: 'test4', picture: 'test4', name: 'test4' }]
      }));

    await firebaseapp
      .database()
      .ref(`users/test4`)
      .transaction(() => ({
        email: 'test4',
        name: 'test4',
        given_name: 'test4',
        picture: 'test4',
        sanitized_email: 'test4',
        wins: 0,
        losses: 0,
        friends_list: [{ email: 'test3', picture: 'test3', name: 'test3' }]
      }));
    const fn = actions.createGameInvite(
      {
        type: 'tictactoe',
        lastMoveTime: 'never',
        whoseTurn: 'test',
        status: 'ongoing',
        inviterEmail: 'test3',
        inviterName: 'test3',
        inviterAvatar: 'test3',
        invitedEmail: 'test4'
      },
      'abcdef',
      [{ email: 'test4', picture: 'test4', name: 'test4' }],
      null,
      () => {}
    );

    const dispatch = spy();

    await fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should createGameInvite work for user with games already', async () => {
    await firebaseapp
      .database()
      .ref(`users/test5`)
      .transaction(() => ({
        email: 'test5',
        name: 'test5',
        given_name: 'test5',
        picture: 'test5',
        sanitized_email: 'test5',
        wins: 0,
        losses: 0,
        game_ids: ['ghijk']
      }));

    await firebaseapp
      .database()
      .ref(`users/test6`)
      .transaction(() => ({
        email: 'test6',
        name: 'test6',
        given_name: 'test6',
        picture: 'test6',
        sanitized_email: 'test6',
        wins: 0,
        losses: 0
      }));
    const fn = actions.createGameInvite(
      {
        type: 'tictactoe',
        lastMoveTime: 'never',
        whoseTurn: 'test',
        status: 'ongoing',
        inviterEmail: 'test5',
        inviterName: 'test5',
        inviterAvatar: 'test5',
        invitedEmail: 'test6'
      },
      'abcdef',
      undefined,
      ['ghijk'],
      () => {}
    );

    const dispatch = spy();

    await fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should createGameInvite work for user friend with game invites already', async () => {
    await firebaseapp
      .database()
      .ref(`users/test7`)
      .transaction(() => ({
        email: 'test7',
        name: 'test7',
        given_name: 'test7',
        picture: 'test7',
        sanitized_email: 'test7',
        wins: 0,
        losses: 0
      }));

    await firebaseapp
      .database()
      .ref(`users/test8`)
      .transaction(() => ({
        email: 'test8',
        name: 'test8',
        given_name: 'test8',
        picture: 'test8',
        sanitized_email: 'test8',
        wins: 0,
        losses: 0,
        game_invite_ids: ['lmnop']
      }));
    const fn = actions.createGameInvite(
      {
        type: 'tictactoe',
        lastMoveTime: 'never',
        whoseTurn: 'test',
        status: 'ongoing',
        inviterEmail: 'test7',
        inviterName: 'test7',
        inviterAvatar: 'test7',
        invitedEmail: 'test8'
      },
      'hi',
      undefined,
      undefined,
      () => {}
    );

    const dispatch = spy();

    await fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should createGameInvite not crash for bad friend', async () => {
    await firebaseapp
      .database()
      .ref(`users/test9`)
      .transaction(() => ({
        email: 'test9',
        name: 'test9',
        given_name: 'test9',
        picture: 'test9',
        sanitized_email: 'test9',
        wins: 0,
        losses: 0
      }));

    const fn = actions.createGameInvite(
      {
        type: 'tictactoe',
        lastMoveTime: 'never',
        whoseTurn: 'test',
        status: 'ongoing',
        inviterEmail: 'test9',
        inviterName: 'test9',
        inviterAvatar: 'test9',
        invitedEmail: 'test-that-should-not-exist'
      },
      'hi',
      undefined,
      undefined,
      () => {}
    );

    const dispatch = spy();

    await fn(dispatch);
    expect(dispatch.called).toBe(false);
  });
});
