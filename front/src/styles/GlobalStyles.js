import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .app {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  .main {
    color: ${({ theme }) => theme.text};
  }

  .footer-li {
    color: ${({ theme }) => theme.text};
  }

  .login-redirect, .register-redirect {
    color: ${({ theme }) => theme.loginLink};
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.loginLink};

    &:hover {
      background: ${({ theme }) => theme.loginLink};
      color: ${({ theme }) => theme.headerLinkHover};
    }
  }

  .profile .avatar-container .avatar-mood,
  .profile .avatar-container .avatar-type {
    background: ${({ theme }) => theme.headerLink};
    color: ${({ theme }) => theme.headerLinkHover};
  }
  
  .profile-input {
    color: ${({ theme }) => theme.text};

    &::placeholder {
      color: ${({ theme }) => theme.text};
    }
  }
  
  .mood-title {
    color: ${({ theme }) => theme.moodTitle};
  }

  .nav-links {
    color:  ${({ theme }) => theme.headerLink};

    &--active {
      color:  ${({ theme }) => theme.headerLink};
    }

    &:hover {
      color:  ${({ theme }) => theme.headerLinkHover};
    }
  }

  .main-quote {
    color: ${({ theme }) => theme.quoteText};

    .quote-content {
      &:before {
        color: rgba(${({ theme }) => theme.quoteText}, 0.1);
      }

      &:after {
        color: rgba(${({ theme }) => theme.quoteText}, 0.1);
      }
    }
  }

  .choose-suggestion-input:not(:checked) + span:after,
  .choose-suggestion-input:checked + span:after {
    border: 2px solid ${({ theme }) => theme.suggestionCheckbox};
  }

  .choose-suggestion-btn {
    color: ${({ theme }) => theme.suggestionBtnText};
    background-color: ${({ theme }) => theme.suggestionBtnBackground};

    &:hover {
      color: ${({ theme }) => theme.suggestionBtnBackground};
    }
  }

  .error-container {
    .link-back {
      color: ${({ theme }) => theme.suggestionBtnBackground};
      border: 2px solid ${({ theme }) => theme.suggestionBtnBackground};
      
      &:before {
        background-color: ${({ theme }) => theme.suggestionBtnBackground};
      }

      &:hover {
        color: ${({ theme }) => theme.headerLinkHover};
      }
    }

    
  }

  .react-calendar {

    .react-calendar__navigation > *, .react-calendar__tile {
      color: ${({ theme }) => theme.headerLink};
    }

    .react-calendar__tile {
      border: 1px solid ${({ theme }) => theme.calendarBorder};
    }

    .react-calendar__month-view__weekdays__weekday {
      color: ${({ theme }) => theme.quoteText};
    }
  }
`;

export default GlobalStyles;
