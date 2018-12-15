import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardColumn from './BoardColumn';
import Circle from './Circle';
import MsgBoardConnect4 from './MsgBoardConnect4';

import {
  clickColumn,
  createBoard,
  getBoard,
  dbChanged,
  getMessages
} from '../actions/ConnectFour';

import styles from './ConnectFour.css';

// GET PROPER ALIASES!
const user1 = 'gharvhel|gmail=com';
const user2 = 'sarthak96|gmail=com';

class Board extends Component {
  // generates circles within given column
  static generateCircles(circles) {
    return circles.map((circleVal, circleIndex) => {
      const index = circleIndex;
      return <Circle circleOccupier={circleVal} index={index} key={index} />;
    });
  }

  constructor(props) {
    super(props);
    this.generateColumns = this.generateColumns.bind(this);
  }

  componentDidMount() {
//    const user1 = 'gharvhel';
//    const user2 = 'sarthak';
    const gameKey = `games/connect-four/${user1}&${user2}`;
    const existingGame = false;
    const { dispatch } = this.props;
    if (existingGame) {
      dispatch(getBoard(gameKey, user1, user2));
    } else {
      dispatch(createBoard(gameKey, user1, user2));
    }

    dbChanged(gameKey, user1, user2, dispatch);
    dispatch(getMessages(gameKey));
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
            gameKey,
            user2
          )
        );

      return (
        <BoardColumn handleColumnClick={handleColumnClick} key={index}>
          {this.constructor.generateCircles(column, colIndex)}
        </BoardColumn>
      );
    });
  }

  render() {
    return (
      <div className={styles.ConnectFourBoard}>
        {this.generateColumns()}
      </div>
    );
  }
}

Board.propTypes = {
  player1IsNext: PropTypes.bool.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  gameKey: PropTypes.string.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  gameIsWon: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  user1: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(Board);
