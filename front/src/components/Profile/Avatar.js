import React from 'react';
import PropTypes from 'prop-types';
import {
  Backpack,
  Cat,
  Chocolate,
  Ghost,
  IceCream,
} from 'react-kawaii';

import './profile.scss';

const Avatar = ({
  avatar,
  avatarType,
  avatarMood,
  avatarColor,
  handleAvatarSubmit,
  updateAvatarMood,
  updateAvatarType,
  updateAvatarColor,
}) => {
  // create an array for each avatar
  const componentList = {
    Backpack,
    Cat,
    Chocolate,
    Ghost,
    IceCream,
  };

  // Get component name from the array componentList according to user's avatar
  // Or get avatar from server's datas if user has changed its avatar
  const UserAvatar = componentList[avatarType || avatar.type];

  return (
    <form
      className="avatar-form"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleAvatarSubmit();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
    >
      <div className="avatar-container">
        <div className="avatar-custom">
          <label htmlFor="avatar-type">
            <select
              name="avatar-type"
              id="avatar-type"
              className="avatar-type"
              value={avatarType}
              onChange={(evt) => {
                updateAvatarType(evt.currentTarget.value);
              }}
            >
              <option defaultValue>Choisis un avatar</option>
              <option value="Backpack">Sac à dos</option>
              <option value="Cat">Chat</option>
              <option value="Chocolate">Chocolat</option>
              <option value="Ghost">Fantôme</option>
              <option value="IceCream">Glace</option>
            </select>
          </label>

          <label htmlFor="avatar-mood">
            <select
              name="avatar-mood"
              id="avatar-mood"
              className="avatar-mood"
              value={avatarMood}
              onChange={(evt) => {
                updateAvatarMood(evt.currentTarget.value);
              }}
            >
              <option defaultValue>Choisis une humeur</option>
              <option value="sad">Triste</option>
              <option value="shocked">Choqué</option>
              <option value="happy">Content</option>
              <option value="excited">Joyeux</option>
              <option value="blissful">Heureux</option>
              <option value="lovestruck">Amoureux</option>
              <option value="ko">K.O</option>
            </select>
          </label>

          <label htmlFor="avatar-color">
            <input
              type="color"
              name="avatar-color"
              id="avatar-color"
              className="avatar-color"
              value={avatarColor}
              onChange={(evt) => {
                updateAvatarColor(evt.currentTarget.value);
              }}
            />
          </label>

        </div>
        <div className="profile-avatar">
          <UserAvatar
            size={170}
            mood={avatarMood || avatar.mood}
            color={avatarColor || avatar.color}
          />
        </div>
        <button
          type="submit"
          className="profile-avatar-btn"
        >
          Changer mon avatar
        </button>
      </div>
    </form>
  );
};

Avatar.propTypes = {
  avatar: PropTypes.object,
  avatarType: PropTypes.string.isRequired,
  avatarMood: PropTypes.string.isRequired,
  avatarColor: PropTypes.string.isRequired,
  updateAvatarMood: PropTypes.func.isRequired,
  updateAvatarType: PropTypes.func.isRequired,
  updateAvatarColor: PropTypes.func.isRequired,
  handleAvatarSubmit: PropTypes.func.isRequired,
};

Avatar.defaultProps = {
  avatar: {},
};

export default Avatar;
