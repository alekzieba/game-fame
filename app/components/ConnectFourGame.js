import React from 'react';
import { connect } from 'react-redux';
import StatusComp from './Status';
import ResetComp from './Reset';
import ConnectFourBoard from './ConnectFourBoard';

export function App() {
  return (
    <div className="ConnectFour">
      <StatusComp />
      <ResetComp />
      <ConnectFourBoard />
    </div>
  );
}

const mapStateToProps = state => ({
  board: state.board,
  player1IsNext: state.player1IsNext,
  player1: state.player1,
  player2: state.player2,
  gameIsWon: state.gameIsWon,
  gameKey: state.gameKey
});

export default connect(mapStateToProps)(App);
