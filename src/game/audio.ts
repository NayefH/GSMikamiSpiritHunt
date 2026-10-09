import punch from '../sfx/mixkit-hard-and-quick-punch-2143.wav'
import impact from '../sfx/mixkit-impact-of-a-blow-2150.wav'
import magic from '../sfx/mixkit-magic-sparkle-2350.wav'
import success from '../sfx/mixkit-fantasy-success-270.wav'
import defeat from '../sfx/mixkit-game-over-213.wav'
import click from '../sfx/kenney-click.ogg'
import confirm from '../sfx/kenney-confirm.ogg'
import open from '../sfx/kenney-open.ogg'

const sources = { punch, impact, magic, success, defeat, click, confirm, open }
export type SoundId = keyof typeof sources
const voices = new Set<HTMLAudioElement>()
const pending = new Set<ReturnType<typeof setTimeout>>()

export function readSoundVolume() {
  try {
    const saved = localStorage.getItem('gsmikami-sfx-volume')
    const value = saved === null ? 40 : Number(saved)
    return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 40
  } catch { return 40 }
}

let volume = readSoundVolume()

export function setSoundVolume(value: number) {
  volume = Math.max(0, Math.min(100, value))
  for (const voice of voices) voice.volume = volume / 100
  try { localStorage.setItem('gsmikami-sfx-volume', String(volume)) } catch { /* Optional persistence. */ }
}

export function stopSounds() {
  for (const timer of pending) clearTimeout(timer)
  pending.clear()
  for (const voice of voices) voice.pause()
  voices.clear()
}

export function playSound(id: SoundId, delay = 0) {
  if (volume === 0 || document.hidden) return
  if (delay > 0) {
    const timer = setTimeout(() => {
      pending.delete(timer)
      playSound(id)
    }, delay)
    pending.add(timer)
    return
  }
  // Bound overlapping voices when players activate controls quickly.
  if (voices.size >= 8) {
    const oldest = voices.values().next().value
    if (oldest) { oldest.pause(); voices.delete(oldest) }
  }
  const voice = new Audio(sources[id])
  voice.volume = volume / 100
  voice.loop = false
  voices.add(voice)
  const release = () => voices.delete(voice)
  voice.addEventListener('ended', release, { once: true })
  voice.addEventListener('error', release, { once: true })
  void voice.play().catch(release)
}
