import React from 'react';
import './Fortalezas_Docente.sass';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faWrench, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Fortalezas_Docente = ({ Fortalezas_Docente }) => (
  <section className='Fortalezas_Docente'>
    <h3 className='tittle'>
      <div className='tittle-icon'><FontAwesomeIcon icon={faDumbbell} /></div>
      <div className='tittle-tittle'>
        {Fortalezas_Docente.title}
      </div>
    </h3>
    {Fortalezas_Docente.items.map((job, index) => (
      <div className='data' key={index}>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faWrench} /></div>
          <div className='card-text'>{job.data}</div>
        </div>
      </div>
    ))}
  </section>
);

export default Fortalezas_Docente;
