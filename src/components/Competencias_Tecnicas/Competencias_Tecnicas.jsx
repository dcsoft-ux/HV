import React from 'react'
import './Competencias_Tecnicas.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faKey } from '@fortawesome/free-solid-svg-icons'

const Competencias_Tecnicas = ({ Competencias_Tecnicas }) => {
  const items = Competencias_Tecnicas?.items || []

  return (
    <section className="skills">
      <div className="skills__title">
        <div className="skills__title-icon">
          <FontAwesomeIcon icon={faGears} />
        </div>
        <div className="skills__title-text">
          <h2>{Competencias_Tecnicas?.title}</h2>
          {Competencias_Tecnicas?.subtitle ? <p>{Competencias_Tecnicas.subtitle}</p> : null}
        </div>
      </div>

      <div className="skills__list">
        {items.map((job, index) => (
          <article className="skills__card" key={`${job.label}-${index}`}>
            <div className="skills__card-icon">
              <FontAwesomeIcon icon={faKey} />
            </div>
            <div className="skills__card-content">
              <h3>{job.label}</h3>
              <p>{job.data}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Competencias_Tecnicas