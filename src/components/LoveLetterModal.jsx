import { useEffect, useRef } from 'react'

const message = `Bueno, no sé cómo hacer esto, jeje. Entonces, te amo, y lo que quería representar fue el jardín que nos perdimos. Pero te quería agradecer por enseñarme a amar, porque eres muy dulce conmigo, porque siento mucho tu amor hacia mí. Y siempre critiqué lo cursi, lo curioso, pero contigo me dan ganas de demostrar cosas.

Te amo. Gracias por venir todo este mes, gracias por demostrarme el amor, por esas cosas de cumpleaños. Sé que no soy tan bueno en estas cosas, pero  tenía el tiempo y quise hacer esto para ti porque te amo.`

export default function LoveLetterModal({ isOpen, onClose }) {
  const indexRef = useRef(0)
  const timerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      clearTimeout(timerRef.current)
      return
    }
    if (textRef.current) textRef.current.textContent = ''
    indexRef.current = 0

    function typeWriter() {
      if (indexRef.current < message.length) {
        textRef.current.textContent += message.charAt(indexRef.current)
        indexRef.current++
        timerRef.current = setTimeout(typeWriter, 40)
      }
    }
    typeWriter()
    return () => clearTimeout(timerRef.current)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="glass-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Para mi princesa, mi amorcito</h2>
        <p ref={textRef} className="modal-text" />
      </div>
    </div>
  )
}
