import React from 'react';
import PropTypes from 'prop-types';

export default function Circle(props) {
  function getClassName() {
    return props.circleOccupier && `Circle-${props.circleOccupier}`;
  }

  return (
    <div className="CircleWrap">
      <div className={`Circle ${getClassName()}`} />
    </div>
  );
}

Circle.propTypes = {
  circleOccupier: PropTypes.string.isRequired
};
