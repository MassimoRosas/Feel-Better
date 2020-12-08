/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import {
  Backpack,
  Cat,
  Chocolate,
  Ghost,
  IceCream,
} from 'react-kawaii';

import Error from 'src/containers/Notification/Error';

import './register.scss';

const Register = ({
  firstname,
  lastname,
  email,
  password,
  confirm_password,
  city,
  birthday,
  updateField,
  saveAvatar,
  submitRegister,
  isLogged,
  errorsRegister,
}) => {
  if (isLogged === true) {
    return <Redirect to="/" />;
  }

  // If there are errors
  if (errorsRegister.length > 0) {
    // Get all the input in the form
    const allElements = document.querySelectorAll('.register-input');
    allElements.forEach((element) => {
      // For each input, remove the class register-error
      element.classList.remove('register-error');
    });

    // Loop over the array
    errorsRegister.forEach((error) => {
      // Get the input where there is an error with propertyPath
      const elements = document.getElementById(error.propertyPath);
      // Add class to input
      elements.classList.add('register-error');
    });
  }
  // Create an array to loop over for carousel
  const componentList = [
    {
      name: Backpack,
      id: 'Backpack',
      key: 1,
    },
    {
      name: Cat,
      id: 'Cat',
      key: 2,
    },
    {
      name: Chocolate,
      id: 'Chocolate',
      key: 3,
    },
    {
      name: Ghost,
      id: 'Ghost',
      key: 4,
    },
    {
      name: IceCream,
      id: 'IceCream',
      key: 5,
    },
  ];

  return (
    <main className="register">
      {errorsRegister.length > 0 && (
        <Error errors={errorsRegister} />
      )}
      <h2 className="register-title">S'inscrire</h2>
      <form
        className="register-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          submitRegister();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <div className="register-container">
          <input
            className="register-input"
            value={firstname}
            name="firstname"
            id="firstname"
            type="text"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="firstname">
            Prénom <span className="needed">*</span>
          </label>
          <small className="register-small">Le prénom doit contenir entre 2 et 50 caractères.</small>
        </div>
        <div className="register-container">
          <input
            className="register-input"
            value={lastname}
            name="lastname"
            id="lastname"
            type="text"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="lastname">
            Nom <span className="needed">*</span>
          </label>
          <small className="register-small">Le nom doit contenir entre 2 et 50 caractères.</small>
        </div>
        <div className="register-container email-container">
          <input
            className="register-input"
            value={email}
            name="email"
            id="email"
            type="email"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="email">
            Adresse email <span className="needed">*</span>
          </label>
        </div>
        <div className="register-container">
          <input
            className="register-input"
            value={password}
            name="password"
            id="password"
            type="password"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="password">
            Mot de passe <span className="needed">*</span>
          </label>
          <small className="register-small">Le mot de passe doit contenir 8 caractères minimum.</small>
        </div>
        <div className="register-container">
          <input
            className="register-input"
            value={confirm_password}
            name="confirm_password"
            id="confirm_password"
            type="password"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="confirm_password">
            Confirmez le mot de passe <span className="needed">*</span>
          </label>
        </div>

        <div className="register-container">
          <input
            className="register-input"
            value={city}
            name="city"
            id="city"
            type="text"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="city">
            Ville <span className="needed">*</span>
          </label>
          <small className="register-small">La ville doit contenir 2 caractères minimum.</small>
        </div>

        <div className="register-container">
          <input
            className="register-input birthday-input"
            value={birthday}
            name="birthday"
            id="birthday"
            type="date"
            min="1900-01-01"
            max="3000-01-01"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="birthday">
            Date de naissance <span className="needed">*</span>
          </label>
        </div>

        <div className="register-container avatar-container">
          <p>Choisissez un avatar <span className="needed">*</span></p>
          <small className="register-small register-small-avatar">Veuillez cliquer sur l'avatar de votre choix.</small>
          <div className="avatar-list">
            <Carousel>
              {componentList.map((component) => (
                <label htmlFor={component.id} className="avatar-label" key={component.key}>
                  <input
                    className="avatar-input"
                    name="avatar"
                    id={component.id}
                    type="radio"
                    required
                    onChange={(evt) => {
                      saveAvatar(evt.currentTarget.id);
                    }}
                  />
                  <component.name />
                  <span className="avatar-checked" />
                </label>
              ))}
            </Carousel>
          </div>

        </div>

        <div className="register-container cgu-container">
          <input
            className="register-input cgu-input"
            name="cgu"
            id="cgu"
            type="checkbox"
            required
            onChange={(evt) => {
              updateField(evt.currentTarget.name, evt.currentTarget.value);
            }}
          />
          <label className="register-label" htmlFor="cgu">
            Accepter les <Link to="/legal-notices" className="cgu-link">CGU</Link> <span className="needed">*</span>
          </label>
          <div className="cgu-checkbox" />
        </div>

        <button className="register-button" type="submit">
          Valider
        </button>
        <span className="needed-content">( * : champ obligatoire )</span>
      </form>

      <Link to="/login" className="register-redirect">Déjà inscrit ? C'est par ici !</Link>
    </main>
  );
};

Register.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirm_password: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
  saveAvatar: PropTypes.func.isRequired,
  submitRegister: PropTypes.func.isRequired,
  errorsRegister: PropTypes.array.isRequired,
};

export default Register;
