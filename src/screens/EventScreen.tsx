import type { EventCopy } from '../game/data'

interface EventScreenProps {
  copy: EventCopy
  onChoose: (choice: 0 | 1) => void
}

export function EventScreen({ copy, onChoose }: EventScreenProps) {
  return (
    <section className="modal-screen">
      <div className="event-art anime-enter">
        <span className="mystery-kanji">怪</span>
        <i /><i /><i />
      </div>
      <div className="event-panel anime-enter">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <div className="event-choices">
          <button onClick={() => onChoose(0)}>
            <span>CAREFUL</span>
            <strong>Inspect and secure it</strong>
            <small>Heal 18 HP · gain 8 Ward</small>
          </button>
          <button onClick={() => onChoose(1)}>
            <span>RISKY</span>
            <strong>Accept the bargain</strong>
            <small>−8 HP · +1 Spirit · +¥20</small>
          </button>
        </div>
      </div>
    </section>
  )
}
