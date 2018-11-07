// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from '../constants/routes';
import styles from './Home.css';

import GamesListPage from '../containers/GamesListPage';
import CreateGamePage from '../containers/CreateGamePage';
import TicTacToe from './TicTacToe';
import ConnectFour from './ConnectFourGame';

type Props = {
  auth: object,
  getGames: () => void,
  history: object
};

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { auth, getGames, history } = this.props;

    console.log(auth.id);
    if (!auth.id) {
      history.push(routes.LOGIN);
    }
    getGames(auth.id);
  }

  render() {
    const { auth, history } = this.props;

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
          <a className="navbar-brand" onClick={() => history.push(routes.HOME)}>
            Game Fame
          </a>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => history.push(routes.CREATE_GAME)}
                >
                  Create Game <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
          <span className="navbar-text">
            {auth.name}
            <img
              src={auth.picture}
              className={`d-inline-block align-top ${styles.profile_pic}`}
              alt=""
            />
          </span>
        </nav>

        <Switch>
          <Redirect exact from={routes.HOME} to={routes.GAMESLIST} />
          <Route path={routes.GAMESLIST} component={GamesListPage} />
          <Route path={routes.CREATE_GAME} component={CreateGamePage} />
          <Route path={routes.TICTACTOE} component={TicTacToe} />
          <Route path={routes.CONNECTFOUR} component={ConnectFour} />
        </Switch>
      </div>
    );
  }
}
