/* eslint-disable camelcase */
// @flow
// import * as firebase from 'firebase';
import { ipcRenderer } from 'electron';
import { google } from 'googleapis';
import { firebaseapp } from '../constants/firebase';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';

export function promptUserSignIn(loginHandler) {
  return (dispatch: (action: actionType) => void) => {
    ipcRenderer.removeAllListeners('signin:google');
    ipcRenderer.send('signin:google');
    ipcRenderer.once('signin:google', (event, googleResponse) => {
      // Get user's profile information
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials(googleResponse.tokens);
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
      });
      oauth2.userinfo.get((err, res) => {
        if (err) {
          console.log(err);
        } else {
          // https://gist.github.com/anantn/4323967
          const sanitizedEmail = res.data.email
            .replace(/@/g, '|')
            .replace(/\./g, '=');
          console.log(sanitizedEmail);
          // Set up a listener
          firebaseapp
            .database()
            .ref(`users/${sanitizedEmail}`)
            .on('value', userSnapshot => {
              if (userSnapshot.val()) {
                dispatch({
                  type: USER_SIGNED_IN,
                  payload: userSnapshot.val()
                });
              }
            });
          firebaseapp
            .database()
            .ref(`users/${sanitizedEmail}`)
            .transaction(
              currentUserData => {
                if (currentUserData == null) {
                  console.log(res.data);
                  const { email, picture } = res.data;
                  let { name, given_name } = res.data;
                  if (!name) {
                    name = '<name witheld>';
                  }
                  if (!given_name) {
                    given_name = '<first name witheld>';
                  }
                  const userInfo = {
                    email,
                    name,
                    given_name,
                    picture,
                    sanitized_email: sanitizedEmail,
                    game_ids: [],
                    game_invite_ids: [],
                    wins: 0,
                    losses: 0
                  };
                  dispatch({
                    type: USER_SIGNED_IN,
                    payload: userInfo
                  });
                  loginHandler(true);
                  return userInfo;
                }
                dispatch({
                  type: USER_SIGNED_IN,
                  payload: currentUserData
                });
                loginHandler(true);
              },
              () => {
                // params: error, committed
                // do nothing
              }
            );
        }
      });
    });
  };
}

export function userSignOut() {
  return (dispatch: (action: actionType) => void) => {
    dispatch({
      type: USER_SIGNED_OUT
    });
  };
}
