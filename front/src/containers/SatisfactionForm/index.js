import { connect } from 'react-redux';
import SatisfactionForm from 'src/components/SatisfactionForm';
import {
  updatePertinence,
  updateComment,
  updateSatisfaction,
  handleSatisfactionSubmit,
} from 'src/actions/satisfaction';

import { closeMessage } from 'src/actions/authentification';

// === mapStateToProps
const mapStateToProps = (state) => ({
  comment: state.satisfaction.comment,
  satisfactionSuccess: state.satisfaction.satisfactionSuccess,
  satisfactionError: state.satisfaction.satisfactionError,
  setSatisfaction: state.satisfaction.setSatisfaction,
  showSatisfactionForm: state.satisfaction.showSatisfactionForm,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  updateSatisfaction: (value) => {
    dispatch(updateSatisfaction(value));
  },

  updateComment: (value) => {
    dispatch(updateComment(value));
  },

  updatePertinence: (value) => {
    dispatch(updatePertinence(value));
  },

  handleSatisfactionSubmit: () => {
    dispatch(handleSatisfactionSubmit());
  },

  closeMessage: () => {
    dispatch(closeMessage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionForm);
