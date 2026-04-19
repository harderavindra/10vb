import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IntroPage from './pages/IntroPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import GamesPage from './pages/GamesPage.jsx'
import GamePage from './pages/GamePage.jsx'
import AttendancePage from './pages/AttendancePage.jsx'
import BottomToolbar from './components/BottomToolbar.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell" style={{ height: '100%' }}>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomToolbar />
      </div>
    </BrowserRouter>
  )
}

export default App
