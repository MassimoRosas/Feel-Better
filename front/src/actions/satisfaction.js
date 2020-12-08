export const SAVE_SATISFACTION = 'SAVE_SATISFACTION';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_PERTINENCE = 'UPDATE_PERTINENCE';
export const UPDATE_SATISFACTION = 'UPDATE_SATISFACTION';

// Save satisfaction bool from API response into the state
export const saveSatisfaction = (satisfaction) => ({
  type: SAVE_SATISFACTION,
  satisfaction,
});

// Update user's comment from satisfaction form in the state
export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

// Update pertinence chosen by the user from satisfaction form in the state
export const updatePertinence = (pertinence) => ({
  type: UPDATE_PERTINENCE,
  pertinence,
});

// Update rating chosen by the user from satisfaction form in the state
export const updateSatisfaction = (satisfaction) => ({
  type: UPDATE_SATISFACTION,
  satisfaction,
});

// === Middleware action ===
export const HANDLE_SATISFACTION_SUBMIT = 'HANDLE_SATISFACTION_SUBMIT';
export const SHOW_SATISFACTION_SUCCESS = 'SHOW_SATISFACTION_SUCCESS';
export const SHOW_SATISFACTION_ERROR = 'SHOW_SATISFACTION_ERROR';
export const SAVE_STATUS = 'SAVE_STATUS';

export const handleSatisfactionSubmit = () => ({
  type: HANDLE_SATISFACTION_SUBMIT,
});

export const showSatisfactionSuccess = () => ({
  type: SHOW_SATISFACTION_SUCCESS,
});

export const showSatisfactionError = () => ({
  type: SHOW_SATISFACTION_ERROR,
});

export const saveStatus = (status) => ({
  type: SAVE_STATUS,
  status,
});
