import React, { Component } from 'react';
import { Field } from 'redux-form';
import routes from '../constants/routes';

import { createBoard } from '../actions/ConnectFour';

class CreateGame extends Component {
  static renderFriendEmailInput(field) {
    return (
      <input
        type="email"
        className="form-control"
        placeholder={field.placeholder}
        {...field.input}
      />
    );
  }

  static renderGameTypeInput(field) {
    return (
      <select className="form-control" {...field.input}>
        <option value="connectfour">Connect Four</option>
        <option value="tictactoe">Tic-Tac Toe</option>
      </select>
    );
  }

  onSubmit(values) {
    // const authemail = this.props.auth.email
    //   .replace(/@/g, '|')
    //   .replace(/\./g, '=');
    // const secondemail = values.email
    //   .replace(/@/g, '|')
    //   .replace(/\./g, '=');
    const { auth, dispatch, history } = this.props;

    // Make a random game ID -- very low chance of a collision, but this
    //   is a risk we take for not using a web server.
    let gameId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    // waiting for game implementation before making sure to pass the proper values
    switch (values.game_type) {
      case 'tictactoe':
        gameId = `tictactoe/${gameId}`;
        history.push({
          pathname: routes.TICTACTOE,
          currentUser: auth.name,
          gameKey: gameId,
          exists: false
        });
        break;
      case 'connectfour':
        dispatch(createBoard(gameId, auth.email, values.friend_email));
        history.push({
          pathname: routes.CONNECTFOUR
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <br />
            <h1 className="text-center">Create Game</h1>
            <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="form-group text-center">
                <label>Game Type</label>
                <Field
                  name="game_type"
                  component={this.constructor.renderGameTypeInput}
                />
              </div>
              <br />
              <div className="form-group text-center">
                <label>Friend Email</label>
                <Field
                  name="friend_email"
                  placeholder="eleanor@sbeleanor.com"
                  component={this.constructor.renderFriendEmailInput}
                />
              </div>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-primary">
                  Create Game
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGame;
