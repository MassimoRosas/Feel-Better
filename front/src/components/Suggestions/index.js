/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Loader from 'src/components/Loader';

import people from 'src/assets/images/people-happy.png';

import Suggestion from 'src/containers/Suggestions/Suggestion';
import Success from 'src/containers/Notification/Success';
import './suggestion.scss';

const Suggestions = ({
  setMood,
  ideas,
  isLoading,
  suggestionSuccess,
  mood,
}) => {
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    return <Redirect to="/login" />;
  }

  if (!setMood) {
    return (
      <div className="suggestions-empty">Il faut d'abord répondre au <Link to="/mood" className="redirect-mood-link">formulaire d'humeur</Link> avant de s'amuser !

        <img className="people-img" src={people} alt="" />

      </div>
    );
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }

  let newMood = '';
  switch (mood) {
    case 'glad':
      newMood = 'Content';
      break;
    case 'joyful':
      newMood = 'Heureux';
      break;
    case 'confident':
      newMood = 'Confiant';
      break;
    case 'relaxed':
      newMood = 'Détendu';
      break;
    case 'angry':
      newMood = 'En colère';
      break;
    case 'agressive':
      newMood = 'Aggressif';
      break;
    case 'in-love':
      newMood = 'Amoureux';
      break;
    case 'lack-of-self-confidence':
      newMood = 'Timide';
      break;
    case 'lonely':
      newMood = 'Seul';
      break;
    case 'pessimistic':
      newMood = 'Pessimiste';
      break;
    case 'sad':
      newMood = 'Triste';
      break;
    case 'stressed':
      newMood = 'Stressé';
      break;
    case 'worried':
      newMood = 'Angoissé';
      break;
    case 'indecisive':
      newMood = 'Indécis';
      break;
    default:
      newMood = '';
  }

  if (!isLoading) {
    return (
      <div className="suggestions">
        {suggestionSuccess && (
          <Success message="Ton activité a bien été enregistrée, tu peux la retrouver sur ton calendrier !" />
        )}
        <h2 className="suggestions-title">On te propose les activités suivantes pour ton humeur {newMood}: </h2>
        <div className="suggestions-wrapper">
          {ideas.map((idea) => (
            <Suggestion
              key={idea.name}
              {...idea}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="suggestions-container">Vous n'avez pas répondu au formulaire !</div>
  );
};

Suggestions.propTypes = {
  setMood: PropTypes.bool.isRequired,
  ideas: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  suggestionSuccess: PropTypes.bool.isRequired,
  mood: PropTypes.string.isRequired,
};

export default Suggestions;
