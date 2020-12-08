/* eslint-disable import/no-unresolved */
import {
  UPDATE_PROFILE_FIELD,
  UPDATE_AVATAR_MOOD,
  UPDATE_AVATAR_TYPE,
  UPDATE_AVATAR_COLOR,
  SUBMIT_PROFILE,
  SHOW_SUCCESS_PROFILE,
  SHOW_SUCCESS_AVATAR,
  SUBMIT_AVATAR,
  CATCH_ERRORS_PROFILE,
} from 'src/actions/profile';

import { CLOSE_MESSAGE } from 'src/actions/authentification';

const initialState = {
  avatar: '',
  // User's avatar mood
  avatarMood: '',
  // User's avatar type
  avatarType: '',
  // User's avatar color
  avatarColor: '',
  // Bool that show success notification on avatar form
  successAvatar: false,
  // Bool that show success notification on profile form
  successProfile: false,
  // Array including all error messages
  errorDataProfile: [],
  password: '',
};

const profileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_AVATAR_MOOD:
      return {
        ...state,
        avatarMood: action.mood,
      };
    case UPDATE_AVATAR_TYPE:
      return {
        ...state,
        avatarType: action.avatar,
      };
    case UPDATE_AVATAR_COLOR:
      return {
        ...state,
        avatarColor: action.color,
      };
    case SUBMIT_AVATAR:
      return {
        ...state,
        successAvatar: true,
      };
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.identifier]: action.newValue,
      };
    case SUBMIT_PROFILE:
      return {
        ...state,
        errorDataProfile: [],
        password: '',
      };
    case SHOW_SUCCESS_PROFILE:
      return {
        ...state,
        successProfile: true,
      };
    case SHOW_SUCCESS_AVATAR:
      return {
        ...state,
        successAvatar: true,
      };
    case CLOSE_MESSAGE:
      return {
        ...state,
        successProfile: false,
        successAvatar: false,
        errorDataProfile: [],
      };
    case CATCH_ERRORS_PROFILE:
      return {
        ...state,
        successProfile: false,
        errorDataProfile: action.data,
      };
    default: return state;
  }
};
export default profileReducer;
