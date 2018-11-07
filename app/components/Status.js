import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './ConnectFour.css';

export function Status(props) {
  function generateStatus() {
    if (props.gameIsWon) {
      return `The Winner is ${
        props.player1IsNext ? props.player1 : props.player2
      }!`;
    }
    return `Player's turn: ${
      props.player1IsNext
        ? `${props.player1} (YELLOW)`
        : `${props.player2} (RED)`
    }`;
  }

  const { player1IsNext } = props;

  if (player1IsNext) {
    return <div className={styles.StatusP1}>{generateStatus()}</div>;
  }
  return <div className={styles.StatusP2}>{generateStatus()}</div>;
}

Status.propTypes = {
  player1IsNext: PropTypes.bool.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  gameIsWon: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(Status);
