import React, { useEffect, useMemo, useState } from 'react'
import './App.sass'

import Menu from './components/Menu/Menu'
import CVPreview from './components/CVPreview/CVPreview'
import DataEditor from './components/DataEditor/DataEditor'
import ThemeEditor from './components/ThemeEditor/ThemeEditor'
import JsonManager from './components/JsonManager/JsonManager'

const STORAGE_KEYS = {
  resume: 'hv_resume_data',
  theme: 'hv_theme_data',
  source: 'hv_resume_source'
}

const defaultTheme = {
  primary: '#2563eb',
  primarySoft: '#eff6ff',
  surface: '#ffffff',
  surfaceAlt: '#f8fafc',
  background: '#f5f7fb',
  text: '#0f172a',
  muted: '#64748b',
  border: '#dbe4f0'
}

const App = () => {
  const [resumeData, setResumeData] = useState(null)
  const [activeTab, setActiveTab] = useState('vista')
  const [error, setError] = useState('')
  const [sourceName, setSourceName] = useState('resumeData.json')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme)
    return saved ? JSON.parse(saved) : defaultTheme
  })

  useEffect(() => {
    const savedResume = localStorage.getItem(STORAGE_KEYS.resume)
    const savedSource = localStorage.getItem(STORAGE_KEYS.source)

    if (savedResume) {
      setResumeData(JSON.parse(savedResume))
      if (savedSource) setSourceName(savedSource)
      return
    }

    fetch('/resumeData.json')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar resumeData.json')
        return res.json()
      })
      .then((data) => setResumeData(data))
      .catch(() => setError('No fue posible cargar el JSON inicial.'))
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-primary-soft', theme.primarySoft)
    root.style.setProperty('--color-surface', theme.surface)
    root.style.setProperty('--color-surface-alt', theme.surfaceAlt)
    root.style.setProperty('--color-background', theme.background)
    root.style.setProperty('--color-text', theme.text)
    root.style.setProperty('--color-muted', theme.muted)
    root.style.setProperty('--color-border', theme.border)
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme))
  }, [theme])

  const persistResume = (data, source = sourceName) => {
    setResumeData(data)
    setSourceName(source)
    localStorage.setItem(STORAGE_KEYS.resume, JSON.stringify(data))
    localStorage.setItem(STORAGE_KEYS.source, source)
  }

  const handleImportJson = (file) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        persistResume(parsed, file.name)
        setActiveTab('vista')
        setError('')
      } catch {
        setError('El archivo seleccionado no es un JSON válido.')
      }
    }
    reader.readAsText(file)
  }

  const handleResetJson = async () => {
    try {
      const res = await fetch('/resumeData.json')
      if (!res.ok) throw new Error()
      const data = await res.json()
      persistResume(data, 'resumeData.json')
      setError('')
    } catch {
      setError('No se pudo restaurar el JSON original.')
    }
  }

  const handleDownloadJson = () => {
    if (!resumeData) return
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = sourceName || 'resumeData.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handlePrintPdf = () => {
    window.print()
  }

  const updateResumeData = (updater) => {
    const nextData =
      typeof updater === 'function' ? updater(structuredClone(resumeData)) : updater
    persistResume(nextData)
  }

  const stats = useMemo(() => {
    if (!resumeData) return null
    return {
      experiences: resumeData?.experience?.items?.length || 0,
      education: resumeData?.education?.items?.length || 0,
      strengths: resumeData?.Fortalezas_Docente?.items?.length || 0,
      skills: resumeData?.Competencias_Tecnicas?.items?.length || 0
    }
  }, [resumeData])

  if (error && !resumeData) {
    return (
      <main className="app app--centered">
        <div className="app__state">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </main>
    )
  }

  if (!resumeData) {
    return (
      <main className="app app--centered">
        <div className="app__state">
          <p>Cargando hoja de vida...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="app">
      <div className="app__shell">
        <aside className="app__sidebar no-print">
          <div className="app__brand">
            <h1>Panel HV</h1>
            <p>Vista, edición, tema y JSON</p>
          </div>

          <Menu activeTab={activeTab} onChange={setActiveTab} />

          {stats ? (
            <div className="app__stats">
              <div className="app__stat">
                <strong>{stats.experiences}</strong>
                <span>Experiencias</span>
              </div>
              <div className="app__stat">
                <strong>{stats.education}</strong>
                <span>Estudios</span>
              </div>
              <div className="app__stat">
                <strong>{stats.strengths}</strong>
                <span>Fortalezas</span>
              </div>
              <div className="app__stat">
                <strong>{stats.skills}</strong>
                <span>Competencias</span>
              </div>
            </div>
          ) : null}

          <div className="app__panel">
            {activeTab === 'vista' ? (
              <div className="app__info">
                <h3>Vista previa</h3>
                <p>
                  Aquí puedes revisar la hoja de vida antes de imprimir o exportar.
                </p>
              </div>
            ) : null}

            {activeTab === 'datos' ? (
              <DataEditor resumeData={resumeData} onChange={updateResumeData} />
            ) : null}

            {activeTab === 'tema' ? (
              <ThemeEditor theme={theme} onChange={setTheme} onReset={() => setTheme(defaultTheme)} />
            ) : null}

            {activeTab === 'json' ? (
              <JsonManager
                sourceName={sourceName}
                onImport={handleImportJson}
                onReset={handleResetJson}
                onDownload={handleDownloadJson}
              />
            ) : null}
          </div>
        </aside>

        <section className="app__content">
          <div className="app__toolbar no-print">
            <div>
              <h2>Hoja de vida</h2>
              <p>Fuente actual: {sourceName}</p>
            </div>

            <div className="app__toolbar-actions">
              <button type="button" className="app__action app__action--secondary" onClick={() => setActiveTab('datos')}>
                Editar datos
              </button>
              <button type="button" className="app__action" onClick={handlePrintPdf}>
                Exportar PDF
              </button>
            </div>
          </div>

          {error ? <div className="app__error no-print">{error}</div> : null}

          <CVPreview resumeData={resumeData} />
        </section>
      </div>
    </main>
  )
}

export default App