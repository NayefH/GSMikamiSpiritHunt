import { CharacterPortrait } from '../components/CharacterPortrait'
import type { HeroId } from '../game/data'

interface VictoryScreenProps {
  heroId: HeroId
  yen: number
  seals: number
  stops: number
  onRestart: () => void
}

export function VictoryScreen({ heroId, yen, seals, stops, onRestart }: VictoryScreenProps) {
  return (
    <section className="ending victory">
      <div className="anime-enter">
        <p className="eyebrow">CASE CLOSED · 4:44 AM</p>
        <h1>TOKYO<br /><em>BREATHES AGAIN.</em></h1>
        <p>Ashtaroth has been sealed. The invoice is already on its way.</p>
        <dl>
          <div><dt>Earnings</dt><dd>¥{yen}</dd></div>
          <div><dt>Seals</dt><dd>{seals}</dd></div>
          <div><dt>Route</dt><dd>{stops} stops</dd></div>
        </dl>
        <button className="primary" onClick={onRestart}>NEW CASE</button>
      </div>
      <div className="ending-photo anime-enter"><CharacterPortrait id={heroId} /></div>
    </section>
  )
}

interface DefeatScreenProps {
  onRetry: () => void
  onChangeCharacter: () => void
}

export function DefeatScreen({ onRetry, onChangeCharacter }: DefeatScreenProps) {
  return (
    <section className="ending defeat">
      <div className="anime-enter">
        <p className="eyebrow">CASE FAILED · NOT FORGOTTEN</p>
        <h1>THE NIGHT<br /><em>WINS.</em></h1>
        <p>Some curses take a second attempt. Your next route could change everything.</p>
        <button className="primary" onClick={onRetry}>TRY AGAIN</button>
        <button className="text-button" onClick={onChangeCharacter}>CHANGE CHARACTER</button>
      </div>
    </section>
  )
}
