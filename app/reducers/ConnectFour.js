import * as actions from '../actions/ConnectFour';

const initialState = {
  player1IsNext: true,
  player1: '',
  player2: '',
  gameIsWon: false,
  gameKey: '',
  board: [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ]
};

export default function connect4Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_BOARD:
      return Object.assign({}, action.payload);
    case actions.SET_BOARD:
      return action.payload;
    case actions.CREATE_BOARD:
      return Object.assign({}, action.payload);
    case actions.CLICK_COLUMN:
      if (state.gameIsWon) {
        return state;
      }
      return Object.assign({}, action.payload);

    default:
      return state;
  }
}
