# 🌹 Eternal Red Bloom — Romantic Glowing Flower Animation

<div align="center">

[![Netlify Status](https://img.shields.io/badge/Live_Demo-red--bloom.netlify.app-FF0C46?style=for-the-badge&logo=netlify&logoColor=white)](https://red-bloom.netlify.app/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web_Audio_API-FF0C46?style=for-the-badge&logo=web&logoColor=white)
![Canvas API](https://img.shields.io/badge/Canvas_API-4A0013?style=for-the-badge&logo=html5&logoColor=white)

> *A breathtaking, fully animated red rose garden with glowing petals, floating hearts, romantic ambient music, and a love letter — built with pure HTML, CSS, and JavaScript.*

</div>

---

## ✨ Live Preview

🔴 **[https://red-bloom.netlify.app/](https://red-bloom.netlify.app/)** — Deployed live on Netlify

> Open `index.html` directly in any modern browser — **no build tools, no dependencies, no installation required.**

---

## 📸 Features at a Glance

| Feature | Description |
|---|---|
| 🌹 **Glowing Red Rose Garden** | 12 animated roses bloom with staggered timing |
| 💖 **Floating Hearts Canvas** | HTML5 Canvas renders rising red hearts in real-time |
| 🖱️ **Click-to-Burst Interaction** | Click anywhere on screen to explode a burst of hearts |
| 🎵 **Romantic Music Synthesizer** | Web Audio API generates ambient chord progressions |
| 💌 **Love Letter Modal** | Glassmorphic modal with a live typewriter effect |
| 🌙 **Deep Velvet Background** | Rich radial crimson-to-black atmospheric gradient |
| ✨ **Ambient Pulsing Glow** | Slow breathing radial overlay animation |
| 📱 **Fully Responsive** | Adapts beautifully to all screen sizes |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--primary-red` | `#ff0c46` | Main petal glow & light particles |
| `--bright-rose` | `#ff4d79` | Hover states, borders |
| `--deep-ruby` | `#990026` | Foliage, leaves |
| `--dark-crimson` | `#4a0013` | Stem shadows, deep tones |
| `--glow-red` | `rgba(255,12,70,0.85)` | Drop shadows on flowers |

### Typography

| Font | Usage |
|---|---|
| [Cinzel Decorative](https://fonts.google.com/specimen/Cinzel+Decorative) | Page title & modal heading |
| [Great Vibes](https://fonts.google.com/specimen/Great+Vibes) | Romantic subtitle & love letter text |
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Buttons and UI labels |

---

## 🗂️ Project Structure

```
glowing-flower-main/
│
├── index.html          # HTML structure — layout, modals, controls
├── style.css           # Full design system — animations, glassmorphism, responsive
└── script.js           # Canvas engine, audio synth, flower blooming logic
```

---

## 🚀 Getting Started

### Option 1 — Open Directly (Recommended)

```bash
# Clone or download the repository
git clone https://github.com/your-username/glowing-flower.git

# Open in browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2 — Serve Locally

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then visit **http://localhost:3000** in your browser.

---

## 🎮 Controls & Interactions

| Control | Action |
|---|---|
| **Page Load** | Flowers bloom one by one with staggered animation |
| **Click anywhere** | Burst of glowing red hearts at cursor position |
| **🎵 Play Music** *(bottom right)* | Toggles romantic ambient music synthesizer |
| **💌 Love Letter** *(top right)* | Opens a glassmorphic modal with typewriter effect |
| **💖 Send Love** *(top right)* | Triggers a large heart burst at the center |
| **Send Extra Hearts** *(in modal)* | Bursts more hearts from within the love letter |

---

## 🔧 Technical Deep Dive

### 🌸 Flower Blooming Engine (`script.js`)

The 12 flower containers are populated with petal, stem, leaf, and light particle elements via JavaScript. Blooming is triggered by adding the `.animate` class with staggered `setTimeout` / `setInterval`:

```js
flowers[0].classList.add('animate'); // First flower blooms immediately
setTimeout(() => {
    // Flowers 2 & 3 bloom at 2.5s
    // Remaining flowers bloom at 400ms random intervals
}, 2500);
```

### 💖 Canvas Heart System (`script.js`)

A `HeartParticle` class draws bezier-curve hearts on an HTML5 Canvas. Each particle supports:
- **Ambient mode** — continuously floats upward and respawns
- **Burst mode** — explodes outward from a point and fades out

```js
class HeartParticle {
    constructor(x, y, isBurst = false) { ... }
    update() { ... } // Physics: position, wobble, fade
    draw()   { ... } // Bezier-curve heart shape
}
```

### 🎵 Web Audio API Synthesizer (`script.js`)

Generates romantic chord progressions using oscillators — no external audio files needed:

```js
const chordProgressions = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 261.63, 329.63, 440.00], // Fmaj7
    [196.00, 293.66, 349.23, 440.00]  // G7sus4
];
```

Each note uses a `sine` or `triangle` oscillator with a smooth envelope (attack + exponential decay).

### 🎨 CSS Animation Architecture (`style.css`)

All animations use pure CSS keyframes — no libraries:

| Keyframe | Effect |
|---|---|
| `petal-grow` | Scale + opacity bloom for each petal |
| `grass-grow` | Leaves & grass grow from 0 to full scale |
| `stem-grow` | Stem extends from soil upward |
| `flower-rotate` | Gentle swaying in the breeze |
| `light-float` | Glowing particles float and fade upward |
| `shrink` | Camera zooms out from 2× to 1× after bloom |
| `ambient-pulse` | Breathing glow overlay |
| `heartbeat` | Modal rose icon pulsing |

---

## 🌐 Browser Compatibility

| Browser | Support |
|---|---|
| Chrome 105+ | ✅ Full |
| Firefox 110+ | ✅ Full |
| Safari 16+ | ✅ Full |
| Edge 105+ | ✅ Full |
| Opera 91+ | ✅ Full |

> Requires support for CSS Container Queries (`cqi` units), `backdrop-filter`, and Web Audio API.

---

## 🛠️ Customization Guide

### Change Petal Color

In `style.css`, update the petal gradient:

```css
.flower-petal {
    background-image: linear-gradient(135deg, #your-color-1 0%, #your-color-2 45%, #your-color-3 100%);
}
```

### Change Number of Flowers

In `index.html`, add or remove `<div class="flower-container"></div>` elements inside `.ground`, then extend the positioning rules in `style.css`.

### Edit the Love Letter

In `script.js`, change the `message` constant:

```js
const message = `"Your romantic message here..."`;
```

### Adjust Bloom Speed

In `script.js`, change the interval delay (default `400`ms):

```js
const interval = setInterval(() => { ... }, 400); // Lower = faster
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Fonts by [Google Fonts](https://fonts.google.com/)
- Animation inspiration from CSS artistry communities
- Web Audio API docs from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

<div align="center">

Made with ❤️ and pure CSS magic

*"Like a rose blooming under crimson stars, may this bring warmth to whoever sees it."*

</div>
