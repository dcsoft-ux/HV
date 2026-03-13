import React from 'react';
import './Competencias_Tecnicas.sass';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faKey, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const Competencias_Tecnicas = ({ Competencias_Tecnicas }) => (
  <section className='Competencias_Tecnicas'>
    <h3 className='tittle'>
      <div className='tittle-icon'><FontAwesomeIcon icon={faKey} /></div>
      <div className='tittle-tittle'>Competencias Técnicas</div>
    </h3>
    {Competencias_Tecnicas.map((job, index) => (
      <div className='data' key={index}>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faGears} /></div>
          <div className='card-text'>{job.data}</div>
        </div>
      </div>
    ))}
  </section>
);

export default Competencias_Tecnicas;
