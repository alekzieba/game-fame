// @flow
import { USER_SIGNED_IN } from '../actions/auth';
import type { Action } from './types';

export default function counter(state = {}, action: Action) {
  switch (action.type) {
    case USER_SIGNED_IN:
      return action.payload.data;
    default:
      return state;
  }
}
