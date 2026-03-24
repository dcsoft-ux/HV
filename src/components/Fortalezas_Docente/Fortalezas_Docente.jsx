import React from 'react'
import './Fortalezas_Docente.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faDumbbell } from '@fortawesome/free-solid-svg-icons'

const Fortalezas_Docente = ({ Fortalezas_Docente }) => {
  const items = Fortalezas_Docente?.items || []

  return (
    <section className="strengths">
      <div className="strengths__title">
        <div className="strengths__title-icon">
          <FontAwesomeIcon icon={faWrench} />
        </div>
        <div className="strengths__title-text">
          <h2>{Fortalezas_Docente?.title}</h2>
          {Fortalezas_Docente?.subtitle ? <p>{Fortalezas_Docente.subtitle}</p> : null}
        </div>
      </div>

      <div className="strengths__list">
        {items.map((job, index) => (
          <article className="strengths__item" key={`${job.data}-${index}`}>
            <span className="strengths__item-icon">
              <FontAwesomeIcon icon={faDumbbell} />
            </span>
            <span className="strengths__item-text">{job.data}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Fortalezas_Docente