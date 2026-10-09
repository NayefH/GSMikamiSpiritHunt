import { AnimeEnemy } from '../game/AnimeEnemy'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { Meter } from '../components/Meter'
import { StatGuide } from '../components/StatGuide'
import { getEnemyIntent, getSkillValues } from '../game/rules'
import type { Enemy, Hero, HeroId, Skill } from '../game/data'
import type { BattleState, PlayerState } from '../game/types'

interface BattleScreenProps {
  hero: Hero
  heroId: HeroId
  player: PlayerState
  battle: BattleState
  enemy: Enemy
  log: string[]
  onPlaySkill: (skill: Skill) => void
  onFocus: () => void
}

function SkillValues({ skill }: { skill: Skill }) {
  return (
    <span className="skill-values">
      {getSkillValues(skill).map((value) => <i key={value}>{value}</i>)}
    </span>
  )
}

export function BattleScreen({ hero, heroId, player, battle, enemy, log, onPlaySkill, onFocus }: BattleScreenProps) {
  const intent = getEnemyIntent(battle, enemy)

  return (
    <section className="battle-screen">
      <div className="battle-scene">
        <div className="scene-moon" />
        <div className="city-silhouette" aria-hidden="true" />
        <div className="spirit-orb orb-a" />
        <div className="spirit-orb orb-b" />
        <div className="impact-flash" />

        <div className="fighter player-fighter anime-enter">
          <span className="status-tag">{player.ward ? `WARD ${player.ward}` : 'READY'}</span>
          <CharacterPortrait id={heroId} battle />
        </div>
        <div className="fighter enemy-fighter enemy-anime anime-enter">
          <span className="intent">{intent.short}</span>
          <AnimeEnemy id={enemy.id} label={enemy.name} />
        </div>
      </div>

      <div className="battle-hud">
        <div className="combatant-info anime-enter">
          <small>{hero.title}</small>
          <h2>{hero.name}</h2>
          <Meter type="hp" value={player.hp} max={player.maxHp} label="HP" />
          <Meter type="spirit" value={player.spirit} max={player.maxSpirit} label="SPIRIT" />
          <div className="battle-values">
            <div><b>{player.ward}</b><span>WARD<small>blocks damage first</small></span></div>
            <div><b>{player.focus}</b><span>FOCUS<small>+{player.focus * 3} next damage</small></span></div>
          </div>
        </div>

        <div className="actions anime-enter">
          <div className="turn-label"><span>YOUR TURN</span><small>Round {battle.round}</small></div>
          <div className="skill-grid">
            {hero.skills.map((skill, index) => (
              <button key={skill.name} onClick={() => onPlaySkill(skill)} disabled={player.spirit < skill.cost}>
                <kbd>{index + 1}</kbd>
                <span><strong>{skill.name}</strong><small>{skill.description}</small><SkillValues skill={skill} /></span>
                <b>{skill.cost} ◈</b>
              </button>
            ))}
          </div>
          <button className="focus-button" onClick={onFocus}>
            <span>◎</span>
            <span><strong>FOCUS</strong><small>+3 Spirit · +5 Ward · +1 Focus</small></span>
            <b>FREE</b>
          </button>
        </div>

        <div className="enemy-info anime-enter">
          <small>{enemy.subtitle}</small>
          <h2>{enemy.name}</h2>
          <Meter type="enemy" value={battle.hp} max={enemy.maxHp} label="SEAL HP" />
          <div className="next-action">
            <small>NEXT ACTION</small>
            <strong>{intent.detail}</strong>
            <span>Enemy intent is always revealed.</span>
          </div>
          <details className="combat-log">
            <summary>COMBAT LOG</summary>
            <div aria-live="polite">
            {log.slice(0, 3).map((entry, index) => (
              <p key={`${entry}-${index}`} className={index === 0 ? 'latest' : ''}>{entry}</p>
            ))}
            </div>
          </details>
        </div>

        <StatGuide />
      </div>
    </section>
  )
}
