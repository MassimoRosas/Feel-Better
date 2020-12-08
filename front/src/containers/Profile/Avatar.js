/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import Avatar from 'src/components/Profile/Avatar';

import {
  updateAvatarMood,
  updateAvatarType,
  updateAvatarColor,
  submitAvatar,
} from 'src/actions/profile';

// === mapStateToProps
const mapStateToProps = (state) => ({
  avatar: state.auth.data.avatar,
  avatarType: state.profile.avatarType,
  avatarMood: state.profile.avatarMood,
  avatarColor: state.profile.avatarColor,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  // Update user's avatar mood
  updateAvatarMood: (mood) => {
    dispatch(updateAvatarMood(mood));
  },

  // Update user's avatar type
  updateAvatarType: (type) => {
    dispatch(updateAvatarType(type));
  },

  // Update user's avatar color
  updateAvatarColor: (color) => {
    dispatch(updateAvatarColor(color));
  },

  handleAvatarSubmit: () => {
    dispatch(submitAvatar());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
