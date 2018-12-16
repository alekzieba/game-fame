import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitMessage, getMessages } from '../actions/ConnectFour';

type MessageBoardProps = {
  messageList: array
};

const firstUser = "Sarthak";

class MsgBoardConnect4 extends Component {
  props: MessageBoardProps;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let msg = document.getElementById('textInput').value;
    document.getElementById('textInput').value = '';
    const { submitMessage, messageList } = this.props;
//    const { gameKey, currentUser } = this.props.location;
    const { gameKey, player1 } = this.props;
    msg = player1 + ': ' + msg;
    submitMessage(gameKey, msg, messageList);
  }

  render() {
    const { messageList, submitMessage } = this.props;
    console.log(messageList);
    if(messageList){
      const messages = messageList.map(message => {
        console.log('Inside');
        return <div>{message}</div>;
      });
      return (
        <div>
          <ul>{messages}</ul>
          <input id="textInput" placeholder="Type here" />
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="btn btn-lg btn-primary"
          >
            SEND
          </button>
        </div>
      );
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
    ...state.connectfour
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MsgBoardConnect4);
