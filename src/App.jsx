import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Resumen from './components/Resumen/Resumen';
import Competencias_Tecnicas from './components/Competencias_Tecnicas/Competencias_Tecnicas';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    fetch('/resumeData.json')
      .then(res => res.json())
      .then(data => setResumeData(data));
  }, []);

  if (!resumeData) return <div>Cargando...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Header name={resumeData.name} title={resumeData.title} contact={resumeData.contact} />
      <Resumen resumen={resumeData.contact}/>
      <Education education={resumeData.education} />
      <Experience experience={resumeData.experience} />
      <Competencias_Tecnicas Competencias_Tecnicas={resumeData.Competencias_Tecnicas}/>
    </div>
  );
}

export default App
