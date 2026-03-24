import React from 'react'
import './Education.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSchoolFlag,
  faGraduationCap,
  faFile,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons'

const Education = ({ education }) => {
  const items = Array.isArray(education?.items) ? education.items : []

  return (
    <section className="education">
      <div className="education__title">
        <div className="education__title-icon">
          <FontAwesomeIcon icon={faSchoolFlag} />
        </div>

        <div className="education__title-text">
          <h2>{education?.title || 'Educación'}</h2>
          {education?.subtitle ? <p>{education.subtitle}</p> : null}
        </div>
      </div>

      <div className="education__list">
        {items.length > 0 ? (
          items.map((edu, index) => (
            <article
              className="education__card"
              key={`${edu.degree || 'titulo'}-${edu.institution || 'institucion'}-${index}`}
            >
              <div className="education__head">
                <div className="education__degree">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <h3>{edu.degree || 'Título no definido'}</h3>
                </div>

                {edu.year ? <span className="education__year">{edu.year}</span> : null}
              </div>

              {edu.institution ? (
                <p className="education__institution">
                  <FontAwesomeIcon icon={faBuildingColumns} />
                  <span>{edu.institution}</span>
                </p>
              ) : null}

              {edu.thesis ? (
                <p className="education__thesis">
                  <FontAwesomeIcon icon={faFile} />
                  <span>{edu.thesis}</span>
                </p>
              ) : null}
            </article>
          ))
        ) : (
          <article className="education__card">
            <p className="education__empty">No hay estudios registrados en el JSON.</p>
          </article>
        )}
      </div>
    </section>
  )
}

export default Education