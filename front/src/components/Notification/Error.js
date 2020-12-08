import React from 'react';
import PropTypes from 'prop-types';

import './notification.scss';

const Error = ({
  errors,
  closeMessage,
}) => (
  <div id="container">
    <div id="error-box">
      <div
        className="dot"
        onClick={closeMessage}
      />
      <div className="face">
        <div className="eye" />
        <div className="eye right" />
        <div className="mouth sad" />
      </div>
      <div className="shadow move" />
      <div className="message">
        <p className="alert">Oops!</p>
        <ul className="error-list">
          {errors.map((error) => (
            <li key={error.propertyPath} className="">{error.propertyPath} : {error.title}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);


Error.propTypes = {
  errors: PropTypes.array.isRequired,
  closeMessage: PropTypes.func.isRequired,
};

export default Error;
