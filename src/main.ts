import './style.css';
import rawReelsData from './reelsData.json';
import type { ReelItem, FilterCategory, ColumnCount } from './types';

// State
let allReels: ReelItem[] = [];
let filteredReels: ReelItem[] = [];
let activeFilter: FilterCategory = 'all';
let searchQuery: string = '';
let currentColumns: ColumnCount = 4; // User requested 4 columns default
let cinemaCurrentIndex: number | null = null;
let displayedCount = 28; // Lazy batch rendering for high performance
const BATCH_SIZE = 24;

// Volume State (YouTube UI System)
const STORAGE_VOLUME = 'reelstream_master_volume_v1';
const STORAGE_MUTED = 'reelstream_is_muted_v1';

let masterVolume: number = parseInt(localStorage.getItem(STORAGE_VOLUME) || '40', 10);
let isMuted: boolean = localStorage.getItem(STORAGE_MUTED) === 'true';
let previousVolume: number = masterVolume || 40;
let hudTimeout: any = null;

// Storage keys
const STORAGE_FAVORITES = 'reelstream_favorites_v1';
const STORAGE_CUSTOM_REELS = 'reelstream_custom_reels_v1';

// Load saved favorites & custom reels
function loadStoredData() {
  const favorites: string[] = JSON.parse(localStorage.getItem(STORAGE_FAVORITES) || '[]');
  const customReels: ReelItem[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_REELS) || '[]');

  const favoriteSet = new Set(favorites);

  allReels = [...customReels, ...(rawReelsData as ReelItem[])].map((reel) => ({
    ...reel,
    isFavorite: favoriteSet.has(reel.id),
  }));
}

function saveFavorites() {
  const favoriteIds = allReels.filter((r) => r.isFavorite).map((r) => r.id);
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(favoriteIds));
}

function saveCustomReels() {
  const custom = allReels.filter((r) => r.id.startsWith('custom-'));
  localStorage.setItem(STORAGE_CUSTOM_REELS, JSON.stringify(custom));
}

// Icons (Inline SVG for instant crisp rendering)
const icons = {
  instagram: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  facebook: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  youtube: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  play: `<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  external: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  heart: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  heartOutline: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  shuffle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  chevronLeft: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  chevronRight: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  arrowUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  sparkles: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
  // YouTube Style Volume Icons
  volumeHigh: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeLow: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  volumeMute: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
  replay: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
};

// Helper to get active volume icon
function getVolumeIcon(vol: number, muted: boolean): string {
  if (muted || vol === 0) return icons.volumeMute;
  if (vol > 50) return icons.volumeHigh;
  return icons.volumeLow;
}

// Toast notification helper
function showToast(message: string) {
  let toast = document.querySelector<HTMLDivElement>('#toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-message';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${icons.sparkles} <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast?.classList.remove('show');
  }, 2400);
}

// YouTube-Style Volume HUD Feedback Overlay
function showVolumeHud(vol: number, muted: boolean) {
  let hud = document.querySelector<HTMLDivElement>('#volume-hud');
  if (!hud) {
    hud = document.createElement('div');
    hud.id = 'volume-hud';
    hud.className = 'volume-hud';
    document.body.appendChild(hud);
  }
  const effective = muted ? 0 : vol;
  const icon = getVolumeIcon(vol, muted);
  hud.innerHTML = `
    <span>${icon}</span>
    <div class="volume-hud-bar">
      <div class="volume-hud-fill" style="width: ${effective}%;"></div>
    </div>
    <span class="volume-hud-text">${muted ? 'Muted' : `${effective}%`}</span>
  `;
  hud.classList.add('visible');
  clearTimeout(hudTimeout);
  hudTimeout = setTimeout(() => {
    hud?.classList.remove('visible');
  }, 1200);
}

// Set Master Volume & Sync
function setMasterVolume(val: number, showHud = true) {
  val = Math.max(0, Math.min(100, Math.round(val)));
  if (val === 0) {
    isMuted = true;
  } else {
    isMuted = false;
    masterVolume = val;
    previousVolume = val;
  }

  localStorage.setItem(STORAGE_VOLUME, masterVolume.toString());
  localStorage.setItem(STORAGE_MUTED, isMuted ? 'true' : 'false');

  syncVolumeUI();
  broadcastVolumeToPlayers();

  if (showHud) {
    showVolumeHud(masterVolume, isMuted);
  }
}

// Toggle Mute / Unmute
function toggleMute() {
  if (isMuted) {
    isMuted = false;
    setMasterVolume(previousVolume || 40);
  } else {
    previousVolume = masterVolume || 40;
    isMuted = true;
    localStorage.setItem(STORAGE_MUTED, 'true');
    syncVolumeUI();
    broadcastVolumeToPlayers();
    showVolumeHud(masterVolume, true);
  }
}

// Sync UI Elements (Header slider, Modal slider, Values, Icons)
function syncVolumeUI() {
  const effective = isMuted ? 0 : masterVolume;
  const icon = getVolumeIcon(masterVolume, isMuted);

  // Update header volume
  const headerSlider = document.querySelector<HTMLInputElement>('#header-vol-slider');
  const headerVal = document.querySelector<HTMLSpanElement>('#header-vol-value');
  const headerBtn = document.querySelector<HTMLButtonElement>('#header-vol-btn');

  if (headerSlider) {
    headerSlider.value = effective.toString();
    headerSlider.style.background = `linear-gradient(to right, #ffffff ${effective}%, rgba(255, 255, 255, 0.2) ${effective}%)`;
  }
  if (headerVal) headerVal.textContent = isMuted ? 'Mute' : `${effective}%`;
  if (headerBtn) headerBtn.innerHTML = icon;

  // Update modal volume
  const modalSlider = document.querySelector<HTMLInputElement>('#modal-vol-slider');
  const modalVal = document.querySelector<HTMLSpanElement>('#modal-vol-value');
  const modalBtn = document.querySelector<HTMLButtonElement>('#modal-vol-btn');

  if (modalSlider) {
    modalSlider.value = effective.toString();
    modalSlider.style.background = `linear-gradient(to right, #ffffff ${effective}%, rgba(255, 255, 255, 0.2) ${effective}%)`;
  }
  if (modalVal) modalVal.textContent = isMuted ? 'Mute' : `${effective}%`;
  if (modalBtn) modalBtn.innerHTML = icon;

  // Update stats banner volume indicator (keeps 100% in sync)
  const statsVolText = document.querySelector('#stats-vol-text');
  const statsVolIcon = document.querySelector('#stats-vol-icon');
  if (statsVolText) statsVolText.textContent = isMuted ? 'Muted' : `${effective}%`;
  if (statsVolIcon) statsVolIcon.innerHTML = icon;
}

// Send volume message to all active YouTube frames
function broadcastVolumeToPlayers() {
  const effective = isMuted ? 0 : masterVolume;
  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe');
  iframes.forEach((iframe) => {
    if (iframe.contentWindow) {
      if (isMuted) {
        iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${effective}]}`, '*');
      }
    }
  });
}

// Initial App Shell Rendering
function renderAppShell() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  app.innerHTML = `
    <!-- Sticky Glass Header -->
    <header class="app-header">
      <div class="header-inner">
        <div class="brand-section">
          <div class="brand-logo">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <div>
            <h1 class="brand-title">
              ReelStream
              <span class="brand-badge">4-Col Hub</span>
            </h1>
            <p class="brand-subtitle">Interactive Reels & Shorts Archive</p>
          </div>
        </div>

        <div class="search-container">
          <span class="search-icon">${icons.search}</span>
          <input 
            type="text" 
            id="search-input" 
            class="search-input" 
            placeholder="Search reels by ID, caption, or URL..." 
            value="${searchQuery}"
          />
        </div>

        <!-- YouTube Style Master Volume Control in Header -->
        <div class="yt-volume-control" title="YouTube Volume System (Up/Down Arrow keys)">
          <button id="header-vol-btn" class="yt-vol-btn" title="Toggle Mute (M)">
            ${getVolumeIcon(masterVolume, isMuted)}
          </button>
          <div class="yt-vol-slider-container">
            <input 
              type="range" 
              id="header-vol-slider" 
              class="yt-vol-slider" 
              min="0" 
              max="100" 
              value="${isMuted ? 0 : masterVolume}" 
              title="Master Volume Bar"
            />
          </div>
          <span id="header-vol-value" class="yt-vol-value">${isMuted ? 'Mute' : `${masterVolume}%`}</span>
        </div>

        <div class="header-actions">
          <button id="btn-random" class="btn btn-random" title="Play a random reel">
            ${icons.shuffle}
            <span>Random Reel</span>
          </button>
          <button id="btn-add-reel" class="btn btn-primary" title="Add a custom reel URL">
            ${icons.plus}
            <span>Add Reel</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Toolbar: Filters & Column Selector -->
    <section class="toolbar-section">
      <div class="filter-tabs" id="filter-tabs">
        <button class="filter-tab ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
          <span>All Reels</span>
          <span class="badge" id="count-all">0</span>
        </button>
        <button class="filter-tab ${activeFilter === 'instagram' ? 'active' : ''}" data-filter="instagram">
          ${icons.instagram}
          <span>Instagram</span>
          <span class="badge" id="count-ig">0</span>
        </button>
        <button class="filter-tab ${activeFilter === 'facebook' ? 'active' : ''}" data-filter="facebook">
          ${icons.facebook}
          <span>Facebook</span>
          <span class="badge" id="count-fb">0</span>
        </button>
        <button class="filter-tab ${activeFilter === 'youtube' ? 'active' : ''}" data-filter="youtube">
          ${icons.youtube}
          <span>YouTube</span>
          <span class="badge" id="count-yt">0</span>
        </button>
        <button class="filter-tab ${activeFilter === 'favorites' ? 'active' : ''}" data-filter="favorites">
          ${icons.heart}
          <span>Favorites</span>
          <span class="badge" id="count-fav">0</span>
        </button>
      </div>

      <div class="toolbar-right">
        <div class="column-selector">
          <span class="column-label">Grid View</span>
          <button class="col-btn ${currentColumns === 2 ? 'active' : ''}" data-cols="2">2</button>
          <button class="col-btn ${currentColumns === 3 ? 'active' : ''}" data-cols="3">3</button>
          <button class="col-btn ${currentColumns === 4 ? 'active' : ''}" data-cols="4" title="4 Columns (Default)">4 Cols</button>
          <button class="col-btn ${currentColumns === 5 ? 'active' : ''}" data-cols="5">5</button>
        </div>
      </div>
    </section>

    <!-- Main Content Area -->
    <main class="main-content">
      <div class="stats-banner">
        <div>
          Showing <span class="stats-count" id="visible-count">0</span> of 
          <span class="stats-count" id="total-count">0</span> reels
        </div>
        <div class="stats-hint" id="stats-vol-hint" style="cursor: pointer;" title="Click to toggle mute or adjust with volume bar">
          <span id="stats-vol-icon">${getVolumeIcon(masterVolume, isMuted)}</span>
          <span>Volume: <strong id="stats-vol-text">${isMuted ? 'Muted' : `${masterVolume}%`}</strong> • Use ↑/↓ or Volume Bar</span>
        </div>
      </div>

      <!-- 4-Column Grid -->
      <div id="reels-grid" class="reels-grid cols-${currentColumns}"></div>

      <!-- Infinite scroll trigger anchor -->
      <div id="scroll-anchor" style="height: 40px; margin-top: 2rem;"></div>
    </main>

    <!-- Cinema Modal -->
    <div id="cinema-modal" class="modal-overlay">
      <button class="modal-nav-btn prev" id="modal-prev" title="Previous Reel (Left Arrow)">
        ${icons.chevronLeft}
      </button>
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title-box">
            <h2 class="modal-title" id="modal-title">Reel Player</h2>
            <span class="modal-subtitle" id="modal-subtitle"></span>
            <div id="modal-info-note"></div>
          </div>
          <button class="icon-btn" id="modal-close" title="Close (Esc)">
            ${icons.close}
          </button>
        </div>
        <div class="modal-body" id="modal-player-body"></div>
        <div class="modal-footer">
          <!-- Replay Button in Modal (Bypasses "Watch on Instagram") -->
          <button class="btn btn-replay" id="modal-replay-btn" title="Replay Reel from Start (Press R)">
            ${icons.replay}
            <span>Replay (R)</span>
          </button>

          <!-- YouTube Style Volume Control in Cinema Modal -->
          <div class="yt-volume-control modal-volume-box" title="Cinema Volume (Up/Down Arrow keys)">
            <button id="modal-vol-btn" class="yt-vol-btn" title="Toggle Mute (M)">
              ${getVolumeIcon(masterVolume, isMuted)}
            </button>
            <div class="yt-vol-slider-container">
              <input 
                type="range" 
                id="modal-vol-slider" 
                class="yt-vol-slider" 
                min="0" 
                max="100" 
                value="${isMuted ? 0 : masterVolume}" 
                title="Volume Bar"
              />
            </div>
            <span id="modal-vol-value" class="yt-vol-value">${isMuted ? 'Mute' : `${masterVolume}%`}</span>
          </div>

          <button class="btn" id="modal-copy-link">
            ${icons.copy}
            <span>Copy Link</span>
          </button>
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="modal-external-link">
            ${icons.external}
            <span>Open on Source</span>
          </a>
        </div>
      </div>
      <button class="modal-nav-btn next" id="modal-next" title="Next Reel (Right Arrow)">
        ${icons.chevronRight}
      </button>
    </div>

    <!-- Add Reel Modal -->
    <div id="add-modal" class="modal-overlay">
      <div class="modal-content add-modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Add New Reel or Short</h2>
          <button class="icon-btn" id="add-modal-close">${icons.close}</button>
        </div>
        <form id="add-reel-form">
          <div class="form-group">
            <label class="form-label" for="reel-url-input">Reel / Video URL</label>
            <input 
              type="url" 
              id="reel-url-input" 
              class="form-input" 
              placeholder="https://www.instagram.com/reel/... or Facebook or YouTube" 
              required 
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="reel-caption-input">Custom Note or Title (Optional)</label>
            <input 
              type="text" 
              id="reel-caption-input" 
              class="form-input" 
              placeholder="e.g. AI Prompting Tips" 
            />
          </div>
          <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" class="btn" id="add-modal-cancel">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Reel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Floating Back to Top Button -->
    <button class="fab-top" id="fab-top" title="Scroll to Top">
      ${icons.arrowUp}
    </button>
  `;

  setupEventListeners();
  syncVolumeUI();
}

// Filter and Search calculation
function updateFilteredList() {
  const query = searchQuery.trim().toLowerCase();

  filteredReels = allReels.filter((reel) => {
    // Category match
    if (activeFilter === 'instagram' && reel.platform !== 'instagram') return false;
    if (activeFilter === 'facebook' && reel.platform !== 'facebook') return false;
    if (activeFilter === 'youtube' && reel.platform !== 'youtube') return false;
    if (activeFilter === 'favorites' && !reel.isFavorite) return false;

    // Search match
    if (query) {
      const matchUrl = reel.originalUrl.toLowerCase().includes(query);
      const matchCode = reel.code.toLowerCase().includes(query);
      const matchTitle = reel.title.toLowerCase().includes(query);
      const matchCaption = (reel.caption || '').toLowerCase().includes(query);
      const matchDate = (reel.date || '').toLowerCase().includes(query);
      return matchUrl || matchCode || matchTitle || matchCaption || matchDate;
    }

    return true;
  });

  updateBadges();
  displayedCount = 28; // reset render window
  renderReelsGrid();
}

// Update counters in tabs
function updateBadges() {
  const countAll = document.querySelector('#count-all');
  const countIg = document.querySelector('#count-ig');
  const countFb = document.querySelector('#count-fb');
  const countYt = document.querySelector('#count-yt');
  const countFav = document.querySelector('#count-fav');
  const visibleCount = document.querySelector('#visible-count');
  const totalCount = document.querySelector('#total-count');
  const statsVolText = document.querySelector('#stats-vol-text');

  if (countAll) countAll.textContent = allReels.length.toString();
  if (countIg) countIg.textContent = allReels.filter((r) => r.platform === 'instagram').length.toString();
  if (countFb) countFb.textContent = allReels.filter((r) => r.platform === 'facebook').length.toString();
  if (countYt) countYt.textContent = allReels.filter((r) => r.platform === 'youtube').length.toString();
  if (countFav) countFav.textContent = allReels.filter((r) => r.isFavorite).length.toString();

  if (visibleCount) visibleCount.textContent = Math.min(displayedCount, filteredReels.length).toString();
  if (totalCount) totalCount.textContent = filteredReels.length.toString();
  if (statsVolText) statsVolText.textContent = isMuted ? 'Muted' : `${masterVolume}%`;
}

// Generate Card HTML
function createCardHTML(reel: ReelItem, index: number): string {
  const platformIcon = icons[reel.platform] || icons.instagram;
  const platformName = reel.platform === 'instagram' ? 'Instagram' : reel.platform === 'facebook' ? 'Facebook' : 'YouTube';

  return `
    <article class="reel-card" id="card-${reel.id}" data-id="${reel.id}" data-index="${index}">
      <!-- Card Top Info -->
      <div class="reel-card-header">
        <span class="platform-badge ${reel.platform}">
          ${platformIcon}
          <span>${platformName}</span>
        </span>
        <div class="reel-actions">
          <button class="icon-btn replay-action" title="Replay Reel from Start" data-action="replay" data-id="${reel.id}">
            ${icons.replay}
          </button>
          <button class="icon-btn favorite ${reel.isFavorite ? 'active' : ''}" title="Favorite" data-action="favorite" data-id="${reel.id}">
            ${reel.isFavorite ? icons.heart : icons.heartOutline}
          </button>
          <button class="icon-btn" title="Copy Link" data-action="copy" data-url="${reel.originalUrl}">
            ${icons.copy}
          </button>
          <a href="${reel.originalUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn external-link" title="Open in ${platformName}">
            ${icons.external}
          </a>
        </div>
      </div>

      <!-- Video Presentation Stage -->
      <div class="reel-stage" data-action="play-modal" data-index="${index}">
        <!-- Poster / Idle View -->
        <div class="reel-poster" id="poster-${reel.id}">
          <div class="poster-platform-glow ${reel.platform}">
            <span class="play-pulse-icon">${icons.play}</span>
          </div>
          <h3 class="poster-title">${reel.title}</h3>
          <div class="poster-hint">
            <span>Hover to preview • Click to expand</span>
          </div>
        </div>

        <!-- Video Frame Mount Point (Populated on Hover or Click) -->
        <div class="reel-iframe-wrapper" id="player-mount-${reel.id}" style="display: none;"></div>

        <!-- Quick Action Bar on Card Hover -->
        <div class="reel-quick-actions" onclick="event.stopPropagation()">
          <button class="quick-action-btn replay-action" data-action="replay" data-id="${reel.id}" title="Replay from start">
            ${icons.replay}
            <span>Replay</span>
          </button>
          <button class="quick-action-btn" data-action="play-modal" data-index="${index}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Cinema</span>
          </button>
          <a href="${reel.originalUrl}" target="_blank" rel="noopener noreferrer" class="quick-action-btn open-source">
            ${icons.external}
            <span>Open</span>
          </a>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="reel-card-footer">
        ${reel.caption ? `<p class="reel-caption" title="${reel.caption}">${reel.caption}</p>` : ''}
        <div class="reel-meta-row">
          <span class="reel-date">${reel.date ? `📅 ${reel.date}` : `ID: ${reel.code}`}</span>
          <span class="reel-index-pill">#${index + 1}</span>
        </div>
      </div>
    </article>
  `;
}

// Render the Reels Grid
function renderReelsGrid() {
  const grid = document.querySelector<HTMLDivElement>('#reels-grid');
  if (!grid) return;

  if (filteredReels.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/>
          </svg>
        </div>
        <h3 class="empty-title">No Reels Found</h3>
        <p class="empty-desc">No reels match your current filter or search query. Try clearing your search.</p>
        <button class="btn btn-primary" id="btn-reset-filters">Show All Reels</button>
      </div>
    `;
    const resetBtn = document.querySelector('#btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeFilter = 'all';
        searchQuery = '';
        const searchInput = document.querySelector<HTMLInputElement>('#search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
        document.querySelector('[data-filter="all"]')?.classList.add('active');
        updateFilteredList();
      });
    }
    return;
  }

  const itemsToRender = filteredReels.slice(0, displayedCount);
  grid.innerHTML = itemsToRender.map((reel, idx) => createCardHTML(reel, idx)).join('');

  attachCardHoverAndPlayHandlers();
  updateBadges();
}

// Attach hover-to-play & click-to-play listeners
function attachCardHoverAndPlayHandlers() {
  const cards = document.querySelectorAll<HTMLElement>('.reel-card');

  cards.forEach((card) => {
    const reelId = card.getAttribute('data-id');
    if (!reelId) return;

    const reel = allReels.find((r) => r.id === reelId);
    if (!reel) return;

    const stage = card.querySelector<HTMLElement>('.reel-stage');
    const poster = card.querySelector<HTMLElement>(`#poster-${reelId}`);
    const mount = card.querySelector<HTMLElement>(`#player-mount-${reelId}`);

    if (!stage || !poster || !mount) return;

    let hoverTimeout: any = null;

    // Hover to Play logic
    stage.addEventListener('mouseenter', () => {
      card.classList.add('active-playback');

      hoverTimeout = setTimeout(() => {
        const effectiveVol = isMuted ? 0 : masterVolume;
        const muteParam = isMuted ? 1 : 0;

        if (!mount.hasChildNodes()) {
          mount.style.display = 'block';
          poster.classList.add('hidden');

          if (reel.platform === 'youtube') {
            mount.innerHTML = `
              <iframe 
                class="reel-iframe" 
                src="${reel.embedUrl}&autoplay=1&mute=${muteParam}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            `;
            // Send volume level to newly created player
            setTimeout(() => {
              const iframe = mount.querySelector<HTMLIFrameElement>('iframe');
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${effectiveVol}]}`, '*');
                if (isMuted) {
                  iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                } else {
                  iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                }
              }
            }, 300);
          } else if (reel.platform === 'instagram') {
            mount.innerHTML = `
              <iframe 
                class="reel-iframe" 
                src="${reel.embedUrl}" 
                allowtransparency="true" 
                allowfullscreen="true" 
                frameborder="0" 
                scrolling="no">
              </iframe>
            `;
          } else if (reel.platform === 'facebook') {
            mount.innerHTML = `
              <iframe 
                class="reel-iframe" 
                src="${reel.embedUrl}&autoplay=true" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
              </iframe>
            `;
          }
        } else {
          mount.style.display = 'block';
          poster.classList.add('hidden');
          // If youtube, send play & volume postMessage
          const iframe = mount.querySelector<HTMLIFrameElement>('iframe');
          if (iframe && iframe.contentWindow && reel.platform === 'youtube') {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${effectiveVol}]}`, '*');
            if (isMuted) {
              iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
            } else {
              iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }
          }
        }
      }, 150);
    });

    stage.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      card.classList.remove('active-playback');

      // If youtube, pause video on mouseleave
      if (reel.platform === 'youtube') {
        const iframe = mount.querySelector<HTMLIFrameElement>('iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      }
    });
  });
}

// Cinema View Modal Logic
function openCinemaModal(index: number) {
  if (index < 0 || index >= filteredReels.length) return;
  cinemaCurrentIndex = index;
  const reel = filteredReels[index];

  const modal = document.querySelector<HTMLDivElement>('#cinema-modal');
  const title = document.querySelector<HTMLHeadingElement>('#modal-title');
  const subtitle = document.querySelector<HTMLSpanElement>('#modal-subtitle');
  const body = document.querySelector<HTMLDivElement>('#modal-player-body');
  const externalLink = document.querySelector<HTMLAnchorElement>('#modal-external-link');
  const copyBtn = document.querySelector<HTMLButtonElement>('#modal-copy-link');

  if (!modal || !title || !subtitle || !body || !externalLink || !copyBtn) return;

  title.textContent = reel.title;
  subtitle.textContent = `${reel.platform.toUpperCase()} • Reel #${index + 1} of ${filteredReels.length} • ${reel.date || ''}`;

  externalLink.href = reel.originalUrl;
  externalLink.innerHTML = `${icons.external} <span>Open on ${reel.platform.toUpperCase()}</span>`;

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(reel.originalUrl);
    showToast('Link copied to clipboard!');
  };

  const effectiveVol = isMuted ? 0 : masterVolume;
  const muteParam = isMuted ? 1 : 0;

  // Modal platform info note (explains audio controls & replay)
  const infoNote = document.querySelector<HTMLDivElement>('#modal-info-note');
  if (infoNote) {
    if (reel.platform === 'instagram' || reel.platform === 'facebook') {
      infoNote.innerHTML = `
        <div style="margin-top: 6px; padding: 0.35rem 0.65rem; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 8px; font-size: 0.72rem; color: #cbd5e1; display: flex; align-items: center; gap: 0.4rem;">
          <span>💡 <strong>Tip:</strong> Tap <strong>Replay (R)</strong> to loop without 'Watch on Instagram'. Use the speaker icon on the player for Meta sound.</span>
        </div>
      `;
    } else {
      infoNote.innerHTML = '';
    }
  }

  // Embed player in modal with volume applied
  if (reel.platform === 'youtube') {
    const originParam = `&origin=${encodeURIComponent(window.location.origin)}`;
    body.innerHTML = `
      <iframe 
        class="modal-iframe" 
        src="${reel.embedUrl}&autoplay=1&mute=${muteParam}${originParam}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
    setTimeout(() => {
      const iframe = body.querySelector<HTMLIFrameElement>('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${effectiveVol}]}`, '*');
        if (isMuted) {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        }
      }
    }, 300);
  } else if (reel.platform === 'instagram') {
    body.innerHTML = `
      <iframe 
        class="modal-iframe" 
        src="${reel.embedUrl}" 
        allowtransparency="true" 
        allowfullscreen="true" 
        frameborder="0" 
        scrolling="no">
      </iframe>
    `;
  } else {
    body.innerHTML = `
      <iframe 
        class="modal-iframe" 
        src="${reel.embedUrl}&autoplay=true" 
        allowfullscreen="true" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
      </iframe>
    `;
  }

  modal.classList.add('open');
  syncVolumeUI();
}

// Replay active Cinema reel (reloads embed to bypass "Watch on Instagram")
function replayCinemaReel() {
  if (cinemaCurrentIndex === null) return;
  const reel = filteredReels[cinemaCurrentIndex];
  const body = document.querySelector<HTMLDivElement>('#modal-player-body');
  if (!body) return;

  const iframe = body.querySelector<HTMLIFrameElement>('iframe');
  if (iframe) {
    if (reel.platform === 'youtube') {
      iframe.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      showToast('Replaying short ↺');
    } else {
      const src = iframe.src;
      iframe.src = 'about:blank';
      setTimeout(() => {
        const cleanSrc = src.replace(/([?&])_t=\d+/, '');
        const sep = cleanSrc.includes('?') ? '&' : '?';
        iframe.src = `${cleanSrc}${sep}_t=${Date.now()}`;
        showToast('Replaying reel from beginning ↺');
      }, 60);
    }
  }
}

// Replay reel on specific card (reloads embed to restart from 0:00)
function replayCardReel(reelId: string) {
  const reel = allReels.find((r) => r.id === reelId);
  if (!reel) return;

  const card = document.querySelector<HTMLElement>(`#card-${reelId}`);
  const mount = document.querySelector<HTMLDivElement>(`#player-mount-${reelId}`);
  const poster = document.querySelector<HTMLDivElement>(`#poster-${reelId}`);
  if (!mount || !card) return;

  card.classList.add('active-playback');
  mount.style.display = 'block';
  poster?.classList.add('hidden');

  const iframe = mount.querySelector<HTMLIFrameElement>('iframe');
  if (iframe) {
    if (reel.platform === 'youtube') {
      iframe.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      showToast('Replaying short ↺');
    } else {
      const src = iframe.src;
      iframe.src = 'about:blank';
      setTimeout(() => {
        const cleanSrc = src.replace(/([?&])_t=\d+/, '');
        const sep = cleanSrc.includes('?') ? '&' : '?';
        iframe.src = `${cleanSrc}${sep}_t=${Date.now()}`;
        showToast('Replaying reel from beginning ↺');
      }, 60);
    }
  } else {
    // Mount player directly and start
    const effectiveVol = isMuted ? 0 : masterVolume;
    const muteParam = isMuted ? 1 : 0;
    if (reel.platform === 'youtube') {
      mount.innerHTML = `
        <iframe 
          class="reel-iframe" 
          src="${reel.embedUrl}&autoplay=1&mute=${muteParam}&origin=${encodeURIComponent(window.location.origin)}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
      setTimeout(() => {
        const frame = mount.querySelector<HTMLIFrameElement>('iframe');
        if (frame && frame.contentWindow) {
          frame.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${effectiveVol}]}`, '*');
        }
      }, 300);
    } else if (reel.platform === 'instagram') {
      mount.innerHTML = `
        <iframe 
          class="reel-iframe" 
          src="${reel.embedUrl}" 
          allowtransparency="true" 
          allowfullscreen="true" 
          frameborder="0" 
          scrolling="no">
        </iframe>
      `;
    } else {
      mount.innerHTML = `
        <iframe 
          class="reel-iframe" 
          src="${reel.embedUrl}&autoplay=true" 
          allowfullscreen="true" 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `;
    }
    showToast('Starting reel playback ↺');
  }
}

function closeCinemaModal() {
  const modal = document.querySelector<HTMLDivElement>('#cinema-modal');
  const body = document.querySelector<HTMLDivElement>('#modal-player-body');
  if (modal) modal.classList.remove('open');
  if (body) body.innerHTML = '';
  cinemaCurrentIndex = null;
}

// Next / Previous in Cinema
function navigateCinema(direction: 1 | -1) {
  if (cinemaCurrentIndex === null) return;
  let newIndex = cinemaCurrentIndex + direction;
  if (newIndex < 0) newIndex = filteredReels.length - 1;
  if (newIndex >= filteredReels.length) newIndex = 0;
  openCinemaModal(newIndex);
}

// Setup Event Listeners
function setupEventListeners() {
  // Master Volume Controls (Header)
  const headerSlider = document.querySelector<HTMLInputElement>('#header-vol-slider');
  const headerBtn = document.querySelector<HTMLButtonElement>('#header-vol-btn');

  if (headerSlider) {
    headerSlider.addEventListener('input', (e) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      setMasterVolume(val);
    });
  }

  if (headerBtn) {
    headerBtn.addEventListener('click', toggleMute);
  }

  // Modal Volume Controls (Cinema Mode)
  const modalSlider = document.querySelector<HTMLInputElement>('#modal-vol-slider');
  const modalBtn = document.querySelector<HTMLButtonElement>('#modal-vol-btn');

  if (modalSlider) {
    modalSlider.addEventListener('input', (e) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      setMasterVolume(val);
    });
  }

  if (modalBtn) {
    modalBtn.addEventListener('click', toggleMute);
  }

  // Stats Volume Hint Click
  const statsVolHint = document.querySelector('#stats-vol-hint');
  if (statsVolHint) {
    statsVolHint.addEventListener('click', toggleMute);
  }

  // Search input
  const searchInput = document.querySelector<HTMLInputElement>('#search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      updateFilteredList();
    });
  }

  // Filter tabs
  const filterTabs = document.querySelector('#filter-tabs');
  if (filterTabs) {
    filterTabs.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest<HTMLButtonElement>('.filter-tab');
      if (!target) return;
      const category = target.getAttribute('data-filter') as FilterCategory;
      if (!category) return;

      activeFilter = category;
      document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
      target.classList.add('active');
      updateFilteredList();
    });
  }

  // Grid column selector (2, 3, 4, 5)
  document.querySelectorAll<HTMLButtonElement>('.col-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cols = parseInt(btn.getAttribute('data-cols') || '4', 10) as ColumnCount;
      currentColumns = cols;
      document.querySelectorAll('.col-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const grid = document.querySelector('#reels-grid');
      if (grid) {
        grid.className = `reels-grid cols-${cols}`;
      }
    });
  });

  // Global Grid clicks (delegated for favorite, copy, cinema open)
  const grid = document.querySelector('#reels-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // Replay button clicked
      const replayBtn = target.closest<HTMLElement>('[data-action="replay"]');
      if (replayBtn) {
        e.stopPropagation();
        const reelId = replayBtn.getAttribute('data-id');
        if (reelId) {
          replayCardReel(reelId);
        }
        return;
      }

      // Favorite button clicked
      const favBtn = target.closest<HTMLButtonElement>('[data-action="favorite"]');
      if (favBtn) {
        e.stopPropagation();
        const reelId = favBtn.getAttribute('data-id');
        const reel = allReels.find((r) => r.id === reelId);
        if (reel) {
          reel.isFavorite = !reel.isFavorite;
          saveFavorites();
          favBtn.classList.toggle('active', reel.isFavorite);
          favBtn.innerHTML = reel.isFavorite ? icons.heart : icons.heartOutline;
          updateBadges();
          showToast(reel.isFavorite ? 'Added to Favorites!' : 'Removed from Favorites');
        }
        return;
      }

      // Copy link clicked
      const copyBtn = target.closest<HTMLButtonElement>('[data-action="copy"]');
      if (copyBtn) {
        e.stopPropagation();
        const url = copyBtn.getAttribute('data-url');
        if (url) {
          navigator.clipboard.writeText(url);
          showToast('Reel URL copied to clipboard!');
        }
        return;
      }

      // Cinema modal trigger
      const playTrigger = target.closest<HTMLElement>('[data-action="play-modal"]');
      if (playTrigger) {
        const indexStr = playTrigger.getAttribute('data-index');
        if (indexStr !== null) {
          openCinemaModal(parseInt(indexStr, 10));
        }
      }
    });
  }

  // Random Reel button
  const randomBtn = document.querySelector('#btn-random');
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      if (filteredReels.length === 0) return;
      const randIdx = Math.floor(Math.random() * filteredReels.length);
      openCinemaModal(randIdx);
      showToast(`Shuffled to random reel #${randIdx + 1}!`);
    });
  }

  // Cinema modal controls
  document.querySelector('#modal-close')?.addEventListener('click', closeCinemaModal);
  document.querySelector('#modal-prev')?.addEventListener('click', () => navigateCinema(-1));
  document.querySelector('#modal-next')?.addEventListener('click', () => navigateCinema(1));
  document.querySelector('#modal-replay-btn')?.addEventListener('click', replayCinemaReel);

  // Add Reel Modal
  const addModal = document.querySelector<HTMLDivElement>('#add-modal');
  const addBtn = document.querySelector('#btn-add-reel');
  const addClose = document.querySelector('#add-modal-close');
  const addCancel = document.querySelector('#add-modal-cancel');
  const addForm = document.querySelector<HTMLFormElement>('#add-reel-form');

  if (addBtn && addModal) {
    addBtn.addEventListener('click', () => addModal.classList.add('open'));
  }
  if (addClose && addModal) {
    addClose.addEventListener('click', () => addModal.classList.remove('open'));
  }
  if (addCancel && addModal) {
    addCancel.addEventListener('click', () => addModal.classList.remove('open'));
  }

  // Handle adding custom reel
  if (addForm && addModal) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const urlInput = document.querySelector<HTMLInputElement>('#reel-url-input');
      const captionInput = document.querySelector<HTMLInputElement>('#reel-caption-input');
      if (!urlInput) return;

      const url = urlInput.value.trim();
      const caption = captionInput ? captionInput.value.trim() : '';

      let platform: ReelItem['platform'] = 'instagram';
      let embedUrl = '';
      let code = '';
      let title = caption || 'Custom Reel';

      if (url.includes('instagram.com')) {
        platform = 'instagram';
        const match = url.match(/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
        code = match ? match[1] : 'custom-ig';
        embedUrl = `https://www.instagram.com/reel/${code}/embed`;
        title = caption || `Instagram Reel (${code})`;
      } else if (url.includes('facebook.com')) {
        platform = 'facebook';
        const match = url.match(/reel\/(\d+)/);
        code = match ? match[1] : 'custom-fb';
        embedUrl = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(url)}&show_text=false&width=267`;
        title = caption || `Facebook Reel (${code})`;
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        platform = 'youtube';
        const shortsMatch = url.match(/shorts\/([A-Za-z0-9_-]+)/);
        const watchMatch = url.match(/(?:watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
        code = shortsMatch ? shortsMatch[1] : watchMatch ? watchMatch[1] : 'custom-yt';
        embedUrl = `https://www.youtube.com/embed/${code}?enablejsapi=1&autoplay=0&mute=1&loop=1&playlist=${code}`;
        title = caption || `YouTube Short (${code})`;
      }

      const newReel: ReelItem = {
        id: `custom-${Date.now()}`,
        originalUrl: url,
        embedUrl,
        platform,
        code,
        title,
        date: new Date().toLocaleDateString(),
        caption,
        isFavorite: true,
      };

      allReels.unshift(newReel);
      saveCustomReels();
      updateFilteredList();

      addForm.reset();
      addModal.classList.remove('open');
      showToast('New reel added to collection!');
    });
  }

  // Keyboard Navigation & YouTube Volume Shortcuts
  window.addEventListener('keydown', (e) => {
    const isInput = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName);
    
    // YouTube Volume controls via keyboard (↑ / ↓ / M)
    if (!isInput) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMasterVolume((isMuted ? 0 : masterVolume) + 5);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMasterVolume((isMuted ? 0 : masterVolume) - 5);
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        replayCinemaReel();
        return;
      }
    }

    const modal = document.querySelector('#cinema-modal');
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'Escape') closeCinemaModal();
      if (e.key === 'ArrowLeft') navigateCinema(-1);
      if (e.key === 'ArrowRight') navigateCinema(1);
    }
  });

  // Floating Back to Top Button
  const fabTop = document.querySelector<HTMLButtonElement>('#fab-top');
  window.addEventListener('scroll', () => {
    if (fabTop) {
      if (window.scrollY > 400) {
        fabTop.classList.add('visible');
      } else {
        fabTop.classList.remove('visible');
      }
    }
  });

  if (fabTop) {
    fabTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Infinite Scroll IntersectionObserver
  const scrollAnchor = document.querySelector('#scroll-anchor');
  if (scrollAnchor) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (displayedCount < filteredReels.length) {
          displayedCount += BATCH_SIZE;
          renderReelsGrid();
        }
      }
    }, { rootMargin: '400px' });
    observer.observe(scrollAnchor);
  }
}

// App Initialization
function init() {
  loadStoredData();
  renderAppShell();
  updateFilteredList();
}

// Start
init();
