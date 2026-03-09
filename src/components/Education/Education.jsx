import React from 'react';
import './Education.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchoolFlag, faGraduationCap, faFile, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
const Education = ({ education }) => (
  <section className='Education'>
        <h3 className='tittle'>
          <div className='tittle-icon'><FontAwesomeIcon icon={faSchoolFlag} /></div>
          <div className='tittle-tittle'>
        {education.title}
      </div>
      </h3>
    {education.items.map((edu, index) => (
      <div className='data' key={index}>
        <h4 className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faBuildingColumns} /></div>
          <div className='card-tittle'><b>{edu.degree}</b></div>
        </h4>
        <div className='card'>
          <div className='card-icon'><FontAwesomeIcon icon={faGraduationCap} /></div>
          <div className='card-text'>
          <div className='card-text-data'>
            <div>{edu.institution}</div> 
            <div>-</div>
            <div>{edu.year}</div>
            </div>
          </div>
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
