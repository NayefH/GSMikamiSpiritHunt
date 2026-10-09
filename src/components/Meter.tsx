interface MeterProps {
  value: number
  max: number
  type: 'hp' | 'spirit' | 'enemy'
  label: string
}

export function Meter({ value, max, type, label }: MeterProps) {
  const percentage = Math.max(0, (value / max) * 100)

  return (
    <div className={`meter meter-${type}`} aria-label={`${label}: ${value} of ${max}`}>
      <div className="meter-label">
        <span>{label}</span>
        <strong>{value}/{max}</strong>
      </div>
      <div className="meter-track">
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
