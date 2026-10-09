import { CHARACTER_IMAGES } from '../game/assets'
import { HEROES, type HeroId } from '../game/data'

interface CharacterPortraitProps {
  id: HeroId
  compact?: boolean
}

export function CharacterPortrait({ id, compact = false }: CharacterPortraitProps) {
  const hero = HEROES[id]

  return (
    <img
      className={`character-photo character-${id} ${compact ? 'compact' : ''}`}
      src={CHARACTER_IMAGES[id].src}
      alt={`${hero.name} from Ghost Sweeper Mikami`}
      decoding="async"
    />
  )
}
