/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import User from 'src/components/Profile/User';

import {
  updateProfileField,
  submitProfile,
} from 'src/actions/profile';

// === mapStateToProps
const mapStateToProps = (state) => ({
  firstname: state.auth.data.firstname,
  lastname: state.auth.data.lastname,
  password: state.profile.password,
  email: state.auth.data.email,
  city: state.auth.data.city,
  birthday: state.auth.data.birthday,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  // Update email and password informations in the state when the user writes in the input
  updateField: (identifier, newValue) => {
    dispatch(updateProfileField(identifier, newValue));
  },

  handleSubmit: () => {
    dispatch(submitProfile());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
