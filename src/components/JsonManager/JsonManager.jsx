import React from 'react'
import './JsonManager.sass'

const JsonManager = ({ sourceName, onImport, onReset, onDownload }) => {
  return (
    <div className="json-manager">
      <div className="json-manager__header">
        <h3>JSON activo</h3>
        <p>{sourceName}</p>
      </div>

      <label className="json-manager__upload">
        <span>Seleccionar JSON</span>
        <input
          type="file"
          accept="application/json,.json"
          onChange={(e) => onImport(e.target.files?.[0])}
        />
      </label>

      <div className="json-manager__actions">
        <button type="button" onClick={onDownload}>Descargar JSON actual</button>
        <button type="button" onClick={onReset}>Usar JSON original</button>
      </div>

      <div className="json-manager__help">
        <p>
          Puedes cargar cualquier archivo JSON compatible con la estructura de tu hoja de vida.
        </p>
      </div>
    </div>
  )
}

export default JsonManager