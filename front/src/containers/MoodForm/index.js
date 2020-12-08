import { connect } from 'react-redux';
import MoodForm from 'src/components/MoodForm';
import {
  handleMoodSubmit,
  updateMood,
  updateEstimation,
  closeModale,
  openModale,
} from 'src/actions/mood';

// === mapStateToProps
const mapStateToProps = (state) => ({
  setMood: state.mood.setMood,
  showModale: state.mood.showModale,
  moodError: state.mood.moodError,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  handleMoodSubmit: () => {
    dispatch(handleMoodSubmit());
  },

  updateMood: (mood) => {
    dispatch(updateMood(mood));
  },

  updateEstimation: (estimation) => {
    dispatch(updateEstimation(estimation));
  },

  closeModale: () => {
    dispatch(closeModale());
  },

  openModale: () => {
    dispatch(openModale());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoodForm);
