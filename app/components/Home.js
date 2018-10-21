// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Sample Homepage</h2>
        </div>
        <div className="row">
          <Link to={routes.POSTS}>Click here to see posts page</Link>
        </div>
      </div>
    );
  }
}
