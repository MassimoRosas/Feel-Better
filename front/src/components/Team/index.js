import React from 'react';

import Member from './Member';
import './team.scss';

import Massimo from 'src/assets/images/massimo.jpg';
import Arnaud from 'src/assets/images/arnaud.jpg';
import Emilie from 'src/assets/images/emilie.jpg';
import Chloe from 'src/assets/images/chloe.png';
import Quentin from 'src/assets/images/quentin.jpg';

const Team = () => (
  <div className="team">
    <div className="team-container">
      <Member
        name="Massimo Rosas"
        teamRole="Lead Dev Front"
        image={Massimo}
      />
      <Member
        name="Chloé Cuny"
        teamRole="Product Owner / Dev Front"
        image={Chloe}
      />
      <Member
        name="Emilie Maniglier"
        teamRole="Git Master / Dev Front"
        image={Emilie}
      />
      <Member
        name="Quentin Barraud"
        teamRole="Scrum Master / Dev Back"
        image={Quentin}
      />
      <Member
        name="Arnaud Gadroy"
        teamRole="Lead Dev Back"
        image={Arnaud}
      />
    </div>
  </div>
);

export default Team;
