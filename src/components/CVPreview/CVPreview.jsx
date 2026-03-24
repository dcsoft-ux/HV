import React from 'react'
import Header from '../Header/Header'
import Resumen from '../Resumen/Resumen'
import Experience from '../Experience/Experience'
import Education from '../Education/Education'
import CompetenciasTecnicas from '../Competencias_Tecnicas/Competencias_Tecnicas'
import FortalezasDocente from '../Fortalezas_Docente/Fortalezas_Docente'

const CVPreview = ({ resumeData }) => {
  const {
    hero,
    summary,
    experience,
    education,
    Competencias_Tecnicas,
    Fortalezas_Docente
  } = resumeData

  return (
    <div className="cv-preview">
      <Header hero={hero} />

      <div className="app__grid">
        <section className="app__main">
          <Resumen resumen={summary} />
          <Experience experience={experience} />
          <Education education={education} />
        </section>

        <aside className="app__side">
          <CompetenciasTecnicas Competencias_Tecnicas={Competencias_Tecnicas} />
          <FortalezasDocente Fortalezas_Docente={Fortalezas_Docente} />
        </aside>
      </div>
    </div>
  )
}

export default CVPreview