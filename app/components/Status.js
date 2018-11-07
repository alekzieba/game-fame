import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    return <div className="Status-P1">{generateStatus()}</div>;
  }
  return <div className="Status-P2">{generateStatus()}</div>;
}

Status.propTypes = {
  player1IsNext: PropTypes.bool.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  gameIsWon: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  board: state.board,
  player1IsNext: state.player1IsNext,
  player1: state.player1,
  player2: state.player2,
  gameIsWon: state.gameIsWon,
  gameKey: state.gameKey
});

export default connect(mapStateToProps)(Status);
