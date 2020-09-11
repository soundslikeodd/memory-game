import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({
  flipped,
  face,
  color,
  matched,
  handle,
}) => (
  <div
    className={`card${matched ? ' matched' : ''}${!(flipped || matched) ? ' not-flipped' : ''}`}
    style={{ color }}
    onClick={handle}
    onKeyPress={handle}
    role="button"
    tabIndex="-1"
  >
    {
      flipped || matched ? (
        <div className="face flipped">
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
  handle: PropTypes.func.isRequired,
};

export default Card;
