import { useAudioSynth } from '../hooks/useAudioSynth'

export default function MusicButton() {
  const { isPlaying, toggle } = useAudioSynth()
  return (
    <button
      className="glass-btn music-btn-bottom-right"
      title="Toggle Romantic Music"
      onClick={toggle}
    >
      <span className="btn-icon">{isPlaying ? '🎶' : '🎵'}</span>
      <span className="btn-text">{isPlaying ? 'Mute Music' : 'Play Music'}</span>
    </button>
  )
}
