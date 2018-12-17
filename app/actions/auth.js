/* eslint-disable camelcase */
// @flow
// import * as firebase from 'firebase';
import { ipcRenderer } from 'electron';
import { google } from 'googleapis';
import { firebaseapp } from '../constants/firebase';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';

const usersRef = firebaseapp.database().ref('users');

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
          usersRef.child(sanitizedEmail).on('value', userSnapshot => {
            console.log("Being called in auth.js")
            dispatch({
              type: USER_SIGNED_IN,
              payload: userSnapshot.val()
            });
          });
          usersRef.child(sanitizedEmail).transaction(
            currentUserData => {
              if (currentUserData == null) {
                const { email, name, given_name, picture } = res.data;
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
                loginHandler(true);
                return userInfo;
              }
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
