import { AnimeLogo } from './AnimeLogo'

interface GameHeaderProps {
  runCode: string
  yen: number
  onExit: () => void
}

export function GameHeader({ runCode, yen, onExit }: GameHeaderProps) {
  return (
    <header className="topbar">
      <button className="mini-brand" onClick={onExit} aria-label="Back to the main menu">
        <AnimeLogo compact />
        <span className="mini-brand-subtitle">SPIRIT HUNT</span>
      </button>
      <div className="case-file"><span>CASE FILE</span><strong>#{runCode}</strong></div>
      <div className="resource"><span>¥</span><strong>{yen}</strong></div>
      <button className="text-button" onClick={onExit}>ABANDON</button>
    </header>
  )
}
