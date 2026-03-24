import React, { useEffect, useMemo, useState } from 'react'
import './DataEditor.sass'

const sectionMap = {
  hero: {
    title: 'Header',
    path: ['hero'],
    empty: {
      eyebrow: '',
      name: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      photo: '',
      links: [],
      metrics: []
    }
  },
  summary: {
    title: 'Resumen',
    path: ['summary'],
    empty: {
      title: '',
      subtitle: '',
      paragraphs: []
    }
  },
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
  if (sectionKey === 'hero') {
    return {
      ...item,
      linksText: Array.isArray(item.links)
        ? item.links.map((link) => `${link.label || ''}|${link.display || ''}|${link.url || ''}`).join('\n')
        : '',
      metricsText: Array.isArray(item.metrics)
        ? item.metrics.map((metric) => `${metric.label || ''}|${metric.value || ''}`).join('\n')
        : ''
    }
  }

  if (sectionKey === 'summary') {
    return {
      ...item,
      paragraphsText: Array.isArray(item.paragraphs) ? item.paragraphs.join('\n') : ''
    }
  }

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
  if (sectionKey === 'hero') {
    return {
      eyebrow: draft.eyebrow || '',
      name: draft.name || '',
      headline: draft.headline || '',
      email: draft.email || '',
      phone: draft.phone || '',
      location: draft.location || '',
      website: draft.website || '',
      photo: draft.photo || '',
      links: (draft.linksText || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [label = '', display = '', url = ''] = line.split('|')
          return {
            label: label.trim(),
            display: display.trim(),
            url: url.trim()
          }
        }),
      metrics: (draft.metricsText || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [label = '', value = ''] = line.split('|')
          return {
            label: label.trim(),
            value: value.trim()
          }
        })
    }
  }

  if (sectionKey === 'summary') {
    return {
      title: draft.title || '',
      subtitle: draft.subtitle || '',
      paragraphs: (draft.paragraphsText || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    }
  }

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

  if (config.path.length === 1) {
    return [resumeData?.[config.path[0]] || config.empty]
  }

  return resumeData?.[config.path[0]]?.[config.path[1]] || []
}

const DataEditor = ({ resumeData, onChange }) => {
  const [sectionKey, setSectionKey] = useState('hero')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [draft, setDraft] = useState(normalizeDraft('hero', sectionMap.hero.empty))

  const items = useMemo(() => getItems(resumeData, sectionKey), [resumeData, sectionKey])
  const isSingleSection = sectionKey === 'hero' || sectionKey === 'summary'

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
      const config = sectionMap[sectionKey]

      if (config.path.length === 1) {
        next[config.path[0]] = parsedDraft
        return next
      }

      const [root, listKey] = config.path
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
    if (isSingleSection) return
    setSelectedIndex(items.length)
    setDraft(normalizeDraft(sectionKey, clone(sectionMap[sectionKey].empty)))
  }

  const handleDelete = () => {
    if (isSingleSection || !items[selectedIndex]) return

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

      {!isSingleSection ? (
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
      ) : null}

      <div className="data-editor__actions">
        {!isSingleSection ? <button type="button" onClick={handleNew}>Nuevo</button> : null}
        <button type="button" onClick={handleSave}>Guardar</button>
        {!isSingleSection ? <button type="button" className="danger" onClick={handleDelete}>Eliminar</button> : null}
      </div>

      <div className="data-editor__form">
        {sectionKey === 'hero' ? (
          <>
            <label>
              Eyebrow
              <input value={draft.eyebrow || ''} onChange={(e) => handleFieldChange('eyebrow', e.target.value)} />
            </label>
            <label>
              Nombre
              <input value={draft.name || ''} onChange={(e) => handleFieldChange('name', e.target.value)} />
            </label>
            <label>
              Headline
              <textarea rows="4" value={draft.headline || ''} onChange={(e) => handleFieldChange('headline', e.target.value)} />
            </label>
            <label>
              Email
              <input value={draft.email || ''} onChange={(e) => handleFieldChange('email', e.target.value)} />
            </label>
            <label>
              Teléfono
              <input value={draft.phone || ''} onChange={(e) => handleFieldChange('phone', e.target.value)} />
            </label>
            <label>
              Ubicación
              <input value={draft.location || ''} onChange={(e) => handleFieldChange('location', e.target.value)} />
            </label>
            <label>
              Website
              <input value={draft.website || ''} onChange={(e) => handleFieldChange('website', e.target.value)} />
            </label>
            <label>
              Foto
              <input value={draft.photo || ''} onChange={(e) => handleFieldChange('photo', e.target.value)} />
            </label>
            <label>
              Links (uno por línea: label|display|url)
              <textarea rows="6" value={draft.linksText || ''} onChange={(e) => handleFieldChange('linksText', e.target.value)} />
            </label>
            <label>
              Métricas (una por línea: label|value)
              <textarea rows="4" value={draft.metricsText || ''} onChange={(e) => handleFieldChange('metricsText', e.target.value)} />
            </label>
          </>
        ) : null}

        {sectionKey === 'summary' ? (
          <>
            <label>
              Título
              <input value={draft.title || ''} onChange={(e) => handleFieldChange('title', e.target.value)} />
            </label>
            <label>
              Subtítulo
              <input value={draft.subtitle || ''} onChange={(e) => handleFieldChange('subtitle', e.target.value)} />
            </label>
            <label>
              Párrafos (uno por línea)
              <textarea rows="8" value={draft.paragraphsText || ''} onChange={(e) => handleFieldChange('paragraphsText', e.target.value)} />
            </label>
          </>
        ) : null}

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