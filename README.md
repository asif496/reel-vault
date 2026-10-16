# 🎬 ReelVault — Personal Reel & Shorts Hub

A modern, high-performance web application built with **HTML5, Vanilla CSS, TypeScript, and Vite** that curates your collection of 320+ Instagram Reels, Facebook Reels, and YouTube Shorts into an interactive 4-column side-by-side feed.

---

## ✨ Features

- **📺 4-Column Side-by-Side Layout (Default)**: View all reels in 4 columns side by side, exactly as requested. Includes quick layout toggles (2, 3, 4, or 5 columns).
- **▶️ Hover-to-Play**: Moving your mouse cursor over any reel instantly activates the player preview with real-time audio and playback.
- **🔍 Click-to-Play & Cinema View**: Clicking any reel expands it into an immersive Cinema Modal with high-resolution playback, looping, and navigation (Next/Previous reel via Left/Right arrow keys or buttons).
- **🔗 Direct Source Access**: Every card features an instant link button to jump directly to the original Instagram, Facebook, or YouTube URL in a new tab.
- **🏷️ Instant Platform Filtering**:
  - **All Reels** (322 items)
  - **Instagram Reels** (📸)
  - **Facebook Reels & Videos** (📘)
  - **YouTube Shorts** (🔴)
  - **Favorites** (💖 Saved to `localStorage`)
- **🔎 Real-Time Search**: Filter on the fly by Reel ID, keyword, date, or URL.
- **➕ Add Custom Reel**: Easily paste any new reel link from Instagram, Facebook, or YouTube to save it to your local collection.
- **🎲 Random Reel Shuffle**: Jump to a surprise reel from your collection anytime.
- **🔄 Instant Replay (Bypasses "Watch on Instagram")**:
  - Click the **Replay (↺)** button on any card or inside the Cinema Modal to restart the reel from 0:00 without being stuck on Instagram's "Watch again on Instagram" screen.
  - Press **`R`** on your keyboard to instantly replay the active reel.
- **🔊 YouTube-Style Volume System**:
  - Full volume control bar (speaker mute toggle + horizontal slider + percentage display).
  - Available in both the **Sticky Header** (Master Volume) and inside the **Cinema Modal Player**.
  - Default volume is set to a comfortable **40%** instead of blasting at 100%.
  - Volume is remembered across visits via `localStorage`.
  - Floating on-screen **Volume HUD** popup providing instant visual feedback.
  - Supports keyboard volume up (`↑`), volume down (`↓`), and mute (`M`).
  - *Note on Audio*: YouTube Shorts support external 0–100% volume control via the YouTube API. Instagram & Facebook embeds restrict external JavaScript volume sliders due to Meta's cross-origin security rules; for Meta reels, use the built-in speaker toggle on the Instagram video player or click **Replay (R)** to restart with sound.
- **⚡ Ultra-Fast 60fps Performance**: Smart lazy-loading & IntersectionObserver architecture ensures instant loading without freezing your browser.

---

## 🚀 How to Run Locally

### 1. Start the Dev Server
From this project directory (`AntiGravity Projects`), run:
```bash
npm run dev
```

Then open your browser to:
```
http://localhost:5173/
```

### 2. Build for Production (Optional)
```bash
npm run build
npm run preview
```

---

## ⌨️ Keyboard Shortcuts
- `R` / `r`: Instant Replay active reel from 0:00
- `Arrow Up (↑)`: Increase volume by 5%
- `Arrow Down (↓)`: Decrease volume by 5%
- `M` / `m`: Toggle Mute / Unmute
- `Left Arrow (←)` / `Right Arrow (→)`: Previous / Next reel in Cinema View
- `Escape (Esc)`: Close Cinema Modal
- `Click on Card`: Open Cinema View
- `Hover over Card`: Live player preview
