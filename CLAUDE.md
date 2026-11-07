# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Project

No build tools or dependencies — open `index.html` directly in any modern browser:

```bash
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or serve locally for features that require a server context:

```bash
python -m http.server 3000
# or
npx serve .
```

## Architecture Overview

Three-file vanilla web app — no frameworks, no bundler, no package manager:

- **`index.html`** — Static shell. Declares 12 empty `.flower-container` divs (populated by JS), the canvas element, control buttons, and the love letter modal.
- **`style.css`** — All visual design: CSS custom properties for the color palette (`--primary-red`, `--bright-rose`, `--deep-ruby`, `--dark-crimson`), keyframe animations (`petal-grow`, `stem-grow`, `grass-grow`, `flower-rotate`, `light-float`, `shrink`, `ambient-pulse`, `heartbeat`), glassmorphism modal, and responsive layout via CSS Container Queries (`cqi` units).
- **`script.js`** — Three independent systems wired together:
  1. **Flower blooming engine** — Injects petal/stem/leaf/light HTML into each `.flower-container`, then staggers `.animate` class additions to trigger CSS animations.
  2. **Canvas heart system** — `HeartParticle` class renders bezier-curve hearts on `#hearts-canvas`. Particles run in two modes: ambient (continuous float-and-respawn) and burst (explode from a point, then fade out and are removed from the array).
  3. **Web Audio synthesizer** — Creates oscillators on demand from `chordProgressions` frequency arrays; no audio files. `AudioContext` is lazily initialized on first user interaction to comply with autoplay policy.

## Key Customization Points

- **Love letter text** — `message` constant in `script.js:250`
- **Bloom speed** — `setInterval` delay in `script.js:50` (default 400ms)
- **Flower count** — number of `.flower-container` divs in `index.html:50–61`; add matching position rules in `style.css`
- **Petal color** — `.flower-petal` gradient in `style.css`

## Browser Requirements

Requires `backdrop-filter`, CSS Container Queries (`cqi`), and Web Audio API — Chrome 105+, Firefox 110+, Safari 16+.
