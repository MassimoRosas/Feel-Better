import axios from 'axios';
import {
  HANDLE_SATISFACTION_SUBMIT,
  saveStatus,
  showSatisfactionSuccess,
  showSatisfactionError,
} from 'src/actions/satisfaction';

const satisfactionMiddleware = (store) => (next) => (action) => {
  const apiUrl = 'http://3.89.193.249/api/v1';

  switch (action.type) {
    case HANDLE_SATISFACTION_SUBMIT: {
      const { satisfaction, comment, pertinenceString } = store.getState().satisfaction;
      // Convert string value to number because server expects a number
      const rating = parseInt(satisfaction, 10);
      const pertinence = parseInt(pertinenceString, 10);

      const token = localStorage.getItem('userToken');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(`${apiUrl}/setsatisfaction`, {
        rating,
        comment,
        pertinence,
        token,
      }, config)
        .then((response) => {
          store.dispatch(showSatisfactionSuccess());
          console.log('response for satisfaction: ', response);
          store.dispatch(saveStatus(response.data.setSatisfaction));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(showSatisfactionError());
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default satisfactionMiddleware;
