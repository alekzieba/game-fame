import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatusComp from './Status';
import ResetComp from './Reset';
import ConnectFourBoard from './ConnectFourBoard';
import MsgBoardConnect4 from './MsgBoardConnect4';

import styles from './ConnectFour.css';

type ConnectFourProps = {
  location: object
};

class App extends Component {
  props: ConnectFourProps;

  constructor(props) {
    super(props);
    console.log('PROPS IN CONNECT4GAME:', props);
  }

  render() {
    const { location } = this.props;
    return (
      <div className={styles.ConnectFour}>
        <StatusComp />
        <ResetComp />
        <ConnectFourBoard location={location} />
        <MsgBoardConnect4 />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.connectfour
});

export default connect(mapStateToProps)(App);
