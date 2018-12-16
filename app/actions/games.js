import _ from 'lodash';

import type { Dispatch } from '../reducers/types';
import { firebaseapp } from '../constants/firebase';

export const GET_GAME = 'GET_GAME';
export const CLEAR_GAMES = 'CLEAR_GAMES';

export function getGames(sanitizedEmail) {
  return (dispatch: Dispatch) => {
    const gameIds = firebaseapp
      .database()
      .ref('users')
      .child(sanitizedEmail)
      .child('game_ids');
    gameIds.on('value', gameIdsSnapshot => {
      // for each game ID, obtain the game object
      dispatch({
        type: CLEAR_GAMES
      });
      _.each(gameIdsSnapshot.val(), gameId => {
        if (gameId !== undefined) {
          firebaseapp
            .database()
            .ref('game_info')
            .child(gameId)
            .on('value', snapshot => {
              dispatch({
                type: GET_GAME,
                payload: snapshot.val()
              });
            });
        }
      });
    });
  };
}
