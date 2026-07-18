const CONFIG = {
  iconColor: '#e8e8e8',
  typewriterTexts: ['Digital Dream ✦ Chill Vibes', 'Welcome To My Domain', 'Stay A While'],
  typewriterSpeed: 80,
  typewriterDeleteSpeed: 35,
  typewriterPause: 1500,
};

const TRACKS = [
  { title: 'Change Your Life', src: './assets/music.mp3', cover: './assets/cover.gif' },
];

function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const texts = CONFIG.typewriterTexts;
  let textIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const full = texts[textIdx];
    if (!deleting) {
      el.textContent = full.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx >= full.length) {
        deleting = true;
        setTimeout(tick, CONFIG.typewriterPause);
        return;
      }
      setTimeout(tick, CONFIG.typewriterSpeed);
    } else {
      el.textContent = full.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx <= 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
      setTimeout(tick, CONFIG.typewriterDeleteSpeed);
    }
  }
  tick();
}

function initEnterAnimation() {
  setTimeout(() => {
    document.body.classList.remove('entering');
  }, 2400);
}

function initMusicPlayer() {
  const audio = document.getElementById('music');
  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const volume = document.getElementById('volume');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const progressThumb = document.getElementById('progressThumb');
  const musicTitle = document.getElementById('musicTitle');
  const musicCover = document.getElementById('musicCover');
  const musicCurrent = document.getElementById('musicCurrent');
  const musicDuration = document.getElementById('musicDuration');

  let currentIdx = 0;

  const PLAY_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/></svg>';
  const PAUSE_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14 19V5q0-.425.288-.713T15 4h5q.425 0 .713.288T21 5v14q0 .425-.288.713T20 20h-5q-.425 0-.712-.288T14 19M3 19V5q0-.425.288-.713T4 4h5q.425 0 .713.288T10 5v14q0 .425-.288.713T9 20H4q-.425 0-.712-.288T3 19"/></svg>';

  function loadTrack(idx) {
    if (!TRACKS.length) return;
    currentIdx = (idx + TRACKS.length) % TRACKS.length;
    const t = TRACKS[currentIdx];
    audio.src = t.src;
    musicTitle.textContent = t.title;
    musicCover.src = t.cover;
    progressFill.style.width = '0%';
    progressThumb.style.left = '0%';
    musicCurrent.textContent = '0:00';
    musicDuration.textContent = '0:00';
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', () => { loadTrack(currentIdx - 1); audio.play().catch(() => {}); });
  nextBtn.addEventListener('click', () => { loadTrack(currentIdx + 1); audio.play().catch(() => {}); });

  audio.addEventListener('play', () => { playBtn.innerHTML = PAUSE_SVG; playBtn.setAttribute('aria-label', 'Pause'); });
  audio.addEventListener('pause', () => { playBtn.innerHTML = PLAY_SVG; playBtn.setAttribute('aria-label', 'Play'); });

  audio.addEventListener('loadedmetadata', () => {
    musicDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
    progressThumb.style.left = pct + '%';
    musicCurrent.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    if (TRACKS.length > 1) loadTrack(currentIdx + 1);
    audio.play().catch(() => {});
  });

  volume.addEventListener('input', () => {
    audio.volume = parseFloat(volume.value) / 100;
  });
  audio.volume = parseFloat(volume.value) / 100;

  let dragging = false;
  function seekFromEvent(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    if (audio.duration) audio.currentTime = pct * audio.duration;
  }
  progressBar.addEventListener('mousedown', (e) => { dragging = true; seekFromEvent(e); });
  window.addEventListener('mousemove', (e) => { if (dragging) seekFromEvent(e); });
  window.addEventListener('mouseup', () => { dragging = false; });

  if (TRACKS.length) loadTrack(0);

  function tryAutoplay() {
    audio.play().then(() => {
      playBtn.innerHTML = PAUSE_SVG;
      playBtn.setAttribute('aria-label', 'Pause');
    }).catch(() => {});
  }
  tryAutoplay();
  const onFirstInteract = () => {
    tryAutoplay();
    document.removeEventListener('click', onFirstInteract);
    document.removeEventListener('keydown', onFirstInteract);
    document.removeEventListener('touchstart', onFirstInteract);
  };
  document.addEventListener('click', onFirstInteract);
  document.addEventListener('keydown', onFirstInteract);
  document.addEventListener('touchstart', onFirstInteract);
}

function init() {
  initEnterAnimation();
  initTypewriter();
  initMusicPlayer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}