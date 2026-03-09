import React from 'react';
import './Header.sass';
import foto from '../../assets/perfil.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faMobileScreenButton,faLocationDot } from '@fortawesome/free-solid-svg-icons';

// ...existing code...
const Header = ({ name, contact }) => (
  <div className='header'>
    <h1 className='name'>{name}</h1>
    <div className='data'>
      <div className='data-basic'>
        <div className='data-basic-icon'><FontAwesomeIcon icon={faEnvelope} /></div>
        <div className='data-basic-text'><b> {contact.email}</b></div>
        <div className='data-basic-icon'><FontAwesomeIcon icon={faMobileScreenButton} /></div>
        <div className='data-basic-text'><b> {contact.phone}</b></div>
        <div className='data-basic-icon'><FontAwesomeIcon icon={faLocationDot} /></div>
        <div className='data-basic-text'><b> {contact.location}</b></div>
      </div>
      <div className='data-foto'>
        <img className='img' src={foto} alt="Foto de perfil" />
      </div>
    </div>
    <div className='networking'>
        <div className='networking-space'>
        <div className='networking-space-link'><b>LinkedIn : </b></div>
        <div  className='networking-space-data'>linkedin.com/in/dcsoft/</div>
      </div>
        <div className='networking-space'>
        <div className='networking-space-link'><b>GitHub : </b></div>
        <div  className='networking-space-data'>github.com/dcsoft-ux/</div>
      </div>
        <div className='networking-space'>
        <div className='networking-space-link'><b>CvLac : </b></div>
        <div  className='networking-space-data'>scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001614128/</div>
      </div>
    </div>
    <hr className='line' />
  </div>
);

export default Header;