import { useRef, useState } from 'react'

const chordProgressions = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 261.63, 329.63, 440.00], // Fmaj7
  [196.00, 293.66, 349.23, 440.00], // G7sus4
]

export function useAudioSynth() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const intervalRef = useRef(null)
  const chordIndexRef = useRef(0)
  const isPlayingRef = useRef(false)

  function playChord(notes) {
    const ctx = audioCtxRef.current
    if (!ctx) return
    notes.forEach((freq, index) => {
      setTimeout(() => {
        if (!isPlayingRef.current) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = index % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        const now = ctx.currentTime
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.08, now + 0.8)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 4.6)
      }, index * 250)
    })
  }

  function toggle() {
    if (!isPlayingRef.current) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      isPlayingRef.current = true
      setIsPlaying(true)
      chordIndexRef.current = 0
      playChord(chordProgressions[0])
      intervalRef.current = setInterval(() => {
        chordIndexRef.current = (chordIndexRef.current + 1) % chordProgressions.length
        playChord(chordProgressions[chordIndexRef.current])
      }, 4000)
    } else {
      isPlayingRef.current = false
      setIsPlaying(false)
      clearInterval(intervalRef.current)
    }
  }

  return { isPlaying, toggle }
}
