/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fillSquare,
  resetBoard,
  getBoard,
  createBoard,
  submitMessage,
  getMessages
} from '../actions/tictactoe';
import MessageBoard from './MessageBoard';
import styles from './TicTacToe.css';

function Square(props) {
  const { onClick, value } = props;
  return (
    <button type="button" className={styles.square} onClick={onClick}>
      {value}
    </button>
  );
}

type BoardProps = {
  fillSquare: () => void,
  resetBoard: () => void,
  gameKey: string,
  xIsTrue: boolean,
  board: array,
  location: object
};
//
//type MsgProps = {
//  fillSquare: () => void,
//  resetBoard: () => void,
//  gameKey: string,
//  xIsTrue: boolean,
//  board: array,
//  location: object
//};

class Board extends Component {
  props: BoardProps;
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { gameKey, currentUser } = this.props.location;
    const existingGame = this.props.location.exists;
    // const user1 = 'sarthak';
    // const user2 = 'gharvhel';
    // const gameKey = `tictactoe&${user1}&${user2}`;
    // const existingGame = false;
    if (existingGame) {
      this.props.getBoard(gameKey);
      this.props.getMessages(gameKey);
    } else {
      this.props.createBoard(gameKey, currentUser);
      this.props.getBoard(gameKey);
      this.props.getMessages(gameKey);
    }
  }

  renderSquare(i) {
    const { board } = this.props;
    return (
      <Square
        value={board[i] === 'null' ? null : board[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const { xIsTrue, board, fillSquare: fill } = this.props;
    const { gameKey, currentUser } = this.props.location;
    const symbol = xIsTrue ? 'X' : 'O';
    if (calculateWinner(board)) {
      return;
    }
    console.log(board);
    if (board[i] !== null && board[i] !== undefined) {
      return;
    }
    fill(i, board, symbol, gameKey, currentUser);
  }

  handleSubmit() {
    let msg = document.getElementById('textInput').value;
    document.getElementById('textInput').value = '';
    const { submitMessage, messageList } = this.props;
    const { gameKey, currentUser } = this.props.location;
    msg = currentUser + ': ' + msg;
    submitMessage(gameKey, msg, messageList);
  }

  render() {
    const { board, xIsTrue, resetBoard: reset } = this.props;
    const { gameKey } = this.props.location;
    let status;
    const winner = calculateWinner(board);
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      const symbol = xIsTrue ? 'X' : 'O';
      status = `Next player: ${symbol}`;
    }
    return (
      <div>
        <div className={styles.status}>
          Game ID: {this.props.location.gameKey}
        </div>
        <div className={styles.status}>{status}</div>
        <div className={styles.board_row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={styles.board_row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={styles.board_row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <button type="button" onClick={() => reset(gameKey)}>
            RESET BOARD
          </button>
        </div>
        <MessageBoard />
        <input id="textInput" placeholder="Type here" />
        <button
          onClick={this.handleSubmit}
          type="submit"
          className="btn btn-lg btn-primary"
        >
          SEND
        </button>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Get methods from Actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fillSquare,
      resetBoard,
      getBoard,
      createBoard,
      submitMessage,
      getMessages
    },
    dispatch
  );
}

// Get Redux state from store
function mapStateToProps(state) {
  return {
    ...state.tictactoe
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
