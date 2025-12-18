import React from 'react';
import './Experience.sass';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faCalendarDays, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const Experience = ({ experience }) => (
  <section className='Experience'>
    <h3 className='tittle'>
      <div className='tittle-icon'><FontAwesomeIcon icon={faBriefcase} /></div>
      <div className='tittle-tittle'>Experiencia Laboral</div>
    </h3>
    {experience.map((job, index) => (
      <div className='data' key={index}>
        <h4 className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faBuilding} /></div>
          <div className='card-tittle'><b>{job.role} - {job.company}</b></div>
        </h4>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faCalendarDays} /></div>
          <div className='card-text'>{job.duration}</div>
        </div>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faLightbulb} /></div>
          <div className='card-text'>{job.description}</div>
        </div>
      </div>
    ))}
  </section>
);

export default Experience;
