// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import posts from './posts';
import auth from './auth';
import tictactoe from './tictactoe';
import connectfour from './ConnectFour';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      form: formReducer,
      counter,
      posts,
      auth,
      tictactoe,
      connectfour
    })
  );
}
