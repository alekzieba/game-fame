// @flow
import { GET_POSTS } from '../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
}
