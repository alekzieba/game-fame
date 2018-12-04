import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitMessage, getMessages } from '../actions/tictactoe';

type MessageBoardProps = {
  messageList: array
};

class MessageBoard extends Component {
  props: MessageBoardProps;

  //  constructor(props) {
  //    super(props);
  //    this.renderMessages = this.renderMessages.bind(this);
  //    this.renderMessage = this.renderMessage.bind(this);
  //  }

  //  renderMessages() {
  //    const { messageList } = this.props;
  //    return(
  //      <div>
  //        { messageList }
  //      </div>
  //    );
  //  }

  //  renderMessage(message){
  //    return(
  //      <div>
  //        { message }
  //      </div>
  //    )
  //  }
  render() {
    const { messageList } = this.props;
    const messages = messageList.map(message => {
      console.log('Inside');
      return <div>{message}</div>;
    });
    return <ul>{messages}</ul>;
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
