import _ from 'lodash';

import type { Dispatch } from '../reducers/types';
import { firebaseapp } from '../constants/firebase';

export const GET_GAME_INVITE = 'GET_GAME_INVITE';
export const REMOVE_GAME_INVITE = 'REMOVE_GAME_INVITE';
export const CLEAR_GAME_INVITES = 'CLEAR_GAME_INVITES';

export function getGameInvites(sanitizedEmail) {
  return (dispatch: Dispatch) => {
    const gameIds = firebaseapp
      .database()
      .ref('users')
      .child(sanitizedEmail)
      .child('game_invite_ids');
    gameIds.on('value', gameIdsSnapshot => {
      // for each game ID, obtain the game object
      dispatch({
        type: CLEAR_GAME_INVITES
      });
      _.each(gameIdsSnapshot.val(), gameId => {
        if (gameId !== undefined) {
          firebaseapp
            .database()
            .ref('game_info')
            .child(gameId)
            .on('value', snapshot => {
              dispatch({
                type: GET_GAME_INVITE,
                payload: snapshot.val()
              });
            });
        }
      });
    });
  };
}

export function createGameInvite(
  {
    type,
    lastMoveTime,
    whoseTurn,
    status,
    inviterEmail,
    inviterName,
    inviterAvatar,
    invitedEmail
  },
  gameId,
  inviterFriendsList,
  inviterGames,
  callback
) {
  return async () => {
    // Add a reference to this object in the invited user's object
    const friendRef = firebaseapp.database().ref(`users/${invitedEmail}`);
    friendRef.once('value', snapshot => {
      if (snapshot.val()) {
        // Create an object that stores the game's info
        const gameInfoRef = firebaseapp.database().ref(`game_info/${gameId}`);
        const toSet = {
          game_id: gameId,
          type,
          last_move_time: lastMoveTime.toString(),
          whose_turn: whoseTurn,
          status,
          inviter_email: inviterEmail,
          inviter_name: inviterName,
          inviter_avatar: inviterAvatar,
          invited_email: invitedEmail,
          invited_avatar: snapshot.val().picture
        };
        console.log(toSet);
        gameInfoRef.set(toSet); // the listener made for game invites should automatically trigger

        const friendGameInvites = friendRef.child('game_invite_ids');
        friendGameInvites.once('value', invitesIdsSnapshot => {
          const currInviteIds = invitesIdsSnapshot.val();
          if (currInviteIds) {
            currInviteIds.push(gameId);
            friendGameInvites.update(currInviteIds);
          } else {
            friendGameInvites.set([gameId]);
          }
          callback(true);
        });

        const userGamesRef = firebaseapp
          .database()
          .ref(`users/${inviterEmail}/game_ids`);
        userGamesRef.once('value', gameIdsSnapshot => {
          const currInviteIds = gameIdsSnapshot.val();
          if (currInviteIds) {
            currInviteIds.push(gameId);
            userGamesRef.update(currInviteIds);
          } else {
            userGamesRef.set([gameId]);
          }
          callback(true);
        });

        // Add to friend's list
        const userFriendsListRef = firebaseapp
          .database()
          .ref(`users/${inviterEmail}/friends_list`);
        const friendInfo = {
          picture: snapshot.val().picture,
          name: snapshot.val().name,
          email: snapshot.val().email
        };
        if (inviterFriendsList === undefined) {
          userFriendsListRef.set([friendInfo]);
        } else {
          // make sure we don't add duplicates
          const newInviterFriendsList = _.filter(
            inviterFriendsList,
            o => o.email !== snapshot.val().email
          );
          newInviterFriendsList.push(friendInfo);
          userFriendsListRef.set(newInviterFriendsList);
        }
      } else {
        callback(false);
      }
    });
  };
}

export function acceptGameInvite(
  gameId,
  gameInviteIds,
  gameIds,
  sanitizedEmail
) {
  return async () => {
    const fixedInvitesArr = _.without(gameInviteIds, gameId);
    firebaseapp
      .database()
      .ref(`users/${sanitizedEmail}/game_invite_ids`)
      .set(fixedInvitesArr);

    if (gameIds === undefined) {
      firebaseapp
        .database()
        .ref(`users/${sanitizedEmail}/game_ids`)
        .set([gameId]);
    } else {
      gameIds.push(gameId);
      firebaseapp
        .database()
        .ref(`users/${sanitizedEmail}/game_ids`)
        .set(gameIds);
    }
  };
}

export function declineGameInvite(gameId, gameInviteIds, sanitizedEmail) {
  return () => {
    const fixedArr = _.without(gameInviteIds, gameId);
    firebaseapp
      .database()
      .ref(`users/${sanitizedEmail}/game_invite_ids`)
      .set(fixedArr);
  };
}

// export function acceptGameInvite(gameInviteId) {
//   // Move the id into the game_info_ids prop and remove from game_invite_ids
//   return () => {
//
//   }
// }
