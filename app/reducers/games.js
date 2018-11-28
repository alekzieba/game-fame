// @flow
import { GET_GAME } from '../actions/games';
import type { Action } from './types';

export default function counter(state = {}, action: Action) {
  switch (action.type) {
    case GET_GAME:
      console.log(action.payload);
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
