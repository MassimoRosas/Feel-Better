export const HANDLE_MOOD_SUBMIT = 'HANDLE_MOOD_SUBMIT';
export const UPDATE_MOOD = 'UPDATE_MOOD';
export const UPDATE_ESTIMATION = 'UPDATE_ESTIMATION';
export const SAVE_MOOD = 'SAVE_MOOD';
export const SET_DATE = 'SET_DATE';
export const SHOW_MOOD = 'SHOW_MOOD';
export const UPDATE_SUGGESTION = 'UPDATE_SUGGESTION';
export const CLOSE_MODALE = 'CLOSE_MODALE';
export const OPEN_MODALE = 'OPEN_MODALE';

// Send user's mood and estimation to the server
export const handleMoodSubmit = () => ({
  type: HANDLE_MOOD_SUBMIT,
});

// Update mood state with user's mood
export const updateMood = (mood) => ({
  type: UPDATE_MOOD,
  mood,
});

// Update estimation state with user's estimation
export const updateEstimation = (estimation) => ({
  type: UPDATE_ESTIMATION,
  estimation,
});

// Save data received from API in the state once mood form is submitted
export const saveMood = (setMood) => ({
  type: SAVE_MOOD,
  setMood,
});

// Update date state with the date selected on the calendar
export const setDate = (date) => ({
  type: SET_DATE,
  date,
});

// Display or hide mood informations on calendar
export const showMood = () => ({
  type: SHOW_MOOD,
});

// Update suggestion state with suggestion chosen by the user
export const updateSuggestion = (suggestion) => ({
  type: UPDATE_SUGGESTION,
  suggestion,
});

// Change the showModale status in the state
export const closeModale = () => ({
  type: CLOSE_MODALE,
});

export const openModale = () => ({
  type: OPEN_MODALE,
});

// === Middleware actions
export const LOAD_SUGGESTIONS = 'LOAD_SUGGESTIONS';
export const HANDLE_SUGGESTION_SUBMIT = 'HANDLE_SUGGESTION_SUBMIT';
export const SAVE_IDEA_BOOL = 'SAVE_IDEA_BOOL';
export const LOAD_CALENDAR = 'LOAD_CALENDAR';
export const SAVE_CALENDAR = 'SAVE_CALENDAR';
export const CHECK_MOOD_ERROR = 'CHECK_MOOD_ERROR';
export const SAVE_COLOR = 'SAVE_COLOR';


// Request to API in order to get the suggestions according to user's mood
export const loadSuggestions = (ideas) => ({
  type: LOAD_SUGGESTIONS,
  ideas,
});

// Send the suggestion chosen by the user to the server
export const handleSuggestionSubmit = () => ({
  type: HANDLE_SUGGESTION_SUBMIT,
});

// Save the bool from server response in the state
export const saveIdeaBool = (setIdea) => ({
  type: SAVE_IDEA_BOOL,
  setIdea,
});

// Save calendar data in the state
export const saveCalendar = (calendar) => ({
  type: SAVE_CALENDAR,
  calendar,
});

// Send request to API in order to get the datas for the calendar
export const loadCalendar = () => ({
  type: LOAD_CALENDAR,
});

export const checkMoodError = () => ({
  type: CHECK_MOOD_ERROR,
});

export const saveColor = (color) => ({
  type: SAVE_COLOR,
  color,
});
