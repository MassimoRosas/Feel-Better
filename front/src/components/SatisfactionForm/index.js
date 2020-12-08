/* eslint-disable import/no-unresolved */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import picto1 from 'src/assets/images/satisfaction/picto01.png';
import picto2 from 'src/assets/images/satisfaction/picto02.png';
import picto3 from 'src/assets/images/satisfaction/picto03.png';
import picto4 from 'src/assets/images/satisfaction/picto04.png';
import picto5 from 'src/assets/images/satisfaction/picto05.png';

import './satisfactionForm.scss';

const SatisfactionForm = ({
  comment,
  satisfactionError,
  updateSatisfaction,
  updateComment,
  updatePertinence,
  handleSatisfactionSubmit,
  closeMessage,
  setSatisfaction,
  showSatisfactionForm,
}) => {
  if (setSatisfaction) {
    return <Redirect to="/" />;
  }

  if (!showSatisfactionForm) {
    return <Redirect to="/" />;
  }

  return (
    <div className="satisfaction">

      {satisfactionError && (
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
                <li className="">Note : Il faudrait au moins nous dire ce que tu as pensé de tes activités</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <h2 className="satisfaction-title">Voilà cinq activités que l'on s'est rencontré, peux-tu nous donner ton avis ? </h2>
      <form
        className="satisfaction-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSatisfactionSubmit();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <span className="needed-content">( * : champ obligatoire )</span>
        <p className="question"> Qu'as-tu pensé de tes activités ? <span className="needed">*</span></p>
        <label htmlFor="satisfaction1" className="satisfaction-label">
          <input
            type="radio"
            className="satisfaction-input"
            id="satisfaction1"
            value="1"
            name="satisfaction"
            onChange={(evt) => {
              updateSatisfaction(evt.currentTarget.value);
            }}
          />
          <img src={picto1} alt="" className="satisfaction-img" />
          <span className="satisfaction-checked" />
        </label>

        <label htmlFor="satisfaction2" className="satisfaction-label">
          <input
            type="radio"
            className="satisfaction-input"
            id="satisfaction2"
            value="2"
            name="satisfaction"
            onChange={(evt) => {
              updateSatisfaction(evt.currentTarget.value);
            }}
          />
          <img src={picto2} alt="" className="satisfaction-img" />
          <span className="satisfaction-checked" />
        </label>

        <label htmlFor="satisfaction3" className="satisfaction-label">
          <input
            type="radio"
            className="satisfaction-input"
            id="satisfaction3"
            value="3"
            name="satisfaction"
            onChange={(evt) => {
              updateSatisfaction(evt.currentTarget.value);
            }}
          />
          <img src={picto3} alt="" className="satisfaction-img" />
          <span className="satisfaction-checked" />
        </label>

        <label htmlFor="satisfaction4" className="satisfaction-label">
          <input
            type="radio"
            className="satisfaction-input"
            id="satisfaction4"
            value="4"
            name="satisfaction"
            onChange={(evt) => {
              updateSatisfaction(evt.currentTarget.value);
            }}
          />
          <img src={picto4} alt="" className="satisfaction-img" />
          <span className="satisfaction-checked" />
        </label>

        <label htmlFor="satisfaction5" className="satisfaction-label">
          <input
            type="radio"
            className="satisfaction-input"
            id="satisfaction5"
            value="5"
            name="satisfaction"
            onChange={(evt) => {
              updateSatisfaction(evt.currentTarget.value);
            }}
          />
          <img src={picto5} alt="" className="satisfaction-img" />
          <span className="satisfaction-checked" />
        </label>

        <label htmlFor="comment" className="satisfaction-comment">
          <p className="question">Un petit commentaire ?</p>
          <textarea
            name=""
            id="comment"
            className=""
            placeholder="Si tu ne sais pas quoi écrire, on te propose de commencer avec : 'J'adore Feel Better...' "
            value={comment}
            onChange={(evt) => {
              updateComment(evt.currentTarget.value);
            }}
          />
        </label>

        <div className="pertinence-container">
          <p className="question">As-tu trouvé que les activités que l'on t'a proposé étaient pertinentes ?</p>
          <div className="pertinence-input-wrapper">
            <label htmlFor="pertinence-1">
              <input
                type="radio"
                name="pertinence"
                className="pertinence-input"
                id="pertinence-1"
                value="1"
                onChange={(evt) => {
                  updatePertinence(evt.currentTarget.value);
                }}
              />
              <span className="pertinence-label">Oui</span>
            </label>
          </div>

          <div className="pertinence-input-wrapper">
            <label htmlFor="pertinence-0">
              <input
                type="radio"
                name="pertinence"
                className="pertinence-input"
                id="pertinence-0"
                value="0"
                onChange={(evt) => {
                  updatePertinence(evt.currentTarget.value);
                }}
              />
              <span className="pertinence-label">Non</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="satisfaction-btn-validate"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

SatisfactionForm.propTypes = {
  comment: PropTypes.string.isRequired,
  satisfactionError: PropTypes.bool.isRequired,
  updateComment: PropTypes.func.isRequired,
  updatePertinence: PropTypes.func.isRequired,
  updateSatisfaction: PropTypes.func.isRequired,
  handleSatisfactionSubmit: PropTypes.func.isRequired,
  closeMessage: PropTypes.func.isRequired,
  setSatisfaction: PropTypes.bool.isRequired,
  showSatisfactionForm: PropTypes.bool.isRequired,
};

export default SatisfactionForm;
