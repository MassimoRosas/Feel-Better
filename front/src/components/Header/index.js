/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from 'src/assets/images/logo.png';

import './header.scss';

const Header = ({
  isLogged,
  logout,
  themeToggler,
  openModale,
}) => {
  const [addClass, setAddClass] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <span className="navbar-toggle">
          <input
            type="checkbox"
            id="checkbox4"
            className="checkbox4
            visuallyHidden"
            onClick={() => {
              setAddClass(!addClass);
            }}
          />
          <label htmlFor="checkbox4">
            <div className="hamburger">
              <span className="bar bar1" />
              <span className="bar bar2" />
              <span className="bar bar3" />
              <span className="bar bar4" />
              <span className="bar bar5" />
            </div>
          </label>
        </span>

        <h1 className="main-title">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo Feel Better" />
          </Link>
        </h1>
        <ul className={addClass ? 'main-nav active' : 'main-nav'}>
          <div className="toggleWrapper">
            <input
              type="checkbox"
              className="dn"
              id="dn"
              onChange={themeToggler}
            />
            <label htmlFor="dn" className="toggle">
              <span className="toggle__handler">
                <span className="crater crater--1" />
                <span className="crater crater--2" />
                <span className="crater crater--3" />
              </span>
              <span className="toggleStar star--1" />
              <span className="toggleStar star--2" />
              <span className="toggleStar star--3" />
              <span className="toggleStar star--4" />
              <span className="toggleStar star--5" />
              <span className="toggleStar star--6" />
            </label>
          </div>
          <li>
            <NavLink
              exact
              to="/"
              className="nav-links"
              activeClassName="nav-links--active"
              onClick={() => {
                setAddClass(!addClass);
              }}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/profile"
              className="nav-links"
              activeClassName="nav-links--active"
              onClick={() => {
                setAddClass(!addClass);
              }}
            >
              Profil
            </NavLink>
          </li>
          {isLogged && (
            <li>
              <NavLink
                exact
                to="/mood"
                className="nav-links"
                onClick={() => {
                  openModale();
                  setAddClass(!addClass);
                }}
              >
                Mon humeur
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              exact
              to="/calendar"
              className="nav-links"
              activeClassName="nav-links--active"
              onClick={() => {
                setAddClass(!addClass);
              }}
            >
              Calendrier
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/suggestions"
              className="nav-links"
              activeClassName="nav-links--active"
              onClick={() => {
                setAddClass(!addClass);
              }}
            >
              Activités
            </NavLink>
          </li>
          {isLogged && (
            <li>
              <NavLink
                exact
                to="/"
                className="nav-links"
                onClick={() => {
                  logout();
                  setAddClass(!addClass);
                }}
              >
                Se déconnecter
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  themeToggler: PropTypes.func.isRequired,
  openModale: PropTypes.func.isRequired,
};

export default Header;
