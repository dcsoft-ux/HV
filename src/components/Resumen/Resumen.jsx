import React from 'react'
import './Resumen.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'

const Resumen = ({ resumen }) => {
  const paragraphs = Array.isArray(resumen?.paragraphs) ? resumen.paragraphs : []

  return (
    <section className="summary">
      <div className="summary__title">
        <div className="summary__title-icon">
          <FontAwesomeIcon icon={faFingerprint} />
        </div>

        <div className="summary__title-text">
          <h2>{resumen?.title || 'Perfil profesional'}</h2>
          {resumen?.subtitle ? <p>{resumen.subtitle}</p> : null}
        </div>
      </div>

      <div className="summary__content">
        {paragraphs.length > 0 ? (
          paragraphs.map((item, index) => (
            <p className="summary__text" key={`${item}-${index}`}>
              {item}
            </p>
          ))
        ) : (
          <p className="summary__text">
            No hay información de resumen disponible en el JSON.
          </p>
        )}
      </div>
    </section>
  )
}

export default Resumen