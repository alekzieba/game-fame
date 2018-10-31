// @flow
import React, { Component } from 'react';
import GoogleButton from 'react-google-button';
import routes from '../constants/routes';
import styles from './Login.css';

type Props = {
  history: object,
  promptUserSignIn: () => void
};

export default class Login extends Component<Props> {
  props: Props;

  loginHandler(success) {
    const { history } = this.props;
    if (success) {
      history.push(routes.HOME);
    }
  }

  render() {
    const { promptUserSignIn } = this.props;
    return (
      <div className={`container ${styles.content}`}>
        <div className="row">
          <div className="col-6 offset-3">
            <h1 className="text-center">Game Fame</h1>
          </div>
        </div>
        <br />
        <div className="row text-center">
          <div className="col-6 offset-3">
            <GoogleButton
              type="light"
              style={{ display: 'inline-block' }}
              onClick={promptUserSignIn.bind(
                this,
                this.loginHandler.bind(this)
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
