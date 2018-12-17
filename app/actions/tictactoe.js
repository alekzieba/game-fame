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

export function fillSquare(index, board, symbol, gameKey, userMakingMove) {
  let firstUser = null;

  //  dbdRef
  //      .once('value', snapshot => {
  //        newBoard = (snapshot.val() && snapshot.val().board) || [];
  //        newGameIsWon = (snapshot.val() && snapshot.val().gameIsWon) || false;
  //        newPlayer1IsNext =
  //          (snapshot.val() && snapshot.val().player1IsNext) || false;
  //      })
  //      .then(() =>
  //        dispatch(
  //          setPost({
  //            type: SET_BOARD,
  //            payload: {
  //              player1IsNext: newPlayer1IsNext,
  //              player1: user1,
  //              player2: user2,
  //              gameIsWon: newGameIsWon,
  //              gameKey,
  //              board: newBoard
  //            }
  //          })
  //        )
  //      )
  //      .catch();

  firebaseapp
    .database()
    .ref(`games/${gameKey}/3`)
    .once('value', snapshot => {
      firstUser = snapshot.val();
    });
  let newBoard = board.slice();
  newBoard = convertBoard(newBoard, null, 'null');
  newBoard[index] = symbol;
  const xIsTrue = !(symbol === 'X');
  console.log(firstUser, userMakingMove, xIsTrue);
  if (firstUser === userMakingMove && xIsTrue) {
    return {
      type: 'IGNORE'
    };
  }
  if (firstUser !== userMakingMove && !xIsTrue) {
    return {
      type: 'IGNORE'
    };
  }
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

export function updateWinsAndLosses(gameKey, winningSymbol, firstUserEmail, secondUserEmail){
//    const gameBoardRef = firebaseapp.database().ref(`games/${gameKey}`);
  const userRef = firebaseapp.database().ref(`users`);
  let winningEmail = null;
  let losingEmail = null;
  let winningNum = 0;
  let losingNum = 0;
  if(winningSymbol === 'X'){
    winningEmail = firstUserEmail;
    losingEmail = secondUserEmail;
  }
  else{
    winningEmail = secondUserEmail;
    losingEmail = firstUserEmail;
  }
  userRef.child(winningEmail).child("wins").once('value', snapshot => {
    winningNum = snapshot.val();
  }).then(() =>{
    console.log(winningNum);
    winningNum += 1;
    userRef.child(winningEmail).child("wins").set(winningNum);
  });
  
  userRef.child(losingEmail).child("losses").once('value', snapshot => {
    losingNum = snapshot.val();
  }).then(() =>{
    console.log(losingNum);
    losingNum += 1;
    userRef.child(losingEmail).child("losses").set(losingNum);
  });
  
  return {
    type: 'UPDATE_WIN_LOSS',
    payload: {
      
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

export function getMessages(gameKey) {
  const gameBoardRef = firebaseapp.database().ref(`games/${gameKey}`);
  return (dispatch: Dispatch) => {
    gameBoardRef.on('value', snapshot => {
      dispatch({
        type: 'GET_MESSAGES',
        payload: {
          board: snapshot.val(),
          gameKey
        }
      });
    });
  };
}

export function createBoard(gameKey, firstUser = '') {
  const gameElem = firebaseapp.database().ref(`games/${gameKey}`);
  const board = Array(9).fill('null');
  const message = [
    'ADMIN: Welcome to the chat!',
    "ADMIN: Type anything here and click 'Send' to submit."
  ];
  console.log("Started")
  gameElem.set([board, true, message, firstUser]);
  console.log("Ended")
  return {
    type: 'NEW_BOARD',
    payload: {
      board,
      xIsTrue: true,
      gameKey,
      message
    }
  };
}

export function submitMessage(gameKey, message, messageList) {
  const newMessageList = messageList.slice();
  newMessageList.push(message);
  firebaseapp
    .database()
    .ref(`games/${gameKey}/2`)
    .set(newMessageList);

  return {
    type: 'SUBMIT_MESSAGE',
    payload: {
      messageList: newMessageList
    }
  };
}
