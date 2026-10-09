import { useMemo, useState } from 'react'
import { ENEMIES, EVENT_COPY, HEROES, MAP_NODES, type HeroId, type MapNode, type Skill } from '../game/data'
import { createInitialPlayer } from '../game/rules'
import type { BattleState, PlayerState, RewardKind, Screen } from '../game/types'
import { playMotion } from './useAnimeEffects'
import { playSound, stopSounds } from '../game/audio'

const INITIAL_LOG = ['The night belongs to the spirits.']

function getEventCopy(nodeId?: string) {
  if (nodeId === 's1b') return EVENT_COPY.kiosk
  if (nodeId === 's2a') return EVENT_COPY.shrine
  if (nodeId === 's3b') return EVENT_COPY.moon
  return EVENT_COPY.archive
}

export function useGame() {
  const [screen, setScreen] = useState<Screen>('start')
  const [selectedHero, setSelectedHero] = useState<HeroId>('mikami')
  const [player, setPlayer] = useState<PlayerState>(() => createInitialPlayer('mikami'))
  const [battle, setBattle] = useState<BattleState | null>(null)
  const [stage, setStage] = useState(1)
  const [completed, setCompleted] = useState<string[]>([])
  const [activeNode, setActiveNode] = useState<MapNode | null>(null)
  const [log, setLog] = useState<string[]>(INITIAL_LOG)
  const [runCode, setRunCode] = useState('MIKAMI-013')

  const hero = HEROES[selectedHero]
  const enemy = battle ? ENEMIES[battle.enemyId] : null
  const eventCopy = getEventCopy(activeNode?.id)
  const nodesByStage = useMemo(
    () => Array.from({ length: 5 }, (_, index) => MAP_NODES.filter((node) => node.stage === index + 1)),
    [],
  )

  function showStartScreen() {
    stopSounds()
    setScreen('start')
  }

  function beginRun(heroId: HeroId = selectedHero) {
    stopSounds()
    playSound('confirm')
    setSelectedHero(heroId)
    setPlayer(createInitialPlayer(heroId))
    setBattle(null)
    setStage(1)
    setCompleted([])
    setActiveNode(null)
    setLog([`${HEROES[heroId].name} takes the case.`])
    setRunCode(`${heroId.slice(0, 3).toUpperCase()}-${String(Math.floor(Math.random() * 900) + 100)}`)
    setScreen('map')
  }

  function chooseNode(node: MapNode) {
    if (node.stage !== stage) return

    setActiveNode(node)
    playSound('open')
    if (node.kind === 'event') {
      setScreen('event')
      return
    }

    const nextEnemy = ENEMIES[node.enemy!]
    setBattle({ enemyId: nextEnemy.id, hp: nextEnemy.maxHp, stunned: 0, round: 1 })
    setLog([`${nextEnemy.name} blocks the way.`, 'The enemy gathers spirit energy.'])
    setScreen('battle')
  }

  function finishNode(message: string) {
    if (activeNode) {
      setCompleted((current) => [...current, activeNode.id])
    }
    setLog((current) => [message, ...current].slice(0, 5))

    if (activeNode?.kind === 'boss') {
      playSound('success', 250)
      setScreen('victory')
      return
    }

    setStage((current) => Math.min(5, current + 1))
    setActiveNode(null)
    setBattle(null)
    setScreen('map')
  }

  function resolveEnemyTurn(nextPlayer: PlayerState, nextBattle: BattleState, playerAction: string) {
    if (!enemy) return

    if (nextBattle.stunned > 0) {
      nextBattle.stunned -= 1
      setLog((current) => [`${enemy.name} is sealed and misses a turn.`, playerAction, ...current].slice(0, 5))
    } else {
      const isHeavyAttack = nextBattle.round % 3 === 0
      const drainsSpirit = nextBattle.round % 3 === 1
      let incomingDamage = isHeavyAttack ? enemy.damage + 6 : enemy.damage
      let enemyAction = `${enemy.name} deals ${incomingDamage} damage.`

      if (drainsSpirit) {
        const drainedSpirit = Math.min(2, nextPlayer.spirit)
        nextPlayer.spirit -= drainedSpirit
        enemyAction = `${enemy.name} drains ${drainedSpirit} Spirit and attacks.`
      }

      const blockedDamage = Math.min(nextPlayer.ward, incomingDamage)
      nextPlayer.ward -= blockedDamage
      incomingDamage -= blockedDamage
      nextPlayer.hp -= incomingDamage

      if (blockedDamage > 0) {
        enemyAction += ` ${blockedDamage} is blocked.`
      }

      setLog((current) => [enemyAction, playerAction, ...current].slice(0, 5))
      playSound('impact', 180)
      playMotion('.player-fighter', { x: [0, -14, 10, -5, 0], duration: 360, ease: 'out(3)' })
      playMotion('.battle-scene', { backgroundColor: ['#ff47771c', '#0000'], duration: 420 })
    }

    nextBattle.round += 1
    setPlayer({ ...nextPlayer })
    setBattle({ ...nextBattle })

    if (nextPlayer.hp <= 0) {
      playSound('defeat', 400)
      setScreen('defeat')
    }
  }

  function playSkill(skill: Skill) {
    if (!battle || !enemy || player.spirit < skill.cost) return

    const nextPlayer = { ...player }
    const nextBattle = { ...battle }
    const damage = (skill.damage ?? 0) + nextPlayer.focus * 3

    nextPlayer.spirit -= skill.cost
    nextPlayer.hp = Math.min(nextPlayer.maxHp, nextPlayer.hp + (skill.heal ?? 0))
    nextPlayer.ward += skill.ward ?? 0
    nextPlayer.focus = 0
    nextBattle.hp -= damage
    nextBattle.stunned += skill.stun ?? 0

    const effects = [
      damage ? `${damage} damage` : '',
      skill.heal ? `${skill.heal} healing` : '',
      skill.ward ? `${skill.ward} Ward` : '',
    ].filter(Boolean).join(', ')
    const actionText = `${skill.name}: ${effects || 'The seal takes hold'}.`
    playSound(selectedHero === 'yokoshima' && skill.damage ? 'punch' : 'magic')

    playMotion('.enemy-fighter', { x: [0, 18, -14, 8, 0], scale: [1, .94, 1], duration: 420, ease: 'out(4)' })
    playMotion('.impact-flash', { opacity: [0, 1, 0], scale: [.2, 1.4], duration: 480, ease: 'out(3)' })

    if (nextBattle.hp <= 0) {
      nextPlayer.yen += enemy.reward
      setPlayer(nextPlayer)
      setBattle(nextBattle)
      setLog((current) => [`${enemy.name} has moved on. +¥${enemy.reward}`, actionText, ...current].slice(0, 5))

      if (activeNode?.kind === 'boss') {
        finishNode('The curse over Tokyo is broken.')
      } else {
        playSound('success', 250)
        setScreen('reward')
      }
      return
    }

    resolveEnemyTurn(nextPlayer, nextBattle, actionText)
  }

  function focusTurn() {
    if (!battle) return
    playSound('magic')

    const nextPlayer = {
      ...player,
      spirit: Math.min(player.maxSpirit, player.spirit + 3),
      ward: player.ward + 5,
      focus: Math.min(3, player.focus + 1),
    }

    playMotion('.player-fighter', {
      filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1)'],
      scale: [1, 1.06, 1],
      duration: 650,
    })
    resolveEnemyTurn(nextPlayer, { ...battle }, 'You gather power: +3 Spirit, +5 Ward, +1 Focus.')
  }

  function takeReward(kind: RewardKind) {
    playSound('confirm')
    setPlayer((current) => {
      if (kind === 'seal') {
        return { ...current, seals: current.seals + 1, maxHp: current.maxHp + 8, hp: current.hp + 8 }
      }
      if (kind === 'heal') {
        return { ...current, hp: Math.min(current.maxHp, current.hp + 24) }
      }
      return { ...current, maxSpirit: current.maxSpirit + 1, spirit: current.maxSpirit + 1 }
    })

    const message = kind === 'seal'
      ? 'A Blood Moon Seal makes you tougher.'
      : kind === 'heal'
        ? 'Your wounds close.'
        : 'Your spirit power grows.'
    finishNode(message)
  }

  function chooseEventOption(choice: 0 | 1) {
    playSound('confirm')
    const isRisky = choice === 1

    setPlayer((current) => isRisky
      ? {
          ...current,
          hp: Math.max(1, current.hp - 8),
          maxSpirit: current.maxSpirit + 1,
          spirit: current.maxSpirit + 1,
          yen: current.yen + 20,
        }
      : {
          ...current,
          hp: Math.min(current.maxHp, current.hp + 18),
          ward: current.ward + 8,
        })

    finishNode(isRisky
      ? 'The bargain costs 8 HP, but grants ¥20 and +1 Spirit.'
      : 'Caution pays off: +18 HP and +8 Ward.')
  }

  return {
    screen,
    selectedHero,
    player,
    battle,
    activeNode,
    stage,
    completed,
    log,
    runCode,
    hero,
    enemy,
    eventCopy,
    nodesByStage,
    setSelectedHero,
    showStartScreen,
    beginRun,
    chooseNode,
    playSkill,
    focusTurn,
    takeReward,
    chooseEventOption,
  }
}
