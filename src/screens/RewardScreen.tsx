import type { RewardKind } from '../game/types'

interface RewardScreenProps {
  onChoose: (reward: RewardKind) => void
}

const REWARDS: Array<{ kind: RewardKind; image: string; rarity: string; name: string; effect: string }> = [
  { kind: 'seal', image: '/items/blood-moon-seal-cel.png', rarity: 'RARE', name: 'Blood Moon Seal', effect: 'Maximum HP +8' },
  { kind: 'heal', image: '/items/restorative-tea-cel.png', rarity: 'SAFE', name: 'Restorative Tea', effect: 'Heal 24 HP' },
  { kind: 'spirit', image: '/items/soul-crystal-cel.png', rarity: 'MYSTIC', name: 'Soul Crystal', effect: 'Maximum Spirit +1' },
]

export function RewardScreen({ onChoose }: RewardScreenProps) {
  return (
    <section className="reward-screen">
      <p className="eyebrow anime-enter">SPIRIT SEALED</p>
      <h1 className="anime-enter">CHOOSE YOUR<br />REWARD</h1>
      <div className="reward-grid">
        {REWARDS.map((reward) => (
          <button className="anime-enter" key={reward.kind} onClick={() => onChoose(reward.kind)}>
            <img className="reward-art" src={reward.image} alt={reward.name} width="220" height="180" decoding="async" />
            <small>{reward.rarity}</small>
            <strong>{reward.name}</strong>
            <p>{reward.effect}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
