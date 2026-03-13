import React from 'react';
import './Education.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchoolFlag, faGraduationCap, faFile, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
const Education = ({ education }) => (
  <section className='Education'>
        <h3 className='tittle'>
          <div className='tittle-icon'><FontAwesomeIcon icon={faSchoolFlag} /></div>
          <div className='tittle-tittle'>Educación Formal</div>
      </h3>
    {education.map((edu, index) => (
      <div className='data' key={index}>
        <h4 className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faBuildingColumns} /></div>
          <div className='card-tittle'><b>{edu.degree}</b></div>
        </h4>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faGraduationCap} /></div>
          <div className='card-text'>{edu.institution} - {edu.year}</div>
        </div>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faFile} /></div>
          <div className='card-text'>{edu.thesis}</div>
        </div>
      </div>
    ))}
  </section>
);

export default Education;
