import { spy } from 'sinon';
import * as actions from '../../app/actions/games';

import { firebaseapp } from '../../app/constants/firebase';

describe('actions', () => {
  it('should getGames should not dispatch for bad sanitized email', () => {
    const fn = actions.getGames('test-bad');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should getGames should dispatch for good sanitized email', async () => {
    const fn = actions.getGames('test');
    let dispatch = spy();

    await firebaseapp
      .database()
      .ref(`users/test`)
      .transaction(() => ({
        email: 'test',
        name: 'test',
        given_name: 'test',
        picture: 'test',
        sanitized_email: 'test',
        game_ids: ['abc'],
        game_invite_ids: [],
        wins: 0,
        losses: 0
      }));
    await firebaseapp
      .database()
      .ref(`game_info/abc`)
      .set('test');

    await fn(dispatch);
    await new Promise(resolve => {
      setTimeout(() => {
        expect(dispatch.called).toBe(true);
        expect(dispatch.firstCall.lastArg.type === actions.CLEAR_GAMES).toBe(
          true
        );
        expect(dispatch.secondCall.lastArg.type === actions.GET_GAME).toBe(
          true
        );
        resolve();
      }, 1000);
    });

    dispatch = spy();

    await firebaseapp
      .database()
      .ref(`users/test/game_ids`)
      .set(null);

    await fn(dispatch);
    await new Promise(resolve => {
      setTimeout(() => {
        expect(dispatch.called).toBe(true);
        expect(dispatch.lastCall.lastArg.type === actions.CLEAR_GAMES).toBe(
          true
        );
        resolve();
      }, 1000);
    });
  });
});
