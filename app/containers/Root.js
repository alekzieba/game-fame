// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  persistor: {},
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, persistor, history } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}
