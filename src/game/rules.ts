import { HEROES, type Enemy, type HeroId, type Skill } from './data'
import type { BattleState, PlayerState } from './types'

export function createInitialPlayer(heroId: HeroId): PlayerState {
  const hero = HEROES[heroId]

  return {
    hp: hero.maxHp,
    maxHp: hero.maxHp,
    spirit: hero.maxSpirit,
    maxSpirit: hero.maxSpirit,
    ward: 0,
    focus: 0,
    yen: 0,
    seals: 0,
  }
}

export function getEnemyIntent(battle: BattleState, enemy: Enemy) {
  if (battle.stunned > 0) {
    return { short: 'SEALED', detail: 'SEALED — SKIPS TURN' }
  }

  const phase = battle.round % 3
  if (phase === 0) {
    return {
      short: `HEAVY ATTACK ${enemy.damage + 6}`,
      detail: `HEAVY ATTACK · ${enemy.damage + 6} DMG`,
    }
  }

  if (phase === 1) {
    return {
      short: `DRAIN + ${enemy.damage}`,
      detail: `SPIRIT DRAIN · ${enemy.damage} DMG`,
    }
  }

  return {
    short: `ATTACK ${enemy.damage}`,
    detail: `ATTACK · ${enemy.damage} DMG`,
  }
}

export function getSkillValues(skill: Skill) {
  return [
    skill.damage ? `DMG ${skill.damage}` : '',
    skill.heal ? `HEAL ${skill.heal}` : '',
    skill.ward ? `WARD ${skill.ward}` : '',
    skill.stun ? `STUN ${skill.stun}` : '',
  ].filter(Boolean)
}
