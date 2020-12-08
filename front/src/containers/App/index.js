/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import App from 'src/components/App';
import { checkLogged } from 'src/actions/authentification';
import { loadCalendar } from 'src/actions/mood';

// === mapStateToProps
const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
  timestamp: state.mood.timestamp,
  setMood: state.mood.setMood,
  color: state.mood.color,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  // Check if token exist in localstorage
  // If yes, update isLogged to true (see in reducer)
  checkLogged: () => {
    dispatch(checkLogged());
  },

  // Request to API to get calendar datas
  loadCalendar: () => {
    dispatch(loadCalendar());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
