import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({
  flipped,
  face,
  color,
  matched,
  animation,
  handle,
}) => (
  <div
    className={[
      'card',
      matched ? 'matched' : '',
      !(flipped || matched) ? 'not-flipped' : '',
      animation || '',
    ].join(' ')}
    style={{ color }}
    onClick={handle}
    onKeyPress={handle}
    role="button"
    tabIndex="-1"
  >
    {
    flipped || matched ? (
      <div className="face">
        {face}
      </div>
    ) : (
      <div className="face" />
    )
  }
  </div>
);

Card.propTypes = {
  flipped: PropTypes.bool.isRequired,
  face: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  matched: PropTypes.bool.isRequired,
  animation: PropTypes.string,
  handle: PropTypes.func.isRequired,
};

Card.defaultProps = {
  animation: null,
};

export default Card;
