import { useEffect, type RefObject } from 'react'
import { animate, createScope, stagger } from 'animejs'
import type { EnemyId } from '../game/data'
import type { Screen } from '../game/types'

export function useAnimeEffects(rootRef: RefObject<HTMLElement | null>, screen: Screen, enemyId?: EnemyId) {
  useEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scope = createScope({ root: rootRef }).add(() => {
      animate('.anime-enter', {
        opacity: { from: 0 },
        y: { from: 24 },
        duration: 650,
        delay: stagger(70),
        ease: 'out(4)',
      })
      animate('.speed-line', {
        x: { from: '-12vw', to: '112vw' },
        duration: 1500,
        delay: stagger(170),
        loop: true,
        ease: 'linear',
      })

      if (screen === 'battle') {
        animate('.enemy-anime', {
          y: [-6, 7],
          rotate: [-1.2, 1.2],
          duration: 1700,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        })
        animate('.spirit-orb', {
          y: [-8, 10],
          scale: [.8, 1.12],
          duration: 1300,
          delay: stagger(180),
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        })
      }
    })

    return () => scope.revert()
  }, [rootRef, screen, enemyId])
}

export function playMotion(target: string, properties: Parameters<typeof animate>[1]) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate(target, properties)
  }
}
