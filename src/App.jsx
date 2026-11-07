import { useRef, useState } from 'react'
import HeartsCanvas from './components/HeartsCanvas'
import FlowerGarden from './components/FlowerGarden'
import LoveLetterModal from './components/LoveLetterModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const canvasRef = useRef(null)

  function spawnBurst(x, y, count) {
    canvasRef.current?.spawnBurst(x, y, count)
  }

  function openModal() {
    setModalOpen(true)
    spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 25)
  }

  return (
    <>
      <HeartsCanvas ref={canvasRef} />
      <div className="romantic-overlay" />

      <header className="romantic-header">
        <h1 className="romantic-title">Feliz aniversario</h1>
        <p className="romantic-subtitle">El jardín que nos perdimos</p>
      </header>

      <div className="control-bar">
        <button className="glass-btn" title="Read Love Letter" onClick={openModal}>
          <span className="btn-icon">💌</span>
          <span className="btn-text">Léelo, bobita.</span>
        </button>
      </div>

      <FlowerGarden />

      <LoveLetterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
