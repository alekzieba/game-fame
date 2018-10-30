export default function(state = true, action) {
  switch (action.type) {
    case 'FILL_SQUARE':
    case 'RESET_BOARD':
    case 'NEW_BOARD':
      return action.payload.xIsTrue;
    case 'GET_BOARD':
      return action.payload.board[1];
    default:
      return state;
  }
}
