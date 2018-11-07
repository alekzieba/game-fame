import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBoard } from '../actions/ConnectFour';

export function Reset(props) {
  function generateReset() {
    if (props.gameIsWon) {
      return (
        <button
          className="NewGame"
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

  return <div className="NewGameDiv">{generateReset()}</div>;
}

Reset.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  gameKey: PropTypes.string.isRequired,
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

export default connect(mapStateToProps)(Reset);
