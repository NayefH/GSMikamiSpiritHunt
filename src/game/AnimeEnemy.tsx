import { ENEMY_IMAGES } from './assets'
import { ENEMIES, type EnemyId } from './data'

export function AnimeEnemy({ id, label }: { id: EnemyId; label?: string }) {
  return (
    <img
      className={`anime-enemy-art enemy-${id}`}
      src={ENEMY_IMAGES[id].src}
      alt={label ?? ENEMIES[id].name}
      width="260"
      height="315"
      decoding="async"
    />
  )
}
