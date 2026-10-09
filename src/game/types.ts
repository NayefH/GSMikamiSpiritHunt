import type { EnemyId } from './data'

export type Screen = 'start' | 'map' | 'battle' | 'event' | 'reward' | 'victory' | 'defeat'

export interface PlayerState {
  hp: number
  maxHp: number
  spirit: number
  maxSpirit: number
  ward: number
  focus: number
  yen: number
  seals: number
}

export interface BattleState {
  enemyId: EnemyId
  hp: number
  stunned: number
  round: number
}

export type RewardKind = 'seal' | 'heal' | 'spirit'
