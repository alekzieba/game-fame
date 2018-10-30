import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  fillSquare,
  resetBoard,
  getBoard,
  createBoard
} from '../actions/index';
import '../index.css';

type Props = {
  fillSquare: React.PropTypes.func.isRequired,
  resetBoard: React.PropTypes.func.isRequired,
  gameKey: React.PropTypes.string.isRequired,
  xIsTrue: React.PropTypes.bool.isRequired,
  board: React.PropTypes.array.isRequired
};

function Square(props) {
  const { onClick, value } = props;

  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

class Board extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const gameKey = this.props.game_id;
    // const existingGame = this.props.exists;
    const user1 = 'sarthak';
    const user2 = 'gharvhel';
    const gameKey = `tictactoe&${user1}&${user2}`;
    const existingGame = false;
    if (existingGame) {
      getBoard(gameKey);
    } else {
      createBoard(gameKey);
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
    const { xIsTrue, board, fillSquare: fill, gameKey } = this.props;
    const symbol = xIsTrue ? 'X' : 'O';
    if (calculateWinner(board)) {
      return;
    }
    if (board[i] !== null) {
      return;
    }
    fill(i, board, symbol, gameKey);
  }

  render() {
    const { board, xIsTrue, resetBoard: reset, gameKey } = this.props;
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
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <button type="button" onClick={() => reset(gameKey)}>
            RESET BOARD
          </button>
        </div>
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
    { fillSquare, resetBoard, getBoard, createBoard },
    dispatch
  );
}

// Get Redux state from store
function mapStateToProps(state) {
  return {
    gameKey: state.gameKey,
    board: state.board,
    xIsTrue: state.xIsTrue
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
