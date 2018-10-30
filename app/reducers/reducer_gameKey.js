export default function(state = '', action) {
  switch (action.type) {
    case 'GET_BOARD':
    case 'NEW_BOARD':
      return action.payload.gameKey;
    default:
      return state;
  }
}
