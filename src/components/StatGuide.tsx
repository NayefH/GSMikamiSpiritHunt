const STAT_HELP = [
  { icon: '♥', name: 'HP', text: 'Your life. At 0, the run ends.' },
  { icon: '◈', name: 'Spirit', text: 'Energy spent to use skills.' },
  { icon: '◆', name: 'Ward', text: 'Blocks damage before HP.' },
  { icon: '◎', name: 'Focus', text: '+3 damage per stack on your next attack.' },
  { icon: '◇', name: 'Seal', text: 'Enemy life. Reduce it to 0.' },
  { icon: '!', name: 'Intent', text: 'The enemy action coming next.' },
]

export function StatGuide({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`stat-guide anime-enter ${compact ? 'compact' : ''}`} aria-label="Explanation of game values">
      <div className="guide-title">
        <small>QUICK GUIDE</small>
        <strong>WHAT THE VALUES MEAN</strong>
      </div>
      <div className="guide-items">
        {STAT_HELP.map((stat) => (
          <div className="guide-item" key={stat.name}>
            <b>{stat.icon}</b>
            <span>
              <strong>{stat.name}</strong>
              <small>{stat.text}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
