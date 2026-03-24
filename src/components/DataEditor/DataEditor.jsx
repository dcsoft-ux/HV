import React, { useEffect, useMemo, useState } from 'react'
import './DataEditor.sass'

const sectionMap = {
  experience: {
    title: 'Experiencias',
    path: ['experience', 'items'],
    empty: {
      company: '',
      role: '',
      duration: '',
      description: '',
      achievements: [],
      tags: []
    }
  },
  education: {
    title: 'Estudios',
    path: ['education', 'items'],
    empty: {
      institution: '',
      degree: '',
      year: '',
      thesis: ''
    }
  },
  strengths: {
    title: 'Fortalezas',
    path: ['Fortalezas_Docente', 'items'],
    empty: {
      data: ''
    }
  },
  skills: {
    title: 'Competencias',
    path: ['Competencias_Tecnicas', 'items'],
    empty: {
      label: '',
      data: ''
    }
  }
}

const clone = (value) => JSON.parse(JSON.stringify(value))

const normalizeDraft = (sectionKey, item) => {
  if (sectionKey === 'experience') {
    return {
      ...item,
      achievementsText: Array.isArray(item.achievements) ? item.achievements.join('\n') : '',
      tagsText: Array.isArray(item.tags) ? item.tags.join(', ') : ''
    }
  }
  return { ...item }
}

const denormalizeDraft = (sectionKey, draft) => {
  if (sectionKey === 'experience') {
    return {
      company: draft.company || '',
      role: draft.role || '',
      duration: draft.duration || '',
      description: draft.description || '',
      achievements: (draft.achievementsText || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      tags: (draft.tagsText || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }
  }

  if (sectionKey === 'education') {
    return {
      institution: draft.institution || '',
      degree: draft.degree || '',
      year: draft.year || '',
      thesis: draft.thesis || ''
    }
  }

  if (sectionKey === 'strengths') {
    return { data: draft.data || '' }
  }

  return {
    label: draft.label || '',
    data: draft.data || ''
  }
}

const getItems = (resumeData, sectionKey) => {
  const config = sectionMap[sectionKey]
  return resumeData?.[config.path[0]]?.[config.path[1]] || []
}

const DataEditor = ({ resumeData, onChange }) => {
  const [sectionKey, setSectionKey] = useState('experience')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [draft, setDraft] = useState(normalizeDraft('experience', sectionMap.experience.empty))

  const items = useMemo(() => getItems(resumeData, sectionKey), [resumeData, sectionKey])

  useEffect(() => {
    const current = items[selectedIndex]
    if (current) {
      setDraft(normalizeDraft(sectionKey, clone(current)))
    } else {
      setDraft(normalizeDraft(sectionKey, clone(sectionMap[sectionKey].empty)))
    }
  }, [items, selectedIndex, sectionKey])

  const handleSectionChange = (nextSection) => {
    setSectionKey(nextSection)
    setSelectedIndex(0)
  }

  const handleFieldChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const parsedDraft = denormalizeDraft(sectionKey, draft)

    onChange((prev) => {
      const next = clone(prev)
      const [root, listKey] = sectionMap[sectionKey].path
      const list = Array.isArray(next[root][listKey]) ? [...next[root][listKey]] : []

      if (items[selectedIndex]) {
        list[selectedIndex] = parsedDraft
      } else {
        list.push(parsedDraft)
        setSelectedIndex(list.length - 1)
      }

      next[root][listKey] = list
      return next
    })
  }

  const handleNew = () => {
    setSelectedIndex(items.length)
    setDraft(normalizeDraft(sectionKey, clone(sectionMap[sectionKey].empty)))
  }

  const handleDelete = () => {
    if (!items[selectedIndex]) return

    onChange((prev) => {
      const next = clone(prev)
      const [root, listKey] = sectionMap[sectionKey].path
      const list = [...next[root][listKey]]
      list.splice(selectedIndex, 1)
      next[root][listKey] = list
      return next
    })

    setSelectedIndex(0)
  }

  return (
    <div className="data-editor">
      <div className="data-editor__sections">
        {Object.entries(sectionMap).map(([key, config]) => (
          <button
            key={key}
            type="button"
            className={`data-editor__section ${sectionKey === key ? 'data-editor__section--active' : ''}`}
            onClick={() => handleSectionChange(key)}
          >
            {config.title}
          </button>
        ))}
      </div>

      <div className="data-editor__list">
        {items.map((item, index) => (
          <button
            key={`${sectionKey}-${index}`}
            type="button"
            className={`data-editor__list-item ${selectedIndex === index ? 'data-editor__list-item--active' : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            {sectionKey === 'experience' && (item.role || `Experiencia ${index + 1}`)}
            {sectionKey === 'education' && (item.degree || `Estudio ${index + 1}`)}
            {sectionKey === 'strengths' && (item.data || `Fortaleza ${index + 1}`)}
            {sectionKey === 'skills' && (item.label || `Competencia ${index + 1}`)}
          </button>
        ))}
      </div>

      <div className="data-editor__actions">
        <button type="button" onClick={handleNew}>Nuevo</button>
        <button type="button" onClick={handleSave}>Guardar</button>
        <button type="button" className="danger" onClick={handleDelete}>Eliminar</button>
      </div>

      <div className="data-editor__form">
        {sectionKey === 'experience' ? (
          <>
            <label>
              Cargo
              <input value={draft.role || ''} onChange={(e) => handleFieldChange('role', e.target.value)} />
            </label>
            <label>
              Empresa
              <input value={draft.company || ''} onChange={(e) => handleFieldChange('company', e.target.value)} />
            </label>
            <label>
              Duración
              <input value={draft.duration || ''} onChange={(e) => handleFieldChange('duration', e.target.value)} />
            </label>
            <label>
              Descripción
              <textarea rows="4" value={draft.description || ''} onChange={(e) => handleFieldChange('description', e.target.value)} />
            </label>
            <label>
              Logros (uno por línea)
              <textarea rows="5" value={draft.achievementsText || ''} onChange={(e) => handleFieldChange('achievementsText', e.target.value)} />
            </label>
            <label>
              Tags (separados por coma)
              <input value={draft.tagsText || ''} onChange={(e) => handleFieldChange('tagsText', e.target.value)} />
            </label>
          </>
        ) : null}

        {sectionKey === 'education' ? (
          <>
            <label>
              Título
              <input value={draft.degree || ''} onChange={(e) => handleFieldChange('degree', e.target.value)} />
            </label>
            <label>
              Institución
              <input value={draft.institution || ''} onChange={(e) => handleFieldChange('institution', e.target.value)} />
            </label>
            <label>
              Año
              <input value={draft.year || ''} onChange={(e) => handleFieldChange('year', e.target.value)} />
            </label>
            <label>
              Descripción / tesis
              <textarea rows="4" value={draft.thesis || ''} onChange={(e) => handleFieldChange('thesis', e.target.value)} />
            </label>
          </>
        ) : null}

        {sectionKey === 'strengths' ? (
          <label>
            Fortaleza
            <textarea rows="4" value={draft.data || ''} onChange={(e) => handleFieldChange('data', e.target.value)} />
          </label>
        ) : null}

        {sectionKey === 'skills' ? (
          <>
            <label>
              Categoría
              <input value={draft.label || ''} onChange={(e) => handleFieldChange('label', e.target.value)} />
            </label>
            <label>
              Contenido
              <textarea rows="4" value={draft.data || ''} onChange={(e) => handleFieldChange('data', e.target.value)} />
            </label>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default DataEditor