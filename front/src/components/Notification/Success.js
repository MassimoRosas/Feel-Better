import React from 'react';
import PropTypes from 'prop-types';

import './notification.scss';

const Success = ({ message, closeMessage }) => (
  <div id="container">
    <div id="success-box">
      <div
        className="dot"
        onClick={closeMessage}
      />
      <div className="face">
        <div className="eye" />
        <div className="eye right" />
        <div className="mouth happy" />
      </div>
      <div className="shadow scale" />
      <div className="message">
        <p className="alert">Super !</p>
        <p>{message}</p>
      </div>
    </div>
  </div>
);

Success.propTypes = {
  message: PropTypes.string.isRequired,
  closeMessage: PropTypes.func.isRequired,
};

export default Success;
