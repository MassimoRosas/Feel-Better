import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <nav className="footer-nav">
      <li className="footer-li">
        <Link className="footer-link" to="/legal-notices">Mentions légales</Link>
      </li>

      <li className="footer-li">
        <Link className="footer-link" to="/team">L'équipe</Link>
      </li>

      <li className="footer-li">
        Feel Better © 2020
      </li>
    </nav>
  </footer>
);

export default Footer;
