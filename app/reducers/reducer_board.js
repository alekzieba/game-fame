export default function(state = Array(9).fill(null), action) {
  let board = Array(9).fill(null);
  switch (action.type) {
    case 'FILL_SQUARE':
      return action.payload.board;
    case 'RESET_BOARD':
      return Array(9).fill(null);
    case 'GET_BOARD':
      board = action.payload.board[0].slice();
      for (let i = 0; i < board.length; i += 1) {
        if (board[i] === 'null') {
          board[i] = null;
        }
      }
      return board;
    case 'NEW_BOARD':
      board = action.payload.board.slice();
      for (let j = 0; j < board.length; j += 1) {
        if (board[j] === 'null') {
          board[j] = null;
        }
      }
      return board;
    default:
      return state;
  }
}
