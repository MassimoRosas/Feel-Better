import { connect } from 'react-redux';
import Register from 'src/components/Register';

import { updateLoginField, register, saveAvatar } from 'src/actions/authentification';

// === mapStateToProps
const mapStateToProps = (state) => ({
  // Send state information to REgister component
  email: state.auth.email,
  password: state.auth.password,
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
  confirm_password: state.auth.confirm_password,
  city: state.auth.city,
  birthday: state.auth.birthday,
  isLogged: state.auth.isLogged,
  errorsRegister: state.auth.errorDataRegister,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  updateField: (identifier, newValue) => {
    dispatch(updateLoginField(identifier, newValue));
  },

  saveAvatar: (avatar) => {
    dispatch(saveAvatar(avatar));
  },

  submitRegister: () => {
    dispatch(register());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
