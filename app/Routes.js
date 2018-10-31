/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
// import PostsPage from './containers/PostsPage';
import HomePage from './containers/HomePage';

// <Route path={routes.POSTS} render={() => (
//   true ? (  // can be used for protected resources later
//     <PostsPage />
//   ) : (
//     <Redirect to={routes.LOGIN} />
//   )
// )} />

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.LOGIN} component={LoginPage} />
    </Switch>
  </App>
);
