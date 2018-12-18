import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitMessage, getMessages } from '../actions/tictactoe';

type MessageBoardProps = {
  messageList: array
};

class MessageBoard extends Component {
  props: MessageBoardProps;

  render() {
    const { messageList } = this.props;
    if (messageList) {
      const messages = messageList.map(message => {
        console.log('Inside');
        return <div>{message}</div>;
      });
      return <ul>{messages}</ul>;
    }
    return null;
  }
}

// Get methods from Actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ submitMessage, getMessages }, dispatch);
}

// Get Redux state from store
function mapStateToProps(state) {
  return {
    ...state.tictactoe
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBoard);
