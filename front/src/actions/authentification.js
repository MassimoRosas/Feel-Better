export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SAVE_AVATAR = 'SAVE_AVATAR';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CHECK_LOGGED = 'CHECK_LOGGED';
export const LOG_OUT = 'LOG_OUT';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

// updates login fields by their identifier
export const updateLoginField = (identifier, newValue) => ({
  type: UPDATE_LOGIN_FIELD,
  identifier,
  newValue,
});

// Saves user avatar in register form
export const saveAvatar = (avatar) => ({
  type: SAVE_AVATAR,
  avatar,
});

// handles login submission
export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const closeMessage = () => ({
  type: CLOSE_MESSAGE,
});

// ==== Middleware actions ====
export const LOG_IN = 'LOG_IN';
export const CONNECT_USER = 'CONNECT_USER';
export const REGISTER = 'REGISTER';
export const UPDATE_LOADER = 'UPDATE_LOADER';
export const CATCH_ERRORS_LOGIN = 'CATCH_ERRORS_LOGIN';
export const CATCH_ERRORS_REGISTER = 'CATCH_ERRORS_REGISTER';

// logs the user
export const logIn = () => ({
  type: LOG_IN,
});

// store user data in the state + status logged
export const connectUser = (data, isLogged) => ({
  type: CONNECT_USER,
  data,
  isLogged,
});

// creates a new user
export const register = () => ({
  type: REGISTER,
});

// checks if there's already a user token in local storage
export const checkLogged = () => ({
  type: CHECK_LOGGED,
});

// disconnects users
export const logOut = () => ({
  type: LOG_OUT,
});

export const updateLoader = () => ({
  type: UPDATE_LOADER,
});

export const catchErrorsLogin = (data) => ({
  type: CATCH_ERRORS_LOGIN,
  data,
});

export const catchErrorsRegister = (data) => ({
  type: CATCH_ERRORS_REGISTER,
  data,
});
