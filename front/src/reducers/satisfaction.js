import {
  SAVE_SATISFACTION,
  UPDATE_SATISFACTION,
  UPDATE_COMMENT,
  UPDATE_PERTINENCE,
  SHOW_SATISFACTION_SUCCESS,
  SHOW_SATISFACTION_ERROR,
  SAVE_STATUS,
} from 'src/actions/satisfaction';

import { LOG_OUT, CLOSE_MESSAGE } from 'src/actions/authentification';

const initialState = {
  // Bool that show satisfaction form or not
  showSatisfactionForm: false,
  // rating of the suggested activities chosen by the user in satisfaction form
  satisfaction: null,
  // User's comment in satisfaction form
  comment: '',
  // pertinence of the suggested activities chosen by the user in satisfaction form
  pertinenceString: null,
  // Bool that show satisfaction success or not
  satisfactionSuccess: false,
  // Bool that show satisfaction error or not
  satisfactionError: false,
  // Bool received on satisfaction form submission
  setSatisfaction: false,
};

const satisfactionReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_SATISFACTION:
      return {
        ...state,
        showSatisfactionForm: action.satisfaction,
      };
    case UPDATE_SATISFACTION:
      return {
        ...state,
        satisfaction: action.satisfaction,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    case UPDATE_PERTINENCE:
      return {
        ...state,
        pertinenceString: action.pertinence,
      };
    case SHOW_SATISFACTION_SUCCESS:
      return {
        ...state,
        satisfactionSuccess: true,
      };
    case SHOW_SATISFACTION_ERROR:
      return {
        ...state,
        satisfactionError: true,
      };
    case CLOSE_MESSAGE:
      return {
        ...state,
        satisfactionSuccess: false,
        satisfactionError: false,
      };
    case SAVE_STATUS:
      return {
        ...state,
        setSatisfaction: action.status,
        showSatisfactionForm: false,
      };
    case LOG_OUT:
      return {
        ...state,
        showSatisfactionForm: false,
      };
    default: return state;
  }
};
export default satisfactionReducer;
