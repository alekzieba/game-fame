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

  it('should getGames should dispatch for good sanitized email', () => {
    const fn = actions.getGames('test');
    const dispatch = spy();

    firebaseapp
      .database()
      .ref(`users/test`)
      .transaction(
        () => ({
          email: 'test',
          name: 'test',
          given_name: 'test',
          picture: 'test',
          sanitized_email: 'test',
          game_ids: ['abc'],
          game_invite_ids: [],
          wins: 0,
          losses: 0
        }),
        err => console.log(err)
      );
    firebaseapp
      .database()
      .ref(`game_info/abc`)
      .set('test');

    fn(dispatch);
    expect(dispatch.called).toBe(true);
  });
});
