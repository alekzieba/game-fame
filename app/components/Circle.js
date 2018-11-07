/* eslint-disable prefer-template */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConnectFour.css';

export default function Circle(props) {
  function getClassName() {
    return (
      props.circleOccupier && `${styles['Circle-' + props.circleOccupier]}`
    );
  }

  return (
    <div className={styles.CircleWrap}>
      <div className={`${styles.Circle} ${getClassName()}`} />
    </div>
  );
}

Circle.propTypes = {
  circleOccupier: PropTypes.string.isRequired
};
