// @flow
import * as firebase from 'firebase';
import type { Dispatch } from '../reducers/types';

export const GET_POSTS = 'GET_POSTS';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSID
};
const firebaseapp = firebase.initializeApp(config);
const postsRef = firebaseapp.database().ref('posts');

export function getPosts() {
  return (dispatch: Dispatch) => {
    postsRef.on('value', snapshot => {
      dispatch({
        type: GET_POSTS,
        payload: snapshot.val()
      });
    });
  };
}

export function createPost(post) {
  return () => {
    const newPostRef = postsRef.push();
    newPostRef.set(post);
  };
}

export function deletePost(key) {
  return () => {
    postsRef.child(key).remove();
  };
}
