export const UPDATE_PROFILE_FIELD = 'UPDATE_PROFILE_FIELD';
export const UPDATE_AVATAR_MOOD = 'UPDATE_AVATAR_MOOD';
export const UPDATE_AVATAR_TYPE = 'UPDATE_AVATAR_TYPE';
export const UPDATE_AVATAR_COLOR = 'UPDATE_AVATAR_COLOR';
export const SUBMIT_AVATAR = 'SUBMIT_AVATAR';
export const SUBMIT_PROFILE = 'SUBMIT_PROFILE';

//  updates profile fields
export const updateProfileField = (identifier, newValue) => ({
  type: UPDATE_PROFILE_FIELD,
  identifier,
  newValue,
});

// update avatar mood in profile
export const updateAvatarMood = (mood) => ({
  type: UPDATE_AVATAR_MOOD,
  mood,
});

// update avatar type in profile
export const updateAvatarType = (avatar) => ({
  type: UPDATE_AVATAR_TYPE,
  avatar,
});

// update avatar color in profile
export const updateAvatarColor = (color) => ({
  type: UPDATE_AVATAR_COLOR,
  color,
});

// Handles avatar submission (on profile page)
export const submitAvatar = () => ({
  type: SUBMIT_AVATAR,
});

// handles profile submission
export const submitProfile = () => ({
  type: SUBMIT_PROFILE,
});

// ==== Middleware actions ====
export const SHOW_SUCCESS_PROFILE = 'SHOW_SUCCESS_PROFILE';
export const SHOW_SUCCESS_AVATAR = 'SHOW_SUCCESS_AVATAR';
export const CATCH_ERRORS_PROFILE = 'CATCH_ERRORS_PROFILE';

// Show notification on successful form submission
export const showSuccessProfile = () => ({
  type: SHOW_SUCCESS_PROFILE,
});

// Show notification on failure form submission
export const showSuccessAvatar = () => ({
  type: SHOW_SUCCESS_AVATAR,
});

export const catchErrorsProfile = (data) => ({
  type: CATCH_ERRORS_PROFILE,
  data,
});
