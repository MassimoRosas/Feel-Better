/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import Error from 'src/containers/Notification/Error';

import './login.scss';

const Login = ({
  email,
  password,
  updateField,
  submitLogin,
  isLogged,
  errors,
}) => {
  if (isLogged === true) {
    return <Redirect to="/" />;
  }

  // If there are errors
  if (errors.length > 0) {
    // Loop over the array
    errors.forEach((error) => {
      // Get the input where there is an error with propertyPath
      const elements = document.getElementById(error.propertyPath);
      // Add class to input
      elements.classList.add('login-error');
    });
  }

  return (
    <main className="login">
      {errors.length > 0 && (
        <Error errors={errors} />
      )}
      <h2 className="login-title">Se connecter</h2>
      <form
        className="login-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          submitLogin();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <div className="input-container">
          <input
            className="login-input"
            value={email}
            name="emailLogin"
            id="email"
            type="text"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="login-label" htmlFor="email">
            Adresse email <span className="needed">*</span>
          </label>
        </div>
        <div className="input-container">
          <input
            className="login-input"
            value={password}
            name="passwordLogin"
            id="password"
            type="password"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="login-label" htmlFor="password">
            Mot de passe <span className="needed">*</span>
          </label>
        </div>
        <button className="login-button" type="submit">
          Valider
        </button>
        <span className="needed-content">( * : champ obligatoire )</span>
      </form>

      <Link to="/register" className="login-redirect">Pas encore inscrit ? C'est par ici !</Link>
    </main>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
};

export default Login;
