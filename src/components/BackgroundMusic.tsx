import { useEffect, useRef, useState } from 'react'
import type { Screen } from '../game/types'
import type { NodeKind } from '../game/data'
import { readSoundVolume, setSoundVolume } from '../game/audio'
import mikamiTheme from "../music/01 Mikami's Theme.mp3"
import buildingLot from '../music/16 Funky Building Lot.mp3'
import broomFlight from '../music/14 Broom Flight at the Sunset.mp3'
import archFiend from '../music/19 Arch Fiend.mp3'
import dirtySewers from '../music/11 Such Dirty Sewers.mp3'

const tracks = {
  start: { src: mikamiTheme, name: "Mikami's Theme", loop: true },
  map: { src: broomFlight, name: 'Broom Flight at the Sunset', loop: true },
  battle: { src: archFiend, name: 'Arch Fiend', loop: true },
  event: { src: buildingLot, name: 'Funky Building Lot', loop: true },
  reward: { src: mikamiTheme, name: "Mikami's Theme", loop: true },
  victory: { src: broomFlight, name: 'Broom Flight at the Sunset', loop: false },
  defeat: { src: archFiend, name: 'Arch Fiend', loop: false },
} satisfies Record<Screen, { src: string; name: string; loop: boolean }>

function savedVolume() {
  try {
    const stored = localStorage.getItem('gsmikami-music-volume')
    const value = stored === null ? 30 : Number(stored)
    return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 30
  } catch {
    return 30
  }
}

export function BackgroundMusic({ screen, battleKind }: { screen: Screen; battleKind?: NodeKind }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(savedVolume)
  const [sfxVolume, setSfxVolume] = useState(readSoundVolume)
  const [enabled, setEnabled] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const track = screen === 'battle' && battleKind === 'battle'
    ? { src: dirtySewers, name: 'Such Dirty Sewers', loop: true }
    : tracks[screen]

  useEffect(() => {
    // Endings get a fresh, single full rendition, even if the battle used the same file.
    if ((screen === 'victory' || screen === 'defeat') && audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }, [screen])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
    try { localStorage.setItem('gsmikami-music-volume', String(volume)) } catch { /* Storage may be disabled. */ }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (enabled) void audio.play().catch(() => { /* The first user gesture unlocks playback. */ })
    else audio.pause()
  }, [track.src, track.loop, enabled])

  useEffect(() => {
    if (!enabled) return
    // Start directly inside a gesture, including browsers that restrict autoplay.
    function start(event: Event) {
      // Let the playback button handle its own gesture without toggling twice.
      if (event.target instanceof Element && event.target.closest('.music-controls button')) return
      void audioRef.current?.play().catch(() => {})
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
    window.addEventListener('pointerdown', start)
    window.addEventListener('keydown', start)
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
  }, [enabled])

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setEnabled(false)
    } else {
      setEnabled(true)
      void audio.play().catch(() => {})
    }
  }

  return (
    <aside className="music-controls" aria-label="Background music">
      <audio
        ref={audioRef}
        src={track.src}
        loop={track.loop}
        preload="none"
        onPlay={() => { setPlaying(true); setFailed(false) }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false) }}
      />
      <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause music' : 'Play music'} aria-pressed={playing}>
        {playing ? 'Ⅱ' : '▶'}
      </button>
      <div className="audio-setting">
      <label htmlFor="music-volume">MUSIC</label>
      <input id="music-volume" type="range" min="0" max="100" step="1" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-valuetext={`${volume}%`} />
      <output htmlFor="music-volume">{volume}%</output>
      </div>
      <div className="audio-setting">
      <label htmlFor="sfx-volume">SFX</label>
      <input id="sfx-volume" type="range" min="0" max="100" step="1" value={sfxVolume} onChange={(event) => {
        const value = Number(event.target.value)
        setSfxVolume(value)
        setSoundVolume(value)
      }} aria-valuetext={`${sfxVolume}%`} aria-label="Sound effects volume" />
      <output htmlFor="sfx-volume">{sfxVolume}%</output>
      </div>
      <span className="music-track" title={track.name}>{failed ? 'Music unavailable' : track.name}</span>
    </aside>
  )
}
