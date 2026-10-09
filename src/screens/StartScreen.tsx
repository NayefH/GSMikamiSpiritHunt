import type { RefObject } from 'react'
import { AnimeLogo } from '../components/AnimeLogo'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { ANIME_ART_SOURCES, ANIME_LOGO_SOURCE, CHARACTER_IMAGES, OFFICIAL_OPENING_SOURCE } from '../game/assets'
import { HEROES, type HeroId } from '../game/data'

interface StartScreenProps {
  rootRef: RefObject<HTMLElement | null>
  selectedHero: HeroId
  onSelectHero: (heroId: HeroId) => void
  onStart: () => void
}

export function StartScreen({ rootRef, selectedHero, onSelectHero, onStart }: StartScreenProps) {
  return (
    <main ref={rootRef} className="start-screen anime-theme">
      <div className="sunburst" aria-hidden="true" />
      <div className="speed-lines" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <i className="speed-line" key={index} style={{ top: `${12 + index * 12}%` }} />
        ))}
      </div>

      <header className="brand anime-enter">
        <AnimeLogo />
        <span className="brand-edition">SPIRIT HUNT</span>
      </header>

      <section className="title-block anime-enter">
        <p className="eyebrow">TOKYO · 12:13 AM · SPIRIT LEVEL CRITICAL</p>
        <h1>SPIRIT<br /><em>HUNT</em></h1>
        <p className="intro">A turn-based roguelike. Choose your Ghost Sweeper, plan every move, and find a path through the cursed city.</p>
      </section>

      <section className="hero-select" aria-label="Choose a character">
        {Object.values(HEROES).map((hero, index) => (
          <button
            key={hero.id}
            className={`hero-card anime-enter ${selectedHero === hero.id ? 'selected' : ''}`}
            aria-pressed={selectedHero === hero.id}
            onClick={() => onSelectHero(hero.id)}
          >
            <span className="pick-number">0{index + 1}</span>
            <span className="hero-art">
              <CharacterPortrait id={hero.id} />
            </span>
            <span className="hero-copy">
              <small>{hero.title}</small>
              <strong>{hero.name}</strong>
              <span>{hero.quote}</span>
            </span>
            <span className="stats">HP {hero.maxHp} · SPIRIT {hero.maxSpirit}</span>
          </button>
        ))}
      </section>

      <button className="primary start-button anime-enter" onClick={onStart}>
        TAKE THE CASE <span>ENTER</span>
      </button>

      <p className="legal-note anime-enter">
        Fan project · <a href={ANIME_LOGO_SOURCE} target="_blank" rel="noreferrer">Original anime logo</a> · AI-edited official character artwork · AI-generated enemy &amp; item art · Character artwork:{' '}
        <a href={CHARACTER_IMAGES.mikami.sourceUrl} target="_blank" rel="noreferrer">Toei Animation</a>
        {' '}· <a href="https://gs-mikami.fandom.com/wiki/List_of_characters" target="_blank" rel="noreferrer">GS Mikami Wiki</a>
        {' '}· Official anime imagery:{' '}
        {ANIME_ART_SOURCES.map((image, index) => (
          <span key={image.name}>
            {index > 0 && ', '}
            <a href={image.sourceUrl} target="_blank" rel="noreferrer" title={image.name}>
              {image.creator}
            </a>
          </span>
        ))}
        {' '}· <a href={OFFICIAL_OPENING_SOURCE} target="_blank" rel="noreferrer">Opening: Toei Animation Beyond</a>
        {' '}· Rights remain with their respective owners
      </p>
    </main>
  )
}
