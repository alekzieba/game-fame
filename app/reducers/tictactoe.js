/* eslint-disable */
// eslint says it wants array destructuring
//   but I'm too lazy to Google it right now

export default function(
  state = {
    board: Array(9).fill(null),
    gameKey: '',
    xIsTrue: true,
    messageList: []
  },
  action
) {
  let board = Array(9).fill(null);
  let messageList = [];
  switch (action.type) {
    case 'FILL_SQUARE':
      return {
        ...state,
        xIsTrue: action.payload.xIsTrue,
        board: action.payload.board
      };
    case 'RESET_BOARD':
      return {
        ...state,
        xIsTrue: action.payload.xIsTrue,
        board: Array(9).fill(null)
      };
    case 'GET_BOARD':
      board = action.payload.board[0].slice();
      for (let i = 0; i < board.length; i += 1) {
        if (board[i] === 'null') {
          board[i] = null;
        }
      }
      return {
        ...state,
        xIsTrue: action.payload.board[1],
        gameKey: action.payload.gameKey,
        board
      };
    case 'GET_MESSAGES':
      messageList = action.payload.board[2].slice();
      return {
        ...state,
        messageList
      };
    case 'SUBMIT_MESSAGE':
      messageList = action.payload.messageList;
      return {
        ...state,
        messageList
      };
    case 'NEW_BOARD':
      board = action.payload.board.slice();
      for (let j = 0; j < board.length; j += 1) {
        if (board[j] === 'null') {
          board[j] = null;
        }
      }
      return {
        ...state,
        gameKey: action.payload.gameKey,
        xIsTrue: action.payload.xIsTrue,
        board,
        message: action.payload.message
      };
    default:
      return state;
  }
}
