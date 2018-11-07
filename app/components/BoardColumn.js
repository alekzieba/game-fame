import React from 'react';
import PropTypes from 'prop-types';

export default function BoardColumn(props) {
  const { handleColumnClick } = props;
  const { children } = props;
  return (
    <div
      className="BoardColumn"
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
  children: PropTypes.string.isRequired
};
