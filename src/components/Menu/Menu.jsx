import React from 'react'
import './Menu.sass'

const tabs = [
  { key: 'vista', label: 'Vista previa' },
  { key: 'datos', label: 'Editar datos' },
  { key: 'tema', label: 'Colores' },
  { key: 'json', label: 'JSON' }
]

const Menu = ({ activeTab, onChange }) => {
  return (
    <nav className="menu">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`menu__item ${activeTab === tab.key ? 'menu__item--active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export default Menu