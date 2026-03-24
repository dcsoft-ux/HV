import React from 'react'
import './ThemeEditor.sass'

const fields = [
  { key: 'primary', label: 'Color principal' },
  { key: 'primarySoft', label: 'Color principal suave' },
  { key: 'surface', label: 'Tarjetas' },
  { key: 'surfaceAlt', label: 'Superficie alterna' },
  { key: 'background', label: 'Fondo general' },
  { key: 'text', label: 'Texto principal' },
  { key: 'muted', label: 'Texto secundario' },
  { key: 'border', label: 'Bordes' }
]

const ThemeEditor = ({ theme, onChange, onReset }) => {
  const updateField = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="theme-editor">
      <div className="theme-editor__header">
        <h3>Personalizar colores</h3>
        <button type="button" onClick={onReset}>Restablecer</button>
      </div>

      <div className="theme-editor__grid">
        {fields.map((field) => (
          <label key={field.key} className="theme-editor__field">
            <span>{field.label}</span>
            <div className="theme-editor__control">
              <input
                type="color"
                value={theme[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
              <input
                type="text"
                value={theme[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default ThemeEditor