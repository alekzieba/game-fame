// @flow
import { USER_SIGNED_IN, USER_SIGNED_OUT } from '../actions/auth';
import type { Action } from './types';

export default function counter(state = {}, action: Action) {
  switch (action.type) {
    case USER_SIGNED_IN:
      return action.payload;
    case USER_SIGNED_OUT:
      return {};
    default:
      return state;
  }
}
