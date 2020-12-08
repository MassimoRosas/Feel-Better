/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import Suggestion from 'src/components/Suggestions/Suggestion';
import { updateSuggestion, handleSuggestionSubmit } from 'src/actions/mood';

// === mapStateToProps
const mapStateToProps = (state) => ({
  city: state.auth.data.city,
  setIdea: state.mood.setIdea,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  updateSuggestion: (suggestion) => {
    dispatch(updateSuggestion(suggestion));
  },

  handleSuggestionSubmit: () => {
    dispatch(handleSuggestionSubmit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
