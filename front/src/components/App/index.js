/* eslint-disable import/no-unresolved */
// == Import npm
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Chromotherapy from 'src/styles/Chromotherapy';
import GlobalStyles from 'src/styles/GlobalStyles';
import useDarkMode from 'src/styles/useDarkMode';
import { lightTheme, darkTheme } from 'src/styles/Theme';

// == Local import
import Header from 'src/containers/Header';
import Home from 'src/containers/Home';
import Profile from 'src/containers/Profile';
import Suggestions from 'src/containers/Suggestions';
import MoodForm from 'src/containers/MoodForm';
import Footer from 'src/components/Footer';
import Team from 'src/components/Team';
import LegalNotices from 'src/components/LegalNotices';
import MoodCalendar from 'src/containers/MoodCalendar';
import SatisfactionForm from 'src/containers/SatisfactionForm';

import Page404 from 'src/components/Page404';

import Login from 'src/containers/Login';
import Register from 'src/containers/Register';

import people from 'src/assets/images/people-emotions.png';
import peopleNight from 'src/assets/images/people-emotions-night.png';
import './styles.scss';

// == Composant
const App = ({ checkLogged, loadCalendar, color }) => {
  useEffect(() => {
    // Send request to API in order to check if user token exist and is valid
    checkLogged();
    // Send request to API in order to get calendar data
    loadCalendar();
  }, []);

  // Defines color according to user's mood
  const userColor = color ? color : '#8590BD';

  // ===== Dark / Light Theme =====
  // Custom hook which contains the chosen theme and the toggle function to switch between modes
  const [theme, themeToggler] = useDarkMode();
  // Toggle either dark or light theme based on the truth condition
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  // Toggle image with either sun or moon based on the theme
  const image = theme === 'light' ? people : peopleNight;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Chromotherapy color={userColor} />
      <div className="app">
        <Header themeToggler={themeToggler} />
        <Switch>
          <Route exact path="/">
            <Home image={image} />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/team">
            <Team />
          </Route>

          <Route exact path="/legal-notices">
            <LegalNotices />
          </Route>

          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route exact path="/mood">
            <MoodForm />
          </Route>

          <Route exact path="/calendar">
            <MoodCalendar />
          </Route>

          <Route exact path="/suggestions">
            <Suggestions />
          </Route>

          <Route exact path="/satisfaction">
            <SatisfactionForm />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

App.propTypes = {
  checkLogged: PropTypes.func.isRequired,
  loadCalendar: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

// == Export
export default App;
