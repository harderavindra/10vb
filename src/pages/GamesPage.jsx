import SectionHeader from '../components/SectionHeader.jsx'
import { useNavigate } from 'react-router-dom'

function GamesPage() {
  const navigate = useNavigate()

  return (
    <main className="games-page page-content">
      <SectionHeader title="Games" subtitle="Choose a game and relive the fun." />
      <div className="game-list-card">
        <h3>90's Game</h3>
        <p>Play the 15 puzzle game with a nostalgic twist.</p>
        <button className="btn btn-primary" type="button" onClick={() => navigate('/game')}>
          Play 90's Game
        </button>
      </div>
    </main>
  )
}

export default GamesPage
