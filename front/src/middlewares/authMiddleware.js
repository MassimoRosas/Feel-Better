/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import {
  LOG_IN,
  connectUser,
  REGISTER,
  CHECK_LOGGED,
  updateLoader,
  catchErrorsLogin,
  catchErrorsRegister,
} from 'src/actions/authentification';

import { saveColor, loadCalendar } from 'src/actions/mood';

import { saveSatisfaction } from 'src/actions/satisfaction';

const authMiddleware = (store) => (next) => (action) => {
  const apiUrl = 'http://3.89.193.249/api/v1';

  switch (action.type) {
    case LOG_IN: {
      // Get user's email and user's password in the state to send to the API
      const { emailLogin: email, passwordLogin: password } = store.getState().auth;

      axios.post(`${apiUrl}/login`, {
        email,
        password,
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            console.log('response for login: ', response);
            // Store user'informations received from API response in the state
            store.dispatch(connectUser(response.data.user, response.data.logged));

            // Save satisfaction bool in the state (for the satisfaction form)
            store.dispatch(saveSatisfaction(response.data.satisfaction));

            // Save user color
            store.dispatch(saveColor(response.data.color));

            // Save the JWT in localStorage
            localStorage.setItem('userToken', response.data.user.token);

            // Load calendar datas
            store.dispatch(loadCalendar());
          }

          if (response.status === 202) {
            console.log('response for errors', response);
            console.log('response for login errors :', response.data.violations);
            store.dispatch(catchErrorsLogin(response.data.violations));
          }
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case REGISTER: {
      const {
        firstname,
        lastname,
        email,
        password,
        confirm_password,
        city,
        birthday,
        avatar: type,
      } = store.getState().auth;

      // Send default value for mood and color because server needs it
      const mood = 'blissful';
      const color = '#dfe5f0';

      axios.post(`${apiUrl}/register`, {
        firstname,
        lastname,
        email,
        password,
        confirm_password,
        city,
        birthday,
        type,
        mood,
        color,
      })
        .then((response) => {
          console.log('response for register: ', response);

          if (response.status === 201) {
            // If form is successfully submitted, store user's datas in the state
            store.dispatch(connectUser(response.data.user, response.data.registered));

            // And, save the token inside localStorage
            localStorage.setItem('userToken', response.data.user.token);
          }

          if (response.status === 202) {
            console.log('catch error: ', response.data.violations);
            // If there are errors in the form, we store them in the state
            store.dispatch(catchErrorsRegister(response.data.violations));
          }
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case CHECK_LOGGED: {
      const token = localStorage.getItem('userToken');

      // Send token store in localStorage
      // If token exist and is valid,
      // user data is send from server and user is connected persistently
      // If not, user data is empty and user is redirect to login page
      axios.post(`${apiUrl}/islogged`, { token })
        .then((response) => {
          // Connects user and store data in the state
          console.log('response for check logged: ', response);
          store.dispatch(connectUser(response.data.verifyUser.user, response.data.verifyUser.logged));
          store.dispatch(saveColor(response.data.color));
        })
        .catch((error) => {
          console.warn(error);
          // Hide loader if user isn't connected and refresh page
          store.dispatch(updateLoader());
        });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default authMiddleware;
