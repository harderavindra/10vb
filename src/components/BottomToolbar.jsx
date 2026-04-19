import { NavLink } from 'react-router-dom'
import { FiHome, FiImage, FiPlay, FiClipboard } from 'react-icons/fi'

const tabs = [
  { label: 'Intro', path: '/', icon: FiHome },
  { label: 'Gallery', path: '/gallery', icon: FiImage },
  { label: 'Games', path: '/games', icon: FiPlay },
  { label: 'Attendance', path: '/attendance', icon: FiClipboard },
]

function BottomToolbar() {
  return (
    <nav className="bottom-toolbar">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => `tab-btn${isActive ? ' active' : ''}`}
          >
            <Icon size={16} style={{ marginRight: 6 }} />
            {tab.label}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default BottomToolbar
