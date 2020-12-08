/* eslint-disable no-confusing-arrow */
import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

const Chromotherapy = createGlobalStyle`
  .navbar {
    background: ${(props) => props.color};
  }

  .rectangle1, 
  .rectangle2 {
    background-color: ${(props) => props.color};
  }

  .btn {
    border: 2px solid ${(props) => props.color};
    color: ${(props) => props.color};

    &:before {
      background-color: ${(props) => props.color};
    }
  }

  .footer-link {
    color: ${(props) => props.color};
    border-bottom: ${(props) => props.color};
    box-shadow: inset 0 -1px 0 ${(props) => props.color};

    &:hover {
      background: ${(props) => props.color};
    }
  }  

  .btn-group {
      .register-btn {
      background-color: ${(props) => props.color};

      &:before {
        background-color: ${(props) => props.color};
      }

      &:hover {
        background-color: ${(props) => props.color};
      }
    }
  }

  .mood .mood-form .submit-button {
    border: 2px solid ${(props) => props.color};
    color: ${(props) => props.color};

    &:before {
      background-color: ${(props) => props.color};
    }
  }

  .profile .profile-form .inputBox .profile-input {
    border-bottom: 1px solid ${(props) => props.color};
  }

  .profile .avatar-container .profile-avatar-btn {
    border: 2px solid ${(props) => props.color};
    color: ${(props) => props.color};

    &:before {
      background-color: ${(props) => props.color};
    }
  }

  .profile .profile-form .profile-submit-btn {
    background-color: ${(props) => props.color};
    border: 2px solid ${(props) => props.color};

    &:hover {
      color: ${(props) => props.color};
    }
  }

  .profile .profile-form .inputBox .profile-label {
    color: ${(props) => props.color};
  }

  .suggestions-empty .redirect-mood-link {
    color: ${(props) => props.color};
    border-bottom: 1px solid ${(props) => props.color};
    box-shadow: inset 0 -1px 0 ${(props) => props.color};

    &:hover {
      background: ${(props) => props.color};
    }
  }

  .suggestions .suggestion-container {
    .suggestion-form {
      .choose-suggestion-input:not(:checked) + span:before,
      .choose-suggestion-input:checked + span:before {
        color: ${(props) => props.color};
      }

      .choose-suggestion-btn {
        &:hover {
          background: ${(props) => props.color};
        }
      }
    }

    .suggestion-picture {
      background: ${(props) => props.color};
    }

    .suggestion-budget {
      & > svg {
        color: ${(props) => props.color};
        fill: ${(props) => props.color};
      }
    }

    .suggestion-categories {
      .category-name {
        background-color: ${(props) => props.color};
      }
    }

    .suggestion-name {
      background-color: ${(props) => props.color};
    }
  }

  .team .team-profile {
    .picture {

      &:before, &:after {
        background-color: ${(props) => props.color};
      }
    }

    .name {
      color: ${(props) => props.color};
    }

    .social {
      background-color: ${(props) => props.color};

      li a:hover {
        color: ${(props) => props.color};
      }
    }
  }

  .calendar {

    .react-calendar {
      .react-calendar__tile {
      background: ${(props) => props.color};
      }

      .calendar-mood--active {
        background: ${(props) => darken(0.08, props.color)};
      }

      .react-calendar__month-view__days__day--weekend {
        background: ${(props) => darken(0.11, props.color)};
      }
    }

    }
    .calendar-current-mood-container {
      border: 2px solid ${(props) => props.color};
    }

    .calendar-current-mood-img {
        border: 5px solid ${(props) => props.color};
      }
  }

`;

export default Chromotherapy;
