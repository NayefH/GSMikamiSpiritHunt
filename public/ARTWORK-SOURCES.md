# Character and enemy artwork

The three playable heroes use dynamic cutouts based on the official GS Mikami
anniversary key art, edited on 2026-10-09 with the built-in image generation
tool. The original source is retained at `anime-backgrounds/anniversary-key-art.jpg`.
These are AI-edited versions of actual promotional artwork, not pixel-exact
manual extractions. The editing brief preserved the source poses, faces and
colors while removing other characters, backgrounds and effects. Occluded
characters use torso crops rather than newly invented full-body poses.

Source publication: https://www.fwinc.co.jp/news/79772/
Additional source: https://prtimes.jp/main/html/rd/p/000004039.000016756.html

## Heroes

- Reiko Mikami (active): `characters/reiko-action.png`
  Edit brief: extract foreground Reiko with flowing hair, raised knee and staff;
  remove water, ghosts and effects; preserve source pose and colors.
  Previous static cutout: `characters/reiko-original.png`
  Source image: https://www.toei-anim.co.jp/tv/gs_mikami/character/img/picture-1.gif
- Tadao Yokoshima (active): `characters/yokoshima-action.png`
  Edit brief: extract running torso, backpack and bedroll; preserve expression
  and source colors; remove background and translucent halos.
  Previous static cutout: `characters/yokoshima-original.png`
  Source image: https://www.toei-anim.co.jp/tv/gs_mikami/character/img/picture-2.gif
- Okinu (active): `characters/okinu-action.png`
  Edit brief: extract flowing sleeves and hair with a waist-length crop;
  remove other characters and effects; preserve source expression and colors.
  Previous static cutout: `characters/okinu-original.png`
  Source image: https://www.toei-anim.co.jp/tv/gs_mikami/character/img/picture-3.gif

Official Toei source page:
https://www.toei-anim.co.jp/tv/gs_mikami/character/index.html

Downloaded originals are retained as `characters/*-anime.gif`. Run
`scripts/prepare-original-characters.ps1` to reproduce the transparent PNG crops.
The previous generated `characters/*-cel.png` images are retained but unused by
the playable roster.

## Battle-only hero artwork

The battle screen alone uses `characters/reiko-battle.png`,
`characters/yokoshima-battle.png` and `characters/okinu-battle.png`.
Selection, map and ending portraits retain the existing `*-action.png` files.

Source: official anime still published at https://www.fwinc.co.jp/news/79772/
and https://prtimes.jp/main/html/rd/p/000004039.000016756.html,
retained at `anime-backgrounds/night-battle.jpg`.

Edited with the built-in image generation tool on 2026-10-09. Prompts requested
transparent character extraction with original expressions, colors and dynamic
poses, removing the street, monster, lamp pole and other characters. Reiko uses
her attacking torso and baton; Yokoshima uses his flailing reaction; Okinu uses
her angled floating pose with raised arms. These are AI-edited source images;
occluded contours may have been reconstructed. They are mirrored in the battle
layout to face the enemy. No new artwork is used by other screens.

## Enemy artwork

Enemy illustrations remain AI-generated interpretations in a cel-animation style.

- Count Bloodeau: `enemies/bloodeau-cel.png`
  Reference: https://gs-mikami.fandom.com/wiki/Count_Bloodeau
- Medusa: `enemies/medusa-cel.png`
  Reference: https://gs-mikami.fandom.com/wiki/Medusa
- Nosferatu: `enemies/nosferatu-cel.png`
  Reference: https://gs-mikami.fandom.com/wiki/Nosferatu
- Ashtaroth: `enemies/ashtaroth-cel.png`
  Reference: https://gs-mikami.fandom.com/wiki/Ashtaroth

Enemy source images could not be downloaded due to access restrictions. Enemy
illustrations were generated from named-character descriptions, without image
references; exact fidelity to the original designs is not verified. Ashtaroth is
adapted from the manga into the same colored cel-animation visual direction.

Existing anime logos and background art keep their previous sources, listed in
`src/game/assets.ts`. Source links document provenance and design references;
they do not constitute permission or licenses for the original series artwork.

## Item illustrations

The active reward cards use AI-generated transparent cel-anime illustrations,
created on 2026-10-09 with the built-in image generation tool. The Reiko character
asset was used as a style reference: dark ink outlines, flat saturated colors
and hard-edged cel shading. No Japanese writing appears on the items.

- Blood Moon Seal: `items/blood-moon-seal-cel.png` — parchment talisman with crescent wax seal.
- Restorative Tea: `items/restorative-tea-cel.png` — indigo cup of amber herbal tea.
- Soul Crystal: `items/soul-crystal-cel.png` — aqua crystal cluster.

The previous photographs are retained as unused source assets.
