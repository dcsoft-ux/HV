import React from 'react'
import './Experience.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faBuilding,
  faCalendarDays,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons'

const Experience = ({ experience }) => {
  const items = Array.isArray(experience?.items) ? experience.items : []

  return (
    <section className="experience">
      <div className="experience__title">
        <div className="experience__title-icon">
          <FontAwesomeIcon icon={faBriefcase} />
        </div>
        <div className="experience__title-text">
          <h2>{experience?.title || 'Experiencia profesional'}</h2>
          {experience?.subtitle ? <p>{experience.subtitle}</p> : null}
        </div>
      </div>

      <div className="experience__list">
        {items.length === 0 ? (
          <article className="experience__card">
            <p className="experience__description">
              No hay experiencias profesionales registradas en el JSON.
            </p>
          </article>
        ) : (
          items.map((job, index) => (
            <article
              className="experience__card"
              key={`${job.role || 'cargo'}-${job.company || 'empresa'}-${index}`}
            >
              <div className="experience__top">
                <div>
                  <h3>{job.role || 'Cargo no definido'}</h3>

                  <div className="experience__meta">
                    {job.company ? (
                      <span>
                        <FontAwesomeIcon icon={faBuilding} /> {job.company}
                      </span>
                    ) : null}

                    {job.duration ? (
                      <span>
                        <FontAwesomeIcon icon={faCalendarDays} /> {job.duration}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {job.description ? (
                <p className="experience__description">{job.description}</p>
              ) : null}

              {Array.isArray(job.achievements) && job.achievements.length > 0 ? (
                <ul className="experience__achievements">
                  {job.achievements.map((achievement, achievementIndex) => (
                    <li key={`${achievement}-${achievementIndex}`}>
                      <FontAwesomeIcon icon={faLightbulb} />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {Array.isArray(job.tags) && job.tags.length > 0 ? (
                <div className="experience__tags">
                  {job.tags.map((tag, tagIndex) => (
                    <span className="experience__tag" key={`${tag}-${tagIndex}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Experience