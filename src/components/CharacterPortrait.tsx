import { BATTLE_CHARACTER_IMAGES, CHARACTER_IMAGES } from '../game/assets'
import { HEROES, type HeroId } from '../game/data'

interface CharacterPortraitProps {
  id: HeroId
  compact?: boolean
  battle?: boolean
}

export function CharacterPortrait({ id, compact = false, battle = false }: CharacterPortraitProps) {
  const hero = HEROES[id]
  const images = battle ? BATTLE_CHARACTER_IMAGES : CHARACTER_IMAGES

  return (
    <img
      className={`character-photo character-${id} ${compact ? 'compact' : ''} ${battle ? 'battle-character' : ''}`}
      src={images[id].src}
      alt={`${hero.name} from Ghost Sweeper Mikami`}
      decoding="async"
    />
  )
}
