import React from 'react'
import './Resumen.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
const Resumen = ({resumen}) => {
  return (
    <section className='Sumary'>
        <h3 className='tittle'>
            <div className='tittle-icon'><FontAwesomeIcon icon={faFingerprint} /></div>
            <div className='tittle-tittle'>Resumen Profesional</div>
        </h3>
        <div className='sumary'>
            <div className='sumary-text'>{resumen.summary1}</div>
            <div className='sumary-text'>{resumen.summary2}</div>
            <div className='sumary-text'>{resumen.summary3}</div>
        </div>
    </section>
  )
}

export default Resumen