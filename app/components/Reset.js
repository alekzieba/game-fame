import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBoard } from '../actions/ConnectFour';

import styles from './ConnectFour.css';

export function Reset(props) {
  function generateReset() {
    if (props.gameIsWon) {
      return (
        <button
          className={styles.NewGame}
          type="button"
          onClick={() =>
            props.dispatch(
              createBoard(props.gameKey, props.player1, props.player2)
            )
          }
        >
          New Game
        </button>
      );
    }
    return '';
  }

  return <div className={styles.NewGameDiv}>{generateReset()}</div>;
}

Reset.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  gameKey: PropTypes.string.isRequired,
  gameIsWon: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(Reset);
