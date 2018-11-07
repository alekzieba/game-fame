import React from 'react';
import { connect } from 'react-redux';
import StatusComp from './Status';
import ResetComp from './Reset';
import ConnectFourBoard from './ConnectFourBoard';

import styles from './ConnectFour.css';

export function App() {
  return (
    <div className={styles.ConnectFour}>
      <StatusComp />
      <ResetComp />
      <ConnectFourBoard />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(App);
