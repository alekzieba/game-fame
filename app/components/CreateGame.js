/* eslint-disable */
import _ from 'lodash';

import React, { Component } from 'react';
import { Field, formValues } from 'redux-form';
import routes from '../constants/routes';

import styles from './CreateGame.css';

import { createBoard } from '../actions/ConnectFour';

const required = value => (value ? undefined : 'Required');

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_type_selected: 'connectfour'
    };
  }

  componentDidMount() {
    this.props.change('game_type', 'connectfour');
    this.renderGameInstructions = this.renderGameInstructions.bind(this);
  }

  static renderFriendEmailInput({
    input,
    placeholder,
    meta: { touched, error, warning }
  }) {
    return (
      <div>
        <input
          type="email"
          className={`form-control ${
            touched && (error || warning) ? 'is-invalid' : ''
          }`}
          placeholder={placeholder}
          {...input}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }

  static renderGameTypeInput(field) {
    return (
      <select
        className="form-control"
        defaultValue="tictactoe"
        {...field.input}
      >
        <option value="connectfour">Connect Four</option>
        <option value="tictactoe">Tic-Tac Toe</option>
      </select>
    );
  }

  renderGameInstructions() {
    console.log('THIS:');
    console.log(this);
    switch (this.state.game_type_selected) {
      case 'tictactoe':
        return (
          <p>
            Tic-tac-toe is a paper-and-pencil game for two players, X and O, who
            take turns marking the spaces in a 3×3 grid. The player who succeeds
            in placing three of their marks in a horizontal, vertical, or
            diagonal row wins the game. (Description from Wikipedia)
          </p>
        );
        break;
      case 'connectfour':
        return (
          <p>
            Connect Four is a two-player connection game in which the players
            first choose a color and then take turns dropping one colored disc
            from the top into a seven-column, six-row vertically suspended grid.
            The pieces fall straight down, occupying the lowest available space
            within the column. The objective of the game is to be the first to
            form a horizontal, vertical, or diagonal line of four of one's own
            discs. (Description from Wikipedia)
          </p>
        );
        break;
    }
  }

  onSubmit(values) {
    // const authemail = this.props.auth.email
    //   .replace(/@/g, '|')
    //   .replace(/\./g, '=');
    // const secondemail = values.email
    //   .replace(/@/g, '|')
    //   .replace(/\./g, '=');
    const { auth, dispatch, history, createGameInvite } = this.props;

    // Make a random game ID -- very low chance of a collision, but this
    //   is a risk we take for not using an application server.
    let gameId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    // Create the game info object
    createGameInvite(
      {
        type: values.game_type,
        lastMoveTime: new Date(),
        whoseTurn: auth.sanitized_email,
        status: 'ongoing',
        inviterEmail: auth.sanitized_email,
        inviterName: auth.name,
        inviterAvatar: auth.picture,
        invitedEmail: values.friend_email.replace(/@/g, '|').replace(/\./g, '=')
      },
      gameId,
      auth.friends_list,
      auth.game_ids,
      success => {
        if (success) {
          //          history.push({
          //            pathname: routes.GAMESLIST
          //          });
          switch (values.game_type) {
            case 'tictactoe':
              gameId = `tictactoe/${gameId}`;
              history.push({
                pathname: routes.TICTACTOE,
                currentUser: auth.name,
                currentUserEmail: auth.email,
                opponentEmail: values.friend_email,
                gameKey: gameId,
                exists: false
              });
              break;
            case 'connectfour':
              history.push({
                pathname: routes.CONNECTFOUR,
                currentUser: auth.name,
                currentUserEmail: auth.email,
                opponentEmail: values.friend_email
              });
              break;
            default:
              break;
          }
        } else {
          console.log('invalid email address');
        }
      }
    );
  }

  onFriendClicked(friend) {
    this.props.change('friend_email', friend.email);
  }

  render() {
    const { auth, handleSubmit } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <br />
            <h1 className="text-center">Create Game</h1>
            <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="form-group text-center">
                <label>Game Type</label>
                <Field
                  name="game_type"
                  component={this.constructor.renderGameTypeInput}
                  onChange={event =>
                    this.setState({ game_type_selected: event.target.value })
                  }
                />
              </div>
              <br />
              {this.renderGameInstructions()}
              <br />
              <div className="form-group text-center">
                <label>Friend Email</label>
                <Field
                  name="friend_email"
                  placeholder="eleanor@sbeleanor.com"
                  component={this.constructor.renderFriendEmailInput}
                  validate={[required]}
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
          <div className="col-6">
            <br />
            <h1 className="text-center">Your Friends</h1>
            <br />
            {auth.friends_list === undefined ? (
              <h3>No friends yet... shame...</h3>
            ) : (
              _.map(auth.friends_list, friend => {
                return (
                  <div
                    className="text-center"
                    onClick={this.onFriendClicked.bind(this, friend)}
                  >
                    <h4>
                      <img
                        src={friend.picture}
                        className={`${styles.profile_pic}`}
                        alt=""
                      />
                      {friend.name}
                    </h4>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGame;
