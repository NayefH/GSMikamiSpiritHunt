# Audio sources and playback

## Local music

Music files supplied in `src/music`:

| Screen | Track | Repeat |
| --- | --- | --- |
| Menu / rewards | 01 Mikami's Theme | Loop |
| Map | 14 Broom Flight at the Sunset | Loop |
| Events | 16 Funky Building Lot | Loop |
| Normal battles | 11 Such Dirty Sewers | Loop |
| Elite / boss battles | 19 Arch Fiend | Loop |
| Victory | 14 Broom Flight at the Sunset | Once, from the beginning |
| Defeat | 19 Arch Fiend | Once, from the beginning |

## User-supplied combat effects

- `mixkit-hard-and-quick-punch-2143.wav`: Yokoshima's damaging skills.
- `mixkit-impact-of-a-blow-2150.wav`: enemy attacks, slightly after the player's action.

These were already present in `src/sfx`. Their names identify Mixkit as the source.

## Downloaded effects

Retrieved 2026-10-09; all sounds play once, never in a loop.

Kenney, Interface Sounds: https://kenney.nl/assets/interface-sounds
License: CC0; original license retained in `src/sfx/KENNEY-LICENSE.txt`.

- `kenney-click.ogg` from `click_001.ogg`: enabled menu buttons, including keyboard activation.
- `kenney-confirm.ogg` from `confirmation_001.ogg`: start/retry, reward pickups, event choices.
- `kenney-open.ogg` from `open_001.ogg`: entering battles or events.

Mixkit video game effects: https://mixkit.co/free-sound-effects/video-game/
License: Mixkit Sound Effects Free License, https://mixkit.co/license/#sfxFree

- `mixkit-magic-sparkle-2350.wav`: Magic sparkle whoosh; magic skills, healing, barriers, focus.
  Download: https://assets.mixkit.co/active_storage/sfx/2350/2350.wav
- `mixkit-fantasy-success-270.wav`: Fantasy game success notification; combat victory.
  Download: https://assets.mixkit.co/active_storage/sfx/270/270.wav
- `mixkit-game-over-213.wav`: Arcade retro game over; defeat.
  Download: https://assets.mixkit.co/active_storage/sfx/213/213.wav

Music and SFX volumes are independent, persist locally, and can each be set to
zero. Effects have a maximum of eight overlapping voices. Leaving a run or
hiding the page cancels active effects and pending effect timers. Disabled
buttons produce no menu sound. Audio playback failures do not interrupt gameplay.
