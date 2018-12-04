import React, { Component } from 'react';
import _ from 'lodash';
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

  enterCode(gameKey) {
    const { history } = this.props;
    console.log(gameKey);
    history.push({
      pathname: routes.TICTACTOE,
      gameKey,
      exists: true
    });
  }

  renderGameList() {
    const { auth, games, history } = this.props;
    if (!games || _.isEmpty(games)) {
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
          <h3 className="text-center">Game History</h3>
          <br />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Game Type</th>
                <th scope="col">Last Move</th>
                <th scope="col">Your Turn?</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {_.map(games, (game, gameId) => (
                <tr
                  key={gameId}
                  className={styles.clickable}
                  onClick={this.enterCode.bind(this, gameId)}
                >
                  <td>{gameTypeToString[game.type]}</td>
                  <td>{game.last_move_time}</td>
                  <td>
                    {game.whose_turn === auth.sanitized_email ? 'Yes' : 'No'}
                  </td>
                  <td>{game.whose_turn == null ? 'Complete' : 'Ongoing'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <h3 className="text-center">Your Game Invites</h3>
          <br />
          <h4 className="text-center"> You have no game invites... Yet!</h4>
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
