/* eslint-disable promise/always-return */
import { firebaseapp } from '../constants/firebase';

export const CLICK_COLUMN = 'CLICK_COLUMN';
export const SET_BOARD = 'SET_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const GET_BOARD = 'CREATE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const GET_MSG = 'GET_MESSAGES_CONNECT_4';
export const SUBMIT_MSG = 'SUBMIT_MESSAGE_CONNECT_4';

export function checkVertical(board) {
  return board.reduce((winner, col) => {
    let currentWinner = '';

    // loop through first three circles
    for (let i = 0; i < 3; i += 1) {
      if (
        col[i] !== '' &&
        col[i] === col[i + 1] &&
        col[i] === col[i + 2] &&
        col[i] === col[i + 3]
      ) {
        currentWinner = col[i];
      } else {
        currentWinner = winner;
      }
    }

    return currentWinner;
  }, '');
}

export function checkHorizontal(board) {
  for (let i = 0; i < 4; i += 1) {
    // loop through all circles
    const currentWinner = board[i].reduce((winner, circle, index) => {
      if (
        circle !== '' &&
        circle === board[i + 1][index] &&
        circle === board[i + 2][index] &&
        circle === board[i + 3][index]
      ) {
        return circle;
      }
      return winner;
    }, '');

    // if a winner is found exit function returning winner
    // otherwise continue outer for loop
    if (currentWinner) return currentWinner;
  }

  return '';
}

export function checkDiagonal1(board) {
  // within board loop through first 4 columns
  for (let i = 0; i < 4; i += 1) {
    // within each column loop through first 3 circles
    for (let j = 0; j < 3; j += 1) {
      if (
        board[i][j] !== '' &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2] &&
        board[i][j] === board[i + 3][j + 3]
      ) {
        return board[i][j];
      }
    }
  }

  return '';
}

export function checkDiagonal2(board) {
  // within board loop through last 4 columns
  for (let i = 3; i < 7; i += 1) {
    // within each column loop through first 3 circles
    for (let j = 0; j < 3; j += 1) {
      if (
        board[i][j] !== '' &&
        board[i][j] === board[i - 1][j + 1] &&
        board[i][j] === board[i - 2][j + 2] &&
        board[i][j] === board[i - 3][j + 3]
      ) {
        return board[i][j];
      }
    }
  }

  return '';
}

export function calculateWinner(board) {
  return (
    checkVertical(board) ||
    checkHorizontal(board) ||
    checkDiagonal1(board) ||
    checkDiagonal2(board)
  );
}

export function clickColumn(
  colIndex,
  board,
  player1IsNext,
  player1,
  player2,
  gameIsWon,
  gameKey,
  currentPlayer
) {
  return () => {
    let lockMove = false;
    let playerNext = null;
    firebaseapp
      .database()
      .ref(`${gameKey}/player1IsNext`)
      .once('value', snapshot => {
        playerNext = snapshot.val();
      })
      .then(() => {
        console.log(playerNext, player1, currentPlayer);
        if (currentPlayer === player1 && !playerNext) {
          console.log('LOCK1');
          lockMove = true;
        } else if (currentPlayer === player2 && playerNext) {
          console.log('LOCK2');
          lockMove = true;
        }
        if (!lockMove) {
          // if available circles in column
          if (board[colIndex][0] === '') {
            // add current player to last empty string in column
            const copyBoard = board.slice().map((column, index) => {
              if (index === colIndex) {
                const colClone = column.slice(0);
                const lastIndex = colClone.lastIndexOf('');

                colClone[lastIndex] = player1IsNext ? 'player1' : 'player2';

                return colClone;
              }
              return column;
            });

            // A player has won the game
            if (calculateWinner(copyBoard)) {
              const updates = {};
              updates[`${gameKey}/board`] = copyBoard;
              updates[`${gameKey}/gameIsWon`] = true;
              firebaseapp
                .database()
                .ref()
                .update(updates);

              return {
                type: CLICK_COLUMN,
                payload: {
                  board: copyBoard,
                  gameIsWon: true,
                  player1,
                  player2,
                  player1IsNext,
                  gameKey
                }
              };
            }

            // No player has won
            const updates = {};
            updates[`${gameKey}/board`] = copyBoard;
            updates[`${gameKey}/player1IsNext`] = !player1IsNext;
            firebaseapp
              .database()
              .ref()
              .update(updates);

            return {
              type: CLICK_COLUMN,
              payload: {
                board: copyBoard,
                gameIsWon,
                player1,
                player2,
                player1IsNext: !player1IsNext,
                gameKey
              }
            };
          }
          return null;
        }
      })
      .catch(error => {
        // just log the error for now -e
        console.log(error);
      });
  };

  // if available circles in column
  //  if (board[colIndex][0] === '') {
  //    // add current player to last empty string in column
  //    const copyBoard = board.slice().map((column, index) => {
  //      if (index === colIndex) {
  //        const colClone = column.slice(0);
  //        const lastIndex = colClone.lastIndexOf('');
  //
  //        colClone[lastIndex] = player1IsNext ? 'player1' : 'player2';
  //
  //        return colClone;
  //      }
  //      return column;
  //    });
  //
  //    // A player has won the game
  //    if (calculateWinner(copyBoard)) {
  //      const updates = {};
  //      updates[`${gameKey}/board`] = copyBoard;
  //      updates[`${gameKey}/gameIsWon`] = true;
  //      firebaseapp
  //        .database()
  //        .ref()
  //        .update(updates);
  //
  //      return {
  //        type: CLICK_COLUMN,
  //        payload: {
  //          board: copyBoard,
  //          gameIsWon: true,
  //          player1,
  //          player2,
  //          player1IsNext,
  //          gameKey
  //        }
  //      };
  //    }
  //
  //    // No player has won
  //    const updates = {};
  //    updates[`${gameKey}/board`] = copyBoard;
  //    updates[`${gameKey}/player1IsNext`] = !player1IsNext;
  //    firebaseapp
  //      .database()
  //      .ref()
  //      .update(updates);
  //
  //    return {
  //      type: CLICK_COLUMN,
  //      payload: {
  //        board: copyBoard,
  //        gameIsWon,
  //        player1,
  //        player2,
  //        player1IsNext: !player1IsNext,
  //        gameKey
  //      }
  //    };
  //  }
  //  return null;
}

export function setPost(gameData) {
  return gameData;
}

export function getBoard(gameKey, user1, user2) {
  // eslint-disable-next-line func-names
  return function(dispatch) {
    const dbdRef = firebaseapp.database().ref(gameKey);

    let newBoard = [];
    let newGameIsWon = false;
    let newPlayer1IsNext = false;

    dbdRef
      .once('value', snapshot => {
        newBoard = (snapshot.val() && snapshot.val().board) || [];
        newGameIsWon = (snapshot.val() && snapshot.val().gameIsWon) || false;
        newPlayer1IsNext =
          (snapshot.val() && snapshot.val().player1IsNext) || false;
        console.log(newPlayer1IsNext);
      })
      .then(() =>
        dispatch(
          setPost({
            type: SET_BOARD,
            payload: {
              player1IsNext: newPlayer1IsNext,
              player1: user1,
              player2: user2,
              gameIsWon: newGameIsWon,
              gameKey,
              board: newBoard
            }
          })
        )
      )
      .catch();
  };
}

export const dbChanged = (gameKey, user1, user2, dispatch) => {
  firebaseapp
    .database()
    .ref(gameKey)
    .on('child_changed', data => {
      if (data.val()) {
        dispatch(getBoard(gameKey, user1, user2));
      }
    });
};

export function createBoard(newGameKey, user1, user2) {
  // eslint-disable-next-line no-console
  console.log('LOG: Create Board');
  const initialState = {
    player1IsNext: true,
    player1: user1,
    player2: user2,
    gameIsWon: false,
    gameKey: newGameKey,
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
  console.log(initialState.gameKey);
  const message = [
    'ADMIN: Welcome to the chat!',
    "ADMIN: Type anything here and click 'Send' to submit."
  ];
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/messages`)
    .set(message);
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/board`)
    .set(initialState.board);
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/player1IsNext`)
    .set(initialState.player1IsNext);
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/gameIsWon`)
    .set(initialState.gameIsWon);
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/player1`)
    .set(initialState.player1);
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/player2`)
    .set(initialState.player2);
  firebaseapp
    .database()
    .ref(`${initialState.gameKey}/gameKey`)
    .set(initialState.gameKey);

  return {
    type: CREATE_BOARD,
    payload: initialState
  };
}

export function getMessages(gameKey) {
  const gameBoardRef = firebaseapp.database().ref(`${gameKey}/messages`);
  return (dispatch: Dispatch) => {
    gameBoardRef.on('value', snapshot => {
      dispatch({
        type: 'GET_MESSAGES_CONNECT_4',
        payload: {
          board: snapshot.val(),
          gameKey
        }
      });
    });
  };
}

export function submitMessage(gameKey, message, messageList) {
  const newMessageList = messageList.slice();
  newMessageList.push(message);
  firebaseapp
    .database()
    .ref(`${gameKey}/messages`)
    .set(newMessageList);

  return {
    type: 'SUBMIT_MESSAGE_CONNECT_4',
    payload: {
      messageList: newMessageList
    }
  };
}
