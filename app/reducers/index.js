// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import posts from './posts';
import auth from './auth';
import tictactoe from './tictactoe';
import connectfour from './ConnectFour';
import games from './games';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      form: formReducer,
      posts,
      auth,
      tictactoe,
      connectfour,
      games
    })
  );
}
