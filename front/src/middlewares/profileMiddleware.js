/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { connectUser } from 'src/actions/authentification';
import {
  SUBMIT_PROFILE,
  SUBMIT_AVATAR,
  showSuccessProfile,
  showSuccessAvatar,
  catchErrorsProfile,
} from 'src/actions/profile';

const profileMiddleware = (store) => (next) => (action) => {
  const apiUrl = 'http://3.89.193.249/api/v1';

  switch (action.type) {
    case SUBMIT_AVATAR: {
      const { avatarType, avatarMood, avatarColor } = store.getState().profile;
      // If user has chosen a type for the avatar, send user's choice to server
      let type = avatarType;

      // Else, if user hasn't chosen a type for the avatar, get last type chosen
      // from datas in the state (coming from server datas)
      if (avatarType === '') {
        type = store.getState().auth.data.avatar.type;
      }

      // Same for mood and color
      let mood = avatarMood;
      let color = avatarColor;

      if (avatarMood === '') {
        mood = store.getState().auth.data.avatar.mood;
      }

      if (avatarColor === '') {
        color = store.getState().auth.data.avatar.color;
      }

      const token = localStorage.getItem('userToken');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(`${apiUrl}/setavatar`, {
        type,
        mood,
        color,
        token,
      }, config)
        .then((response) => {
          console.log('response for avatar: ', response);
          store.dispatch(showSuccessAvatar());
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case SUBMIT_PROFILE: {
      const {
        firstname,
        lastname,
        email,
        password,
        city,
      } = store.getState().profile;

      const token = localStorage.getItem('userToken');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(`${apiUrl}/edituser`, {
        firstname,
        lastname,
        email,
        password,
        city,
        token,
      },
      config)
        .then((response) => {
          // If success
          if (response.status === 200) {
            store.dispatch(showSuccessProfile());
            console.log('response for profile: ', response);
            store.dispatch(connectUser(response.data.user, response.data.updated));
            // If user's email has changged, server sends a new token
            // localStorage.removeItem('userToken');
            // localStorage.setItem('userToken', response.data.user.token);
          }

          // If error
          if (response.status === 202) {
            console.log('response for catch errors (profile) :', response);
            store.dispatch(catchErrorsProfile(response.data.violations));
          }
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default profileMiddleware;
