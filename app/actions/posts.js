// @flow
import type { Dispatch } from '../reducers/types';
import { firebaseapp } from '../constants/firebase';

export const GET_POSTS = 'GET_POSTS';

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
