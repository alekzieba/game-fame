// @flow
import {
  GET_GAME_INVITE,
  REMOVE_GAME_INVITE,
  CLEAR_GAME_INVITES
} from '../actions/game_invites';
import type { Action } from './types';

export default function gameInvites(state = {}, action: Action) {
  const currState = state; // make a shallow copy
  switch (action.type) {
    case GET_GAME_INVITE:
      return { ...state, [action.payload.game_id]: action.payload };
    case REMOVE_GAME_INVITE:
      delete currState[action.payload];
      return currState;
    case CLEAR_GAME_INVITES:
      return {};
    default:
      return state;
  }
}
