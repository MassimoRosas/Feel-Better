import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'react-feather';

import './suggestion.scss';

const Suggestion = ({
  // props coming from parent container (...ideas)
  name,
  picture,
  category,
  estimation,
  // props coming from container
  city,
  setIdea,
  updateSuggestion,
  handleSuggestionSubmit,
}) => {
  // Create a label corresponding to the estimation
  let newEstimation = '';

  // Create an array on which we loop to display the corresponding number of stars
  const budgetStar = ['0'];

  if (estimation === 0) {
    newEstimation = 'Gratuit';
  }
  else if (estimation === 1) {
    newEstimation = 'Peu coûteux';
    budgetStar.push('1');
  }
  else if (estimation === 2) {
    newEstimation = 'Coûteux';
    budgetStar.push('1', '2');
  }

  const selectOneCheckbox = (checkboxId) => {
    // Get all checkbox 'choose-suggestion' in the DOM
    const checkboxList = document.getElementsByName('choose-suggestion');

    // Uncheck all checkbox
    checkboxList.forEach((element) => {
      element.checked = false;
    });
    // Check the chosen checkbox
    checkboxId.checked = true;
  };

  return (
    <div className="suggestion-container">
      <form
        className="suggestion-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          // Send activity name to server
          handleSuggestionSubmit();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <label className="choose-suggestion-label" htmlFor={name}>
          <input
            className="choose-suggestion-input"
            name="choose-suggestion"
            id={name}
            value={name}
            type="checkbox"
            onChange={(evt) => {
              selectOneCheckbox(evt.currentTarget);
              updateSuggestion(evt.currentTarget.value);
            }}
          />
          {!setIdea && (
            <>
              <span>Je choisis cette activité !</span>
              <div className="suggestion-checkbox" />
              <button type="submit" className="choose-suggestion-btn">Confirmer</button>
            </>
          )}
        </label>
      </form>

      <div className="suggestion-picture">
        <img src={`assets/images/activities/${picture}`} alt="" />
      </div>
      <div className="suggestion-budget">
        <p>Budget</p>
        {budgetStar.map((star) => (
          <Star key={star} />
        ))}
        <span className="budget-tooltip" aria-label={newEstimation} />
      </div>

      <div className="suggestion-categories">
        {category.map((currentCategory) => (
          <p
            key={currentCategory}
            className="category-name"
          >
            {currentCategory}
          </p>
        ))}
      </div>

      <div className="suggestion-name">
        <span>{name}</span>
        <button
          type="button"
          className="suggestion-search"
          aria-label="Suggestion search button"
          title="Rechercher près de chez moi"
          name={name}
          onClick={(evt) => {
            // Open google search screen with activity name and user's city
            window.open(`//bing.com/search?q=${evt.currentTarget.name}+${city}`, '_blank');
          }}
        />
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  estimation: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  setIdea: PropTypes.bool.isRequired,
  updateSuggestion: PropTypes.func.isRequired,
  handleSuggestionSubmit: PropTypes.func.isRequired,
};

export default Suggestion;
