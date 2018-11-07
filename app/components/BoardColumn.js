/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConnectFour.css';

export default function BoardColumn(props) {
  const { handleColumnClick } = props;
  const { children } = props;
  return (
    <div
      className={styles.BoardColumn}
      onClick={handleColumnClick}
      onKeyDown={handleColumnClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

BoardColumn.propTypes = {
  handleColumnClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};
