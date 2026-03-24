import React from 'react'
import './JsonManager.sass'

const JsonManager = ({
  sourceName,
  availableJsonFiles = [],
  onSelectExisting,
  onImport,
  onReset,
  onDownload
}) => {
  return (
    <div className="json-manager">
      <div className="json-manager__header">
        <h3>JSON activo</h3>
        <p>{sourceName}</p>
      </div>

      <div className="json-manager__section">
        <h4>Escoger un JSON existente</h4>
        <div className="json-manager__existing-list">
          {availableJsonFiles.length > 0 ? (
            availableJsonFiles.map((fileName) => (
              <button
                key={fileName}
                type="button"
                className={`json-manager__existing-item ${
                  sourceName === fileName ? 'json-manager__existing-item--active' : ''
                }`}
                onClick={() => onSelectExisting(fileName)}
              >
                {fileName}
              </button>
            ))
          ) : (
            <p className="json-manager__empty">No hay archivos listados.</p>
          )}
        </div>
      </div>

      <div className="json-manager__section">
        <h4>Subir un JSON manualmente</h4>
        <label className="json-manager__upload">
          <span>Seleccionar JSON</span>
          <input
            type="file"
            accept="application/json,.json"
            onChange={(e) => onImport(e.target.files?.[0])}
          />
        </label>
      </div>

      <div className="json-manager__actions">
        <button type="button" onClick={onDownload}>
          Descargar JSON actual
        </button>
        <button type="button" onClick={onReset}>
          Usar JSON original
        </button>
      </div>

      <div className="json-manager__help">
        <p>
          Puedes escoger un JSON existente en la carpeta <strong>public</strong> o subir uno manualmente.
        </p>
      </div>
    </div>
  )
}

export default JsonManager