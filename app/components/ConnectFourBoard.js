import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardColumn from './BoardColumn';
import Circle from './Circle';
import {
  clickColumn,
  createBoard,
  getBoard,
  dbChanged
} from '../actions/ConnectFour';

class Board extends Component {
  constructor(props) {
    super(props);
    this.generateColumns = this.generateColumns.bind(this);
  }

  componentDidMount() {
    const user1 = 'gharvhel';
    const user2 = 'sarthak';
    const gameKey = `games/connect-four/${user1}&${user2}`;
    const existingGame = true;
    const { dispatch } = this.props;
    if (existingGame) {
      dispatch(getBoard(gameKey, user1, user2));
    } else {
      dispatch(createBoard(gameKey, user1, user2));
    }

    dbChanged(gameKey, user1, user2, dispatch);
  }

  // generates circles within given column
  generateCircles(circles) {
    return circles.map((circleVal, circleIndex) => {
      const index = circleIndex;
      return (
        <Circle circleOccupier={circleVal} index={index} key={this.index} />
      );
    });
  }

  generateColumns() {
    const {
      board,
      dispatch,
      player1IsNext,
      player1,
      player2,
      gameIsWon,
      gameKey
    } = this.props;
    return board.map((column, colIndex) => {
      const index = colIndex;
      const handleColumnClick = () =>
        dispatch(
          clickColumn(
            colIndex,
            board,
            player1IsNext,
            player1,
            player2,
            gameIsWon,
            gameKey
          )
        );

      return (
        <BoardColumn handleColumnClick={handleColumnClick} key={index}>
          {this.generateCircles(column, colIndex)}
        </BoardColumn>
      );
    });
  }

  render() {
    return <div className="ConnectFourBoard">{this.generateColumns()}</div>;
  }
}

Board.propTypes = {
  player1IsNext: PropTypes.bool.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  gameKey: PropTypes.string.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  gameIsWon: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  board: state.board,
  player1IsNext: state.player1IsNext,
  player1: state.player1,
  player2: state.player2,
  gameIsWon: state.gameIsWon,
  gameKey: state.gameKey
});

export default connect(mapStateToProps)(Board);
