// @flow
import type { Dispatch } from '../reducers/types';
import { firebaseapp } from '../constants/firebase';

export const GET_GAME = 'GET_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const CREATE_GAME = 'CREATE_GAME';

export function getGames(sanitizedEmail) {
  return (dispatch: Dispatch) => {
    console.log(sanitizedEmail);
    const gameIds = firebaseapp
      .database()
      .ref('users')
      .child(sanitizedEmail)
      .child('game_ids');
    gameIds.on('child_added', snapshot => {
      // for each game ID, obtain the game object
      firebaseapp
        .database()
        .ref('games')
        .child(snapshot.val())
        .on('value', snapshot2 => {
          dispatch({
            type: GET_GAME,
            payload: snapshot2.val()
          });
        });
    });
    gameIds.on('child_removed', snapshot => {
      dispatch({
        type: REMOVE_GAME,
        payload: snapshot.val()
      });
    });
  };
}

// export function getGameInvites(sanitizedEmail) {
//   return (dispatch: Dispatch) => {
//     const gameIds = firebaseapp.database().ref(`users/${sanitizedEmail}/game_ids`)''
//     gameIds.foreach((gameId) => {
//       gameRef = firebaseapp.database().ref(`games/${gameId}`);
//       gameRef.on('value', snapshot => {
//         dispatch({
//           type: GET_GAMES,
//           payload: snapshot.val()
//         });
//       });
//     });
//   };
// }

// when creating a game, only succeed if the partner also
//   has an account so that the IDs can be stored properly
