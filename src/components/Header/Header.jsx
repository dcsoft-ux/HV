import React from 'react';
import './Header.sass';
import foto from '../../assets/perfil.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faMobileScreenButton,faLocationDot } from '@fortawesome/free-solid-svg-icons';

// ...existing code...
const Header = ({ name, title, contact }) => (
  <div className='header'>
    <h1 className='name'>{name}</h1>
    <h2 className='tittle'>{title}</h2>
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
      <a className='networking-link' href="https://www.linkedin.com/in/dcsoft/" target="_blank"><b>LinkedIn</b></a>
      <a className='networking-link' href="https:/github.com/dcsoft-ux" target="_blank"><b>GitHub</b></a> 
      <a className='networking-link' href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001614128" target="_blank"><b>CvLac</b></a></div>
    <hr className='line' />
  </div>
);

export default Header;