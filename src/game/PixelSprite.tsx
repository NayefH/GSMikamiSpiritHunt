import { useEffect, useRef } from 'react'
import type { EnemyId, HeroId } from './data'

type SpriteId = HeroId | EnemyId | 'city'

const palettes: Record<string, string> = {
  ink: '#17142d', dark: '#2a2147', skin: '#ffd1b5', red: '#f23f67', red2: '#ff765f',
  violet: '#6f3ba8', violet2: '#a65be0', cyan: '#51e7e0', blue: '#47a7dd', white: '#f5efff',
  gold: '#f5c84c', green: '#67d993', gray: '#8180a2', black: '#090815', brown: '#6d354f',
}

function rect(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = palettes[color] || color
  ctx.fillRect(x, y, w, h)
}

function drawHumanoid(ctx: CanvasRenderingContext2D, id: HeroId | 'salaryman') {
  const isM = id === 'mikami'; const isY = id === 'yokoshima'; const isO = id === 'okinu'
  const hair = isM ? 'red' : isO ? 'blue' : isY ? 'dark' : 'gray'
  rect(ctx, hair, 12, 4, 12, 4); rect(ctx, hair, 8, 8, 20, 8); rect(ctx, 'skin', 12, 10, 12, 10)
  rect(ctx, 'ink', 14, 13, 2, 2); rect(ctx, 'ink', 21, 13, 2, 2)
  if (isM) { rect(ctx, 'red', 8, 8, 4, 20); rect(ctx, 'violet', 10, 20, 16, 17); rect(ctx, 'skin', 7, 22, 3, 13); rect(ctx, 'skin', 26, 22, 3, 13); rect(ctx, 'black', 9, 37, 7, 12); rect(ctx, 'black', 21, 37, 7, 12); rect(ctx, 'cyan', 3, 20, 3, 26); rect(ctx, 'gold', 1, 18, 7, 4) }
  else if (isY) { rect(ctx, 'green', 9, 20, 18, 18); rect(ctx, 'white', 12, 20, 12, 5); rect(ctx, 'skin', 6, 23, 4, 14); rect(ctx, 'skin', 27, 23, 4, 14); rect(ctx, 'blue', 10, 38, 8, 12); rect(ctx, 'blue', 21, 38, 8, 12); rect(ctx, 'gold', 29, 24, 5, 5) }
  else if (isO) { rect(ctx, 'white', 8, 20, 20, 18); rect(ctx, 'red', 15, 20, 7, 18); rect(ctx, 'white', 3, 23, 7, 14); rect(ctx, 'white', 27, 23, 7, 14); rect(ctx, 'cyan', 10, 38, 16, 3); rect(ctx, 'cyan', 8, 43, 20, 2) }
  else { rect(ctx, 'gray', 9, 20, 18, 20); rect(ctx, 'white', 15, 20, 6, 14); rect(ctx, 'red', 17, 22, 2, 12); rect(ctx, 'dark', 8, 40, 9, 10); rect(ctx, 'dark', 21, 40, 9, 10); rect(ctx, 'cyan', 7, 9, 3, 30) }
}

function drawSprite(ctx: CanvasRenderingContext2D, id: SpriteId) {
  if (id === 'mikami' || id === 'yokoshima' || id === 'okinu' || id === 'salaryman') return drawHumanoid(ctx, id)
  if (id === 'lantern') {
    rect(ctx, 'cyan', 11, 9, 16, 5); rect(ctx, 'blue', 7, 14, 24, 22); rect(ctx, 'cyan', 10, 17, 18, 15)
    rect(ctx, 'ink', 13, 22, 3, 3); rect(ctx, 'ink', 22, 22, 3, 3); rect(ctx, 'blue', 16, 28, 7, 2)
    rect(ctx, 'cyan', 3, 35, 6, 6); rect(ctx, 'blue', 1, 41, 4, 5); rect(ctx, 'cyan', 29, 36, 6, 6)
  } else if (id === 'umbrella') {
    rect(ctx, 'violet2', 4, 12, 28, 5); rect(ctx, 'violet', 7, 8, 22, 5); rect(ctx, 'red', 16, 5, 4, 7)
    rect(ctx, 'white', 11, 17, 14, 13); rect(ctx, 'ink', 15, 21, 5, 6); rect(ctx, 'red', 14, 30, 9, 6)
    rect(ctx, 'gold', 18, 36, 3, 11); rect(ctx, 'gold', 18, 45, 8, 3)
  } else {
    rect(ctx, 'red', 8, 6, 22, 12); rect(ctx, 'gold', 10, 2, 4, 7); rect(ctx, 'gold', 25, 2, 4, 7)
    rect(ctx, 'red2', 5, 16, 29, 21); rect(ctx, 'ink', 10, 21, 5, 4); rect(ctx, 'ink', 25, 21, 5, 4)
    rect(ctx, 'white', 15, 28, 4, 5); rect(ctx, 'white', 22, 28, 4, 5); rect(ctx, 'violet', 9, 37, 22, 11)
    rect(ctx, 'red', 1, 23, 6, 16); rect(ctx, 'red', 33, 23, 6, 16)
  }
}

export function PixelSprite({ id, size = 144, label }: { id: SpriteId; size?: number; label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    ctx.clearRect(0, 0, 40, 52); drawSprite(ctx, id)
  }, [id])
  return <canvas ref={ref} className="pixel-sprite" width="40" height="52" style={{ width: size, height: size * 1.3 }} role="img" aria-label={label ?? id} />
}
