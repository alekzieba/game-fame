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
          usersRef.child(sanitizedEmail).transaction(
            currentUserData => {
              if (currentUserData === null) {
                dispatch({
                  type: USER_SIGNED_IN,
                  payload: res
                });
                loginHandler(true);
                return {
                  email: res.data.email,
                  name: res.data.name,
                  game_ids: []
                };
              }
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
