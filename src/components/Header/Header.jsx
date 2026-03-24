import React from 'react'
import './Header.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'

const images = import.meta.glob('../../assets/*', {
  eager: true,
  import: 'default'
})

const resolvePhoto = (fileName) => {
  if (!fileName) return null

  const entry = Object.entries(images).find(([path]) =>
    path.endsWith(`/${fileName}`)
  )

  return entry ? entry[1] : null
}

const Header = ({ hero }) => {
  if (!hero) return null

  const photoSrc = resolvePhoto(hero.photo)

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__identity">
          <div className="header__photo-wrap">
            {photoSrc ? (
              <img
                src={photoSrc}
                alt={hero?.name || 'Foto'}
                className="header__photo"
              />
            ) : null}
          </div>

          <div className="header__intro">
            {hero?.eyebrow ? (
              <p className="header__eyebrow">{hero.eyebrow}</p>
            ) : null}

            <h1 className="header__name">
              {hero?.name || 'Nombre no definido'}
            </h1>

            {hero?.headline ? (
              <p className="header__headline">{hero.headline}</p>
            ) : null}

            <div className="header__contact">
              {hero?.email ? (
                <span className="header__contact-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  {hero.email}
                </span>
              ) : null}

              {hero?.phone ? (
                <span className="header__contact-item">
                  <FontAwesomeIcon icon={faPhone} />
                  {hero.phone}
                </span>
              ) : null}

              {hero?.location ? (
                <span className="header__contact-item">
                  <FontAwesomeIcon icon={faLocationDot} />
                  {hero.location}
                </span>
              ) : null}

              {hero?.website ? (
                <span className="header__contact-item">
                  <FontAwesomeIcon icon={faGlobe} />
                  {hero.website}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {Array.isArray(hero?.links) && hero.links.length > 0 ? (
          <div className="header__links">
            {hero.links.map((link, index) => (
              <a
                key={`${link.label}-${index}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="header__link"
              >
                <span className="header__link-label">{link.label}</span>
                <span className="header__link-value">{link.url}</span>
              </a>
            ))}
          </div>
        ) : null}

        {Array.isArray(hero?.metrics) && hero.metrics.length > 0 ? (
          <div className="header__metrics">
            {hero.metrics.map((metric, index) => (
              <div
                key={`${metric.label}-${index}`}
                className="header__metric"
              >
                <strong>{metric.label}</strong>
                <span>{metric.value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header