/* eslint-disable import/no-unresolved */
import {
  UPDATE_MOOD,
  UPDATE_ESTIMATION,
  SAVE_MOOD,
  LOAD_SUGGESTIONS,
  SET_DATE,
  SHOW_MOOD,
  UPDATE_SUGGESTION,
  SAVE_IDEA_BOOL,
  SAVE_CALENDAR,
  CLOSE_MODALE,
  OPEN_MODALE,
  CHECK_MOOD_ERROR,
  HANDLE_SUGGESTION_SUBMIT,
  SAVE_COLOR,
} from 'src/actions/mood';

import { LOG_OUT, CLOSE_MESSAGE } from 'src/actions/authentification';

const initialState = {
  mood: '',
  // Estimation in the mood form
  estimation: 0,
  // Bool received in API response, if true the mood form was successfully submitted
  setMood: false,
  // Suggestions
  ideas: [],
  // Mood color
  color: '',
  // Display loader while waiting API response
  isLoading: true,
  // Date selected on the calendar
  calendarDate: '',
  // Display loader while waiting API response
  showMood: false,
  // Suggestion chosen by the user
  suggestion: '',
  // Bool received in API response, if true the suggestion form was successfully submitted
  setIdea: false,
  // Informations related to user's mood
  moodDatas: [],
  // Bool that show the mood modale or not
  showModale: true,
  // Bool that show the mood error notification or not
  moodError: false,
  // Bool that show a success message when choosing a suggestion
  suggestionSuccess: false,
};

const moodReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_MOOD:
      return {
        ...state,
        mood: action.mood,
      };

    case UPDATE_ESTIMATION:
      return {
        ...state,
        estimation: action.estimation,
      };
    case SAVE_MOOD:
      return {
        ...state,
        setMood: action.setMood,
        timestamp: action.timestamp,
      };
    case LOAD_SUGGESTIONS:
      return {
        ...state,
        ideas: action.ideas,
        isLoading: false,
      };
    case SET_DATE:
      return {
        ...state,
        calendarDate: action.date,
      };
    case SHOW_MOOD:
      return {
        ...state,
        showMood: true,
      };
    case UPDATE_SUGGESTION:
      return {
        ...state,
        suggestion: action.suggestion,
      };
    case SAVE_IDEA_BOOL:
      return {
        ...state,
        setIdea: action.setIdea,
      };
    case SAVE_CALENDAR:
      return {
        ...state,
        moodDatas: action.calendar,
      };
    case CLOSE_MODALE:
      return {
        ...state,
        showModale: false,
      };
    case OPEN_MODALE:
      return {
        ...state,
        showModale: true,
      };
    case CHECK_MOOD_ERROR:
      return {
        ...state,
        moodError: true,
      };
    case HANDLE_SUGGESTION_SUBMIT:
      return {
        ...state,
        suggestionSuccess: true,
      };
    case CLOSE_MESSAGE:
      return {
        ...state,
        suggestionSuccess: false,
      };
    case SAVE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case LOG_OUT:
      return {
        ...state,
        color: '',
        moodDatas: [],
        setMood: false,
      };
    default: return state;
  }
};
export default moodReducer;
