// @flow
import type { Dispatch } from '../reducers/types';
import { firebaseapp } from '../constants/firebase';

export const GET_GAMES = 'GET_GAMES';
export const CREATE_GAME = 'CREATE_GAME';

let gamesRef;

export function getGames(userId) {
  return (dispatch: Dispatch) => {
    gamesRef = firebaseapp.database().ref(`games/${userId}`);
    gamesRef.on('value', snapshot => {
      dispatch({
        type: GET_GAMES,
        payload: snapshot.val()
      });
    });
  };
}

// when creating a game, only succeed if the partner also
//   has an account so that the IDs can be stored properly
