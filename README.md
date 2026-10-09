# GS Mikami: Spirit Hunt

A responsive, turn-based fan roguelike inspired by Ghost Sweeper Mikami.
Choose Reiko, Yokoshima or Okinu, follow a branching route through Tokyo,
fight spirits and choose rewards to prepare for the final boss.

## Features

- Character and enemy artwork in a cel-anime style.
- Illustrated items and readable combat values.
- Mobile layouts, touch controls and support for reduced motion.
- Screen-specific music, combat effects and menu sounds.
- Independent, saved music and sound-effect volume settings.
- A technology section with German/English switching and documentation links.

## Development

Requires a Node.js version compatible with Vite 8 (20.19+ or 22.12+).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run lint
npm run preview
```

The production build is generated in `dist/`.

## Technologies

React, React DOM, TypeScript, Anime.js, Vite, Babel / React Compiler and ESLint.
Audio playback uses native browser APIs. See the in-game technology section
for descriptions and official documentation links.

## Asset sources

- [Artwork sources](public/ARTWORK-SOURCES.md)
- [Music and sound-effect sources](public/AUDIO-SOURCES.md)
- [Kenney sound-effect license](src/sfx/KENNEY-LICENSE.txt)

This is a fan project. Original series artwork, characters and music remain
subject to their respective owners' rights.
