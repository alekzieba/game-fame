import { firebaseapp } from '../constants/firebase';

function convertBoard(board, type1, type2) {
  const boardRet = board.slice();
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === type1) {
      boardRet[i] = type2;
    }
  }
  return boardRet;
}

export function fillSquare(index, board, symbol, gameKey) {
  let newBoard = board.slice();
  newBoard = convertBoard(newBoard, null, 'null');
  newBoard[index] = symbol;
  const xIsTrue = !(symbol === 'X');
  firebaseapp
    .database()
    .ref(`games/${gameKey}/0`)
    .set(newBoard);
  firebaseapp
    .database()
    .ref(`games/${gameKey}/1`)
    .set(xIsTrue);
  newBoard = convertBoard(newBoard, 'null', null);
  return {
    type: 'FILL_SQUARE',
    payload: {
      board: newBoard,
      xIsTrue
    }
  };
}

export function resetBoard(gameKey) {
  let newBoard = Array(9).fill('null');
  firebaseapp
    .database()
    .ref(`games/${gameKey}/0`)
    .set(newBoard);
  firebaseapp
    .database()
    .ref(`games/${gameKey}/1`)
    .set(true);
  newBoard = convertBoard(newBoard, 'null', null);
  return {
    type: 'RESET_BOARD',
    payload: {
      board: newBoard,
      xIsTrue: true
    }
  };
}

export function getBoard(gameKey) {
  const gameBoardRef = firebaseapp.database().ref(`games/${gameKey}`);
  return (dispatch: Dispatch) => {
    gameBoardRef.on('value', snapshot => {
      dispatch({
        type: 'GET_BOARD',
        payload: {
          board: snapshot.val(),
          gameKey
        }
      });
    });
  };
}

export function createBoard(gameKey) {
  const gameElem = firebaseapp.database().ref(`games/${gameKey}`);
  const board = Array(9).fill('null');
  gameElem.set([board, true]);
  return {
    type: 'NEW_BOARD',
    payload: {
      board,
      xIsTrue: true,
      gameKey
    }
  };
}
