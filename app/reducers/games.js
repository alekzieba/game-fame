// @flow
import { GET_GAME, CLEAR_GAMES } from '../actions/games';
import type { Action } from './types';

export default function counter(state = {}, action: Action) {
  switch (action.type) {
    case GET_GAME:
      return { ...state, [action.payload.game_id]: action.payload };
    case CLEAR_GAMES:
      return {};
    default:
      return state;
  }
}
