/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Success from 'src/containers/Notification/Success';
import Error from 'src/containers/Notification/Error';
import Avatar from 'src/containers/Profile/Avatar';
import User from 'src/containers/Profile/User';
import Loader from 'src/components/Loader';

import './profile.scss';

const Profile = ({
  isLogged,
  isLoading,
  successProfile,
  successAvatar,
  errors,
}) => {
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    return <Redirect to="/login" />;
  }

  // Get all the input in the form
  const allElements = document.querySelectorAll('.profile-input');
  allElements.forEach((element) => {
    // For each input, remove the class register-error
    element.classList.remove('profile-error');
  });

  // If there are errors
  if (errors.length > 0) {
    // Loop over the array
    errors.forEach((error) => {
      // Get the input where there is an error with propertyPath
      const elements = document.getElementById(error.propertyPath);
      // Add class to input
      elements.classList.add('profile-error');
    });
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {errors.length > 0 && <Error errors={errors} />}

          {successProfile && (
            <Success message="Tes informations ont bien été mises à jour !" />
          )}
          {successAvatar && (
            <Success message="Ton avatar a bien été mis à jour !" />
          )}

          <div className="profile">
            {isLogged && <Avatar />}
            <User />
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  successProfile: PropTypes.bool.isRequired,
  successAvatar: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
};

export default Profile;
