/* eslint-disable import/no-unresolved */
import axios from 'axios';
import {
  HANDLE_MOOD_SUBMIT,
  saveMood,
  loadSuggestions,
  HANDLE_SUGGESTION_SUBMIT,
  saveIdeaBool,
  LOAD_CALENDAR,
  saveCalendar,
  checkMoodError,
  saveColor,
} from 'src/actions/mood';

const moodMiddleware = (store) => (next) => (action) => {
  const apiUrl = 'http://3.89.193.249/api/v1';

  switch (action.type) {
    case HANDLE_MOOD_SUBMIT: {
      const { mood, estimation } = store.getState().mood;
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(`${apiUrl}/setmood`, {
        mood,
        estimation,
        token,
      }, config)
        // Send mood and estimation to API
        .then((response) => {
          console.log('response for mood: ', response);
          // Store response received from API in the state
          store.dispatch(saveMood(response.data.setMood));

          // Store mood color in the state
          store.dispatch(saveColor(response.data.color));
        })
        // And then we store suggestion's data in the state
        .then(() => {
          axios.post(`${apiUrl}/suggestion`, {
            token,
          }, config)
            .then((response) => {
              console.log('response for suggestions: ', response);
              // Store suggestions received from API response in the state
              store.dispatch(loadSuggestions(response.data.ideas));
            });
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(checkMoodError());
        });

      next(action);
      break;
    }
    case HANDLE_SUGGESTION_SUBMIT: {
      const { suggestion: idea } = store.getState().mood;
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(`${apiUrl}/setidea`, {
        idea,
        token,
      }, config)
        // Send mood and estimation to API
        .then((response) => {
          console.log('response for setideas: ', response);
          // Store response received from API in the state
          store.dispatch(saveIdeaBool(response.data.setIdea));
          store.dispatch(saveCalendar(response.data.moodDatas));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case LOAD_CALENDAR: {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(`${apiUrl}/moodcalendar`, {
        token,
      }, config)
        .then((response) => {
          console.log('response for moodcalendar: ', response);
          // Store response received from API in the state
          store.dispatch(saveCalendar(response.data.moodDatas));
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
export default moodMiddleware;
