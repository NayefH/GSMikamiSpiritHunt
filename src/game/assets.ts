import type { EnemyId, HeroId } from './data'

export const ANIME_LOGO_SOURCE = 'https://www.fwinc.co.jp/news/79772/'

export const OFFICIAL_OPENING_SOURCE = 'https://www.youtube.com/watch?v=xDzB3anJi_8'

export const CHARACTER_IMAGES: Record<HeroId, { src: string; sourceUrl: string }> = {
  mikami: { src: '/characters/reiko-cel.png', sourceUrl: 'https://www.toei-anim.co.jp/tv/gs_mikami/character/' },
  yokoshima: { src: '/characters/yokoshima-cel.png', sourceUrl: 'https://www.toei-anim.co.jp/tv/gs_mikami/character/' },
  okinu: { src: '/characters/okinu-cel.png', sourceUrl: 'https://www.toei-anim.co.jp/tv/gs_mikami/character/' },
}

// Generated interpretations; these URLs document character references, not image licenses.
export const ENEMY_IMAGES: Record<EnemyId, { src: string; sourceUrl: string }> = {
  lantern: { src: '/enemies/bloodeau-cel.png', sourceUrl: 'https://gs-mikami.fandom.com/wiki/Count_Bloodeau' },
  umbrella: { src: '/enemies/medusa-cel.png', sourceUrl: 'https://gs-mikami.fandom.com/wiki/Medusa' },
  salaryman: { src: '/enemies/nosferatu-cel.png', sourceUrl: 'https://gs-mikami.fandom.com/wiki/Nosferatu' },
  oni: { src: '/enemies/ashtaroth-cel.png', sourceUrl: 'https://gs-mikami.fandom.com/wiki/Ashtaroth' },
}

export const ANIME_ART_SOURCES = [
  {
    name: 'Official series character still',
    creator: 'Toei Animation',
    sourceUrl: 'https://lineup.toei-anim.co.jp/ja/tv/gs_mikami/',
  },
  {
    name: '30th anniversary key art and battle still',
    creator: 'Frontier Works / Toei Animation',
    sourceUrl: 'https://prtimes.jp/main/html/rd/p/000004039.000016756.html',
  },
] as const
