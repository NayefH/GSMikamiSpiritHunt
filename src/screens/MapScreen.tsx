import { CharacterPortrait } from '../components/CharacterPortrait'
import { Meter } from '../components/Meter'
import { StatGuide } from '../components/StatGuide'
import type { Hero, HeroId, MapNode, NodeKind } from '../game/data'
import type { PlayerState } from '../game/types'

const NODE_ICONS: Record<NodeKind, string> = {
  battle: '⚔',
  event: '?',
  elite: '!',
  boss: '☠',
}

const NODE_LABELS: Record<NodeKind, string> = {
  battle: 'SPIRIT',
  event: 'UNKNOWN',
  elite: 'DANGER',
  boss: 'TARGET',
}

interface MapScreenProps {
  hero: Hero
  heroId: HeroId
  player: PlayerState
  stage: number
  completed: string[]
  nodesByStage: MapNode[][]
  onChooseNode: (node: MapNode) => void
}

export function MapScreen({ hero, heroId, player, stage, completed, nodesByStage, onChooseNode }: MapScreenProps) {
  return (
    <section className="map-screen">
      <div className="map-heading anime-enter">
        <div>
          <p className="eyebrow">CHOOSE A ROUTE · NIGHT {stage}/5</p>
          <h1>CURSED<br />TOKYO</h1>
        </div>
        <p>Every route changes the case. Cleared locations are gone for good.</p>
      </div>

      <div className="map-layout">
        <aside className="sweeper-card anime-enter">
          <div className="portrait"><CharacterPortrait id={heroId} /></div>
          <small>{hero.title}</small>
          <h2>{hero.name}</h2>
          <Meter type="hp" value={player.hp} max={player.maxHp} label="HEALTH" />
          <Meter type="spirit" value={player.spirit} max={player.maxSpirit} label="SPIRIT" />
          <div className="inventory">
            <span>Seals <b>{player.seals}</b></span>
            <span>Ward <b>{player.ward}</b></span>
            <span>Focus <b>{player.focus}</b></span>
          </div>
        </aside>

        <div className="route-map" aria-label="Branching city map">
          {nodesByStage.map((nodes, rowIndex) => (
            <div className="route-row" key={rowIndex}>
              <span className="stage-label">0{rowIndex + 1}</span>
              {nodes.map((node) => {
                const isCompleted = completed.includes(node.id)
                const isAvailable = node.stage === stage

                return (
                  <button
                    key={node.id}
                    disabled={!isAvailable}
                    onClick={() => onChooseNode(node)}
                    className={`map-node anime-enter ${node.kind} ${isCompleted ? 'done' : ''} ${isAvailable ? 'available' : ''}`}
                    style={{ gridColumn: node.lane + 1 }}
                  >
                    <span className="node-icon">{NODE_ICONS[node.kind]}</span>
                    <span>
                      <small>{NODE_LABELS[node.kind]}</small>
                      <strong>{node.title}</strong>
                      <em>{node.subtitle}</em>
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <StatGuide compact />
    </section>
  )
}
