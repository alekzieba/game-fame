/* eslint-disable */
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import routes from '../constants/routes.json';
import styles from './GamesList.css';

import { gameTypeToString } from '../constants/gameinfo';

class GamesList extends Component {
  static renderGameCodeInput(field) {
    return (
      <input
        type="text"
        className="form-control"
        placeholder={field.placeholder}
        style={{ width: '20em', display: 'inline' }}
        autoFocus
        {...field.input}
      />
    );
  }

  componentDidMount() {
    const { auth, getGameInvites, getGames } = this.props;
    getGameInvites(auth.sanitized_email);
    getGames(auth.sanitized_email);
  }

  enterCode(gameId, inviterEmail) {
    const { history, auth } = this.props;
    const gameKey = `tictactoe/${gameId}`;
    history.push({
      pathname: routes.TICTACTOE,
      currentUser: auth.name,
      currentUserEmail: auth.email,
      opponentEmail: inviterEmail,
      gameKey: gameId,
      exists: false
    });
  }

  clickAcceptButton(gameId) {
    const { auth, acceptGameInvite } = this.props;
    acceptGameInvite(
      gameId,
      auth.game_invite_ids,
      auth.game_ids,
      auth.sanitized_email
    );
  }

  clickDeclineButton(gameId) {
    const { auth, declineGameInvite } = this.props;
    declineGameInvite(gameId, auth.game_invite_ids, auth.sanitized_email);
  }

  renderGameList() {
    const { auth, games, gameInvites, history } = this.props;
    if (
      (!games || _.isEmpty(games)) &&
      (!gameInvites || _.isEmpty(gameInvites))
    ) {
      return (
        <div className="text-center">
          <br />
          <br />
          <h4 className="text-center">
            Click the button below to make your first game!
          </h4>
          <br />
          <button
            type="button"
            className="btn btn-lg"
            onClick={() => history.push(routes.CREATE_GAME)}
          >
            Create New Game
          </button>
        </div>
      );
    }

    // TODO implement game invites, will be added when we have integration w/ games working
    return (
      <div className="row">
        <div className="col-6">
          <h3 className="text-center">Your Game Invites</h3>
          <br />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Game Type</th>
                <th scope="col">Created Time</th>
                <th scope="col">Invited By</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {_.map(gameInvites, (game, gameId) => (
                <tr key={gameId} className={styles.clickable}>
                  <td>{gameTypeToString[game.type]}</td>
                  <td>{moment(new Date(game.last_move_time)).fromNow()}</td>
                  <td>
                    <img
                      src={game.inviter_avatar}
                      className={`d-inline-block align-top ${
                        styles.profile_pic
                      }`}
                      alt=""
                    />
                    {game.inviter_name}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.clickAcceptButton.bind(this, gameId)}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.clickDeclineButton.bind(this, gameId)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <h3 className="text-center">Game History</h3>
          <br />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Game Type</th>
                <th scope="col">Last Move</th>
                <th scope="col">Your Turn?</th>
                <th scope="col">Status</th>
                <th scope="col">Friend</th>
              </tr>
            </thead>
            <tbody>
              {_.map(games, (game, gameId) => (
                <tr
                  key={gameId}
                  className={styles.clickable}
                  onClick={this.enterCode.bind(
                    this,
                    gameId,
                    game.inviter_email === auth.sanitized_email
                      ? game.invited_email
                      : game.inviter_email
                  )}
                >
                  <td>{gameTypeToString[game.type]}</td>
                  <td>{moment(new Date(game.last_move_time)).fromNow()}</td>
                  <td>
                    {game.whose_turn === auth.sanitized_email ? 'Yes' : 'No'}
                  </td>
                  <td>{game.status}</td>
                  <td>
                    {game.inviter_email === auth.sanitized_email ? (
                      <div>
                        <img
                          src={game.inviter_avatar}
                          className={`d-inline-block align-top ${
                            styles.profile_pic
                          }`}
                          alt=""
                        />
                        {game.inviter_name}
                      </div>
                    ) : (
                      <div>
                        <img
                          src={game.invited_avatar}
                          className={`d-inline-block align-top ${
                            styles.profile_pic
                          }`}
                          alt=""
                        />
                        {game.invited_name}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <br />
        <h1 className="text-center">Welcome, {auth.given_name}!</h1>
        <br />
        {this.renderGameList()}
      </div>
    );
  }
}

export default GamesList;
