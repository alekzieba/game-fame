// @flow
import { GET_GAME, REMOVE_GAME } from '../actions/games';
import type { Action } from './types';

export default function counter(state = {}, action: Action) {
  switch (action.type) {
    case GET_GAME:
      console.log(action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_GAME:
      return { ...state, [action.payload.id]: null };
    default:
      return state;
  }
}
