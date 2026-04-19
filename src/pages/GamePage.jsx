import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function GamePage() {
  const navigate = useNavigate()
  const [tiles, setTiles] = useState([])
  const [emptyIndex, setEmptyIndex] = useState(15)
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [hintActive, setHintActive] = useState(false)
  const [bestMoves, setBestMoves] = useState(localStorage.getItem('15puzzle-best') || null)
  const [initialState, setInitialState] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showWinModal, setShowWinModal] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    initGame()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const initGame = () => {
    const newTiles = Array.from({ length: 16 }, (_, i) => i)
    setTiles(newTiles)
    setEmptyIndex(15)
    setMoves(0)
    setStartTime(null)
    setElapsedTime(0)
    setHintActive(false)
    setIsAnimating(false)
    setShowWinModal(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const shuffleSolvable = () => {
    const arr = Array.from({ length: 15 }, (_, i) => i + 1)

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    arr.push(0)

    if (!isSolvable(arr)) {
      if (arr[0] !== 0 && arr[1] !== 0) {
        ;[arr[0], arr[1]] = [arr[1], arr[0]]
      } else {
        ;[arr[2], arr[3]] = [arr[3], arr[2]]
      }
    }

    return arr
  }

  const isSolvable = (arr) => {
    let inversions = 0
    const flatArr = arr.filter((x) => x !== 0)

    for (let i = 0; i < flatArr.length; i++) {
      for (let j = i + 1; j < flatArr.length; j++) {
        if (flatArr[i] > flatArr[j]) {
          inversions++
        }
      }
    }

    const emptyRowFromBottom = 4 - Math.floor(arr.indexOf(0) / 4)

    if (emptyRowFromBottom % 2 === 0) {
      return inversions % 2 === 1
    } else {
      return inversions % 2 === 0
    }
  }

  const canMoveToEmpty = (index) => {
    const row = Math.floor(index / 4)
    const col = index % 4
    const emptyRow = Math.floor(emptyIndex / 4)
    const emptyCol = emptyIndex % 4

    return row === emptyRow || col === emptyCol
  }

  const getTilesToMove = (clickedIndex) => {
    const row = Math.floor(clickedIndex / 4)
    const col = clickedIndex % 4
    const emptyRow = Math.floor(emptyIndex / 4)
    const emptyCol = emptyIndex % 4

    const tilesToMove = []

    if (row === emptyRow) {
      const start = Math.min(col, emptyCol)
      const end = Math.max(col, emptyCol)
      for (let c = start; c <= end; c++) {
        const idx = row * 4 + c
        if (idx !== emptyIndex) {
          tilesToMove.push(idx)
        }
      }
    } else if (col === emptyCol) {
      const start = Math.min(row, emptyRow)
      const end = Math.max(row, emptyRow)
      for (let r = start; r <= end; r++) {
        const idx = r * 4 + col
        if (idx !== emptyIndex) {
          tilesToMove.push(idx)
        }
      }
    }

    return tilesToMove
  }

  const handleTileClick = (clickedIndex) => {
    if (isAnimating || tiles[clickedIndex] === 0) return

    const tilesToMove = getTilesToMove(clickedIndex)

    if (tilesToMove.length === 0) {
      // Invalid move - could add shake animation here
      return
    }

    if (!startTime) {
      const now = Date.now()
      setStartTime(now)
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - now) / 1000))
      }, 1000)
    }

    moveMultipleTiles(tilesToMove)
  }

  const moveMultipleTiles = (tilesToMove) => {
    if (tilesToMove.length === 0) return

    setIsAnimating(true)

    const firstTileIndex = tilesToMove[0]
    const row = Math.floor(firstTileIndex / 4)
    const col = firstTileIndex % 4
    const emptyRow = Math.floor(emptyIndex / 4)
    const emptyCol = emptyIndex % 4

    const isHorizontal = row === emptyRow
    const moveDirection = isHorizontal
      ? emptyCol > col
        ? 1
        : -1
      : emptyRow > row
      ? 1
      : -1

    const newTiles = [...tiles]

    if (isHorizontal) {
      if (moveDirection > 0) {
        for (let i = tilesToMove.length - 1; i >= 0; i--) {
          const currentIdx = tilesToMove[i]
          const nextIdx = currentIdx + 1
          newTiles[nextIdx] = tiles[currentIdx]
        }
        newTiles[tilesToMove[0]] = 0
        setEmptyIndex(tilesToMove[0])
      } else {
        for (let i = 0; i < tilesToMove.length; i++) {
          const currentIdx = tilesToMove[i]
          const prevIdx = currentIdx - 1
          newTiles[prevIdx] = tiles[currentIdx]
        }
        newTiles[tilesToMove[tilesToMove.length - 1]] = 0
        setEmptyIndex(tilesToMove[tilesToMove.length - 1])
      }
    } else {
      if (moveDirection > 0) {
        for (let i = tilesToMove.length - 1; i >= 0; i--) {
          const currentIdx = tilesToMove[i]
          const nextIdx = currentIdx + 4
          newTiles[nextIdx] = tiles[currentIdx]
        }
        newTiles[tilesToMove[0]] = 0
        setEmptyIndex(tilesToMove[0])
      } else {
        for (let i = 0; i < tilesToMove.length; i++) {
          const currentIdx = tilesToMove[i]
          const prevIdx = currentIdx - 4
          newTiles[prevIdx] = tiles[currentIdx]
        }
        newTiles[tilesToMove[tilesToMove.length - 1]] = 0
        setEmptyIndex(tilesToMove[tilesToMove.length - 1])
      }
    }

    setTiles(newTiles)
    setMoves((prev) => prev + 1)

    setTimeout(() => {
      setIsAnimating(false)
      if (checkWin(newTiles)) {
        setTimeout(() => setShowWinModal(true), 300)
      }
    }, 300)
  }

  const checkWin = (tilesArray) => {
    for (let i = 0; i < 15; i++) {
      if (tilesArray[i] !== i + 1) return false
    }
    return tilesArray[15] === 0
  }

  const newGame = () => {
    initGame()
    const shuffled = shuffleSolvable()
    setTiles(shuffled)
    setEmptyIndex(shuffled.indexOf(0))
    setInitialState([...shuffled])
  }

  const reset = () => {
    if (initialState.length === 0) {
      newGame()
      return
    }

    setTiles([...initialState])
    setEmptyIndex(initialState.indexOf(0))
    setMoves(0)
    setStartTime(null)
    setElapsedTime(0)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const toggleHint = () => {
    setHintActive((prev) => !prev)
  }

  const closeWinModal = () => {
    setShowWinModal(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (!bestMoves || moves < parseInt(bestMoves)) {
      const newBest = moves.toString()
      setBestMoves(newBest)
      localStorage.setItem('15puzzle-best', newBest)
    }

    newGame()
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="game-wrapper">
      <div className="game-header">
        <h1 className="game-title">15 Puzzle Game</h1>
        <p className="game-subtitle">Arrange the tiles in order</p>
      </div>

      <div className="controls"  >
        <button className="btn btn-primary" onClick={newGame}>
          New Game
        </button>
        <button className="btn" onClick={toggleHint}>
          Hint
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
        <button className="btn btn-back" onClick={() => navigate('/')}>
          ← Back
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Moves</div>
          <div className="stat-value">{moves}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Time</div>
          <div className="stat-value">{formatTime(elapsedTime)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Best</div>
          <div className="stat-value">{bestMoves || '--'}</div>
        </div>
      </div>

      <div className="game-board-container">
        <div className="game-board">
          {tiles.map((num, index) => (
            <div
              key={index}
              className={`tile${num === 0 ? ' empty' : ''}${
                canMoveToEmpty(index) && num !== 0 ? ' moveable' : ''
              }${hintActive && canMoveToEmpty(index) && num !== 0 ? ' hint-active' : ''}`}
              onClick={() => handleTileClick(index)}
            >
              {num !== 0 && num}
            </div>
          ))}
        </div>
      </div>

      {hintActive && (
        <p className="hint-info">
          💡 Blue highlights show tiles you can move
        </p>
      )}

      <p className="hint-info" style={{ marginTop: '0.5rem', fontStyle: 'normal' }}>
        ✨ Click any tile in the same row or column as the empty space to slide multiple tiles at once
      </p>

      {showWinModal && (
        <div className="win-overlay show">
          <div className="win-modal">
            <div className="win-icon">🎉</div>
            <h2 className="win-title">Congratulations!</h2>
            <p className="win-stats">
              Solved in {moves} moves and {formatTime(elapsedTime)}!
            </p>
            <button className="btn btn-primary" onClick={closeWinModal}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePage