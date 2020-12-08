/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import './profile.scss';

const User = ({
  firstname,
  lastname,
  email,
  password,
  city,
  birthday,
  updateField,
  handleSubmit,
}) => (
  <form
    className="profile-form"
    onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }}
  >
    <div className="inputs-container">
      <div className="inputBox">
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="profile-input"
          placeholder={firstname}
          onChange={(event) => {
            updateField(event.currentTarget.name, event.currentTarget.value);
          }}
        />
        <label className="profile-label" htmlFor="firstname">Mon prénom</label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="profile-input"
          placeholder={lastname}
          onChange={(event) => {
            updateField(event.currentTarget.name, event.currentTarget.value);
          }}
        />
        <label className="profile-label" htmlFor="lastname">Mon nom</label>
      </div>

      <div className="inputBox">
        <input
          type="email"
          name="email"
          id="email"
          className="profile-input"
          placeholder={email}
          onChange={(event) => {
            updateField(event.currentTarget.name, event.currentTarget.value);
          }}
        />
        <label className="profile-label" htmlFor="email">Mon adresse email</label>
      </div>

      <div className="inputBox">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          className="profile-input"
          required
          onChange={(event) => {
            updateField(event.currentTarget.name, event.currentTarget.value);
          }}
        />
        <label className="profile-label" htmlFor="password">Mon mot de passe  <span className="needed">*</span></label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          name="city"
          id="city"
          className="profile-input"
          placeholder={city}
          onChange={(event) => {
            updateField(event.currentTarget.name, event.currentTarget.value);
          }}
        />
        <label className="profile-label" htmlFor="city">Ma ville</label>
      </div>

      <div className="inputBox">
        <input
          type="date"
          name="birthday"
          id="birthday"
          className="profile-input"
          value={birthday}
          readOnly
        />
        <label className="profile-label" htmlFor="birthday">Ma date de naissance</label>
      </div>
    </div>

    <button
      type="submit"
      className="profile-submit-btn"
    >
      Modifier mes informations
    </button>
    <span className="needed-content">( * : champ obligatoire )</span>
  </form>
);

User.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  city: PropTypes.string,
  birthday: PropTypes.string,
  password: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

User.defaultProps = {
  firstname: '',
  lastname: '',
  email: '',
  city: '',
  birthday: '',
};

export default User;
