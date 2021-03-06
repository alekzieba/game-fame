/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardColumn from './BoardColumn';
import Circle from './Circle';

import {
  clickColumn,
  createBoard,
  getBoard,
  dbChanged,
  getMessages
} from '../actions/ConnectFour';

import styles from './ConnectFour.css';

// GET PROPER ALIASES!
// let user1 = '';
// let user2 = '';

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
    // const user1 = 'gharvhel';
    // const user2 = 'sarthak';
    //    const existingGame = false;

    const { dispatch, location } = this.props;
    const { exists, currentUserEmail, opponentEmail } = location;
    const existingGame = exists;

    console.log(currentUserEmail, opponentEmail);
    //    console.log(currentUserEmail, opponentEmail);
    const user1 = currentUserEmail.split('|')[0];
    const user2 = opponentEmail.split('|')[0];
    // const gameKey = `games/connect-four/${user1}&${user2}`;
    const gameKey = `games/connect-four/gharvhel&sarthak`;

    console.log('THE PROPS IN CONNECT4BOARD:', this.props);
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
      location,
      player1,
      player2,
      gameIsWon,
      gameKey
    } = this.props;
    const {
      currentUserEmail
      //   opponentEmail
    } = location;
    // const user1 = currentUserEmail.split("|")[0];
    // const user2 = opponentEmail.split("|")[0];
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
            currentUserEmail.split('|')[0]
          )
        );

      return (
        <BoardColumn handleColumnClick={handleColumnClick} key={index}>
          {' '}
          {this.constructor.generateCircles(column, colIndex)}{' '}
        </BoardColumn>
      );
    });
  }

  render() {
    return (
      <div className={styles.ConnectFourBoard}> {this.generateColumns()} </div>
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
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(Board);
