import { useEffect } from 'react'
import { playSound, stopSounds } from '../game/audio'

export function useInterfaceSounds() {
  useEffect(() => {
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const button = event.target.closest<HTMLButtonElement>('button')
      if (!button || button.disabled || button.closest('.battle-screen, .reward-screen, .event-choices, .music-controls')) return
      // Native click events include keyboard activation without double sounds.
      playSound('click')
    }
    function visibility() { if (document.hidden) stopSounds() }
    document.addEventListener('click', click, true)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      document.removeEventListener('click', click, true)
      document.removeEventListener('visibilitychange', visibility)
      stopSounds()
    }
  }, [])
}
