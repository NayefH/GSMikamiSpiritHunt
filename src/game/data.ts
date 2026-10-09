export type HeroId = 'mikami' | 'yokoshima' | 'okinu'
export type EnemyId = 'lantern' | 'umbrella' | 'salaryman' | 'oni'
export type NodeKind = 'battle' | 'event' | 'elite' | 'boss'

export interface Skill {
  name: string
  description: string
  cost: number
  damage?: number
  heal?: number
  ward?: number
  focus?: number
  stun?: number
}

export interface Hero {
  id: HeroId
  name: string
  title: string
  quote: string
  maxHp: number
  maxSpirit: number
  color: string
  skills: Skill[]
}

export interface Enemy {
  id: EnemyId
  name: string
  subtitle: string
  maxHp: number
  damage: number
  reward: number
}

export interface MapNode {
  id: string
  stage: number
  lane: number
  kind: NodeKind
  title: string
  subtitle: string
  enemy?: EnemyId
}

export interface EventCopy {
  eyebrow: string
  title: string
  body: string
}

export const HEROES: Record<HeroId, Hero> = {
  mikami: {
    id: 'mikami', name: 'Reiko Mikami', title: 'Ghost Sweeper',
    quote: 'The job comes first. The invoice comes right after.',
    maxHp: 74, maxSpirit: 8, color: '#ff426d',
    skills: [
      { name: 'Spirit Rod', description: 'A precise psychic strike.', cost: 1, damage: 15 },
      { name: 'Talisman Chain', description: 'Deals damage and stuns for 1 turn.', cost: 3, damage: 10, stun: 1 },
      { name: 'Barrier', description: 'Creates 15 Ward.', cost: 2, ward: 15 },
    ],
  },
  yokoshima: {
    id: 'yokoshima', name: 'Tadao Yokoshima', title: 'Psychic Apprentice',
    quote: 'Wait — I am really supposed to go first?',
    maxHp: 92, maxSpirit: 7, color: '#ffcc49',
    skills: [
      { name: 'Panic Punch', description: 'Unpredictable, but surprisingly strong.', cost: 1, damage: 13 },
      { name: 'Psychic Hand', description: 'A heavy spirit-powered hit.', cost: 3, damage: 22 },
      { name: 'Hang On!', description: 'Heals 12 and grants 6 Ward.', cost: 2, heal: 12, ward: 6 },
    ],
  },
  okinu: {
    id: 'okinu', name: 'Okinu', title: 'Shrine Ghost',
    quote: 'Even a ghost can help another spirit move on.',
    maxHp: 64, maxSpirit: 10, color: '#52e7ff',
    skills: [
      { name: 'Will-o’-Wisp', description: 'A spectral attack.', cost: 1, damage: 12 },
      { name: 'Soul’s Rest', description: 'Restores 18 HP.', cost: 3, heal: 18 },
      { name: 'Frost Breath', description: 'Damage, Ward and a stun.', cost: 3, damage: 8, ward: 8, stun: 1 },
    ],
  },
}

export const ENEMIES: Record<EnemyId, Enemy> = {
  lantern: { id: 'lantern', name: 'Count Bloodeau', subtitle: 'ancient vampire patriarch', maxHp: 44, damage: 10, reward: 18 },
  umbrella: { id: 'umbrella', name: 'Medusa', subtitle: 'dragon goddess and ruthless strategist', maxHp: 60, damage: 13, reward: 26 },
  salaryman: { id: 'salaryman', name: 'Nosferatu', subtitle: 'the resurrected vampire lord', maxHp: 78, damage: 16, reward: 36 },
  oni: { id: 'oni', name: 'Ashtaroth', subtitle: 'renegade archdemon', maxHp: 124, damage: 20, reward: 120 },
}

export const MAP_NODES: MapNode[] = [
  { id: 's1a', stage: 1, lane: 0, kind: 'battle', title: 'Bloodeau Manor', subtitle: 'The vampire patriarch awakens', enemy: 'lantern' },
  { id: 's1b', stage: 1, lane: 2, kind: 'event', title: 'Midnight Kiosk', subtitle: 'The vending machine whispers your name' },
  { id: 's2a', stage: 2, lane: 0, kind: 'event', title: 'Forgotten Shrine', subtitle: 'A bargain waits beneath red gates' },
  { id: 's2b', stage: 2, lane: 1, kind: 'battle', title: 'Dragon Shrine', subtitle: 'Medusa hunts from the shadows', enemy: 'umbrella' },
  { id: 's2c', stage: 2, lane: 2, kind: 'battle', title: 'Vampire Crypt', subtitle: 'Bloodeau guards the old bloodline', enemy: 'lantern' },
  { id: 's3a', stage: 3, lane: 0, kind: 'elite', title: 'Sealed Cathedral', subtitle: 'Nosferatu rises again', enemy: 'salaryman' },
  { id: 's3b', stage: 3, lane: 2, kind: 'event', title: 'Moon Bath', subtitle: 'Healing — maybe' },
  { id: 's4a', stage: 4, lane: 0, kind: 'battle', title: 'Dragon Sanctuary', subtitle: 'Medusa sets her trap', enemy: 'umbrella' },
  { id: 's4b', stage: 4, lane: 1, kind: 'event', title: 'Sealed Archive', subtitle: 'Files, talismans, trouble' },
  { id: 's4c', stage: 4, lane: 2, kind: 'elite', title: 'Moonlit Mausoleum', subtitle: 'Nosferatu demands a rematch', enemy: 'salaryman' },
  { id: 's5', stage: 5, lane: 1, kind: 'boss', title: 'Demon Realm Rift', subtitle: 'Ashtaroth waits beyond reality', enemy: 'oni' },
]

export const EVENT_COPY: Record<'kiosk' | 'shrine' | 'moon' | 'archive', EventCopy> = {
  kiosk: {
    eyebrow: 'STRANGE DISCOVERY', title: 'The Cursed Vending Machine',
    body: 'Between cold coffee and plum soda, a one-eyed can blinks at you. The machine only accepts spirit money.',
  },
  shrine: {
    eyebrow: 'A QUIET BARGAIN', title: 'The Echo Beneath the Torii',
    body: 'A nameless guardian offers you a talisman. In return, it wants one particularly embarrassing memory.',
  },
  moon: {
    eyebrow: 'TOO QUIET', title: 'The Moon Bath',
    body: 'The water glows peacefully. Something with far too many teeth is smiling at you from the bottom.',
  },
  archive: {
    eyebrow: 'FORBIDDEN FILE', title: 'Case Number 404',
    body: 'The file claims you already lost this job. An unused seal rests beside it.',
  },
}
