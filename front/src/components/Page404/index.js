import React from 'react';
import { Link } from 'react-router-dom';

import excalibur404 from 'src/assets/images/excalibur404.png';

import './page404.scss';

const Page404 = () => (

  <div className="error-container">
    <div>
      <p className="error-text">
        Page non trouvée
      </p>

      <Link to="/" className="link-back">
        Retour à la page d'accueil
      </Link>
    </div>

    <img src={excalibur404} alt="" className="excaPicture" />
  </div>

);

export default Page404;
