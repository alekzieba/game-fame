import React from 'react';
import { connect } from 'react-redux';
import StatusComp from './Status';
import ResetComp from './Reset';
import ConnectFourBoard from './ConnectFourBoard';
import MsgBoardConnect4 from './MsgBoardConnect4';

import styles from './ConnectFour.css';

export function App() {
  return (
    <div className={styles.ConnectFour}>
      <StatusComp />
      <ResetComp />
      <ConnectFourBoard />
      <MsgBoardConnect4 />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(App);
