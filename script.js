const CONFIG = {
  iconColor: '#e8e8e8',
  typewriterSpeed: 80,
  typewriterDeleteSpeed: 35,
  typewriterPause: 1500,
};

const TRACKS = [
  { title: 'Change Your Life', src: './assets/music.mp3', cover: './assets/cover.gif?v=2' },
];

const TRANSLATIONS = {
  'zh-CN': {
    enterText: '⚝ 点击进入 MoLucien 的领域 ⚝',
    typewriterTexts: ['数字幻梦 ✦ 惬意氛围', '欢迎来到我的领域', '留一会儿吧'],
    locationText: '身处数字虚空',
    tooltipLocation: '位置',
    tooltipVolume: '音量',
    tooltipBilibili: '哔哩哔哩',
    ariaPrev: '上一首',
    ariaNext: '下一首',
    ariaPlay: '播放',
    ariaPause: '暂停',
    ariaVolume: '音量',
    ariaSeek: '播放进度',
    ariaEnter: '进入网站',
  },
  'zh-TW': {
    enterText: '⚝ 點擊進入 MoLucien 的領域 ⚝',
    typewriterTexts: ['數位幻夢 ✦ 愜意氛圍', '歡迎來到我的領域', '留一會兒吧'],
    locationText: '身處數位虛空',
    tooltipLocation: '位置',
    tooltipVolume: '音量',
    tooltipBilibili: '嗶哩嗶哩',
    ariaPrev: '上一首',
    ariaNext: '下一首',
    ariaPlay: '播放',
    ariaPause: '暫停',
    ariaVolume: '音量',
    ariaSeek: '播放進度',
    ariaEnter: '進入網站',
  },
  en: {
    enterText: "⚝ MoLucien's Domain ⚝",
    typewriterTexts: ['Digital Dream ✦ Chill Vibes', 'Welcome To My Domain', 'Stay A While'],
    locationText: 'In The Digital Void',
    tooltipLocation: 'Location',
    tooltipVolume: 'Volume',
    tooltipBilibili: 'Bilibili',
    ariaPrev: 'Previous',
    ariaNext: 'Next',
    ariaPlay: 'Play',
    ariaPause: 'Pause',
    ariaVolume: 'Volume',
    ariaSeek: 'Seek',
    ariaEnter: 'Enter site',
  },
  ja: {
    enterText: '⚝ クリックして MoLucien の領域へ ⚝',
    typewriterTexts: ['デジタルドリーム ✦ チルな雰囲気', '私の領域へようこそ', 'しばらくのんびりしてね'],
    locationText: 'デジタル虚無の中に',
    tooltipLocation: '場所',
    tooltipVolume: '音量',
    tooltipBilibili: 'ビリビリ',
    ariaPrev: '前の曲',
    ariaNext: '次の曲',
    ariaPlay: '再生',
    ariaPause: '一時停止',
    ariaVolume: '音量',
    ariaSeek: '再生位置',
    ariaEnter: 'サイトに入る',
  },
  ko: {
    enterText: '⚝ 클릭해서 MoLucien의 영역으로 ⚝',
    typewriterTexts: ['디지털 드림 ✦ 편안한 분위기', '내 영역에 오신 것을 환영해요', '잠시 머물다 가요'],
    locationText: '디지털 공허 속에',
    tooltipLocation: '위치',
    tooltipVolume: '볼륨',
    tooltipBilibili: '빌리빌리',
    ariaPrev: '이전 곡',
    ariaNext: '다음 곡',
    ariaPlay: '재생',
    ariaPause: '일시정지',
    ariaVolume: '볼륨',
    ariaSeek: '재생 위치',
    ariaEnter: '사이트 입장',
  },
};

const LANG_STORAGE_KEY = 'lucien-lang';
let currentLang = 'en';

function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
  } catch (e) {}
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.includes('hant') || nav === 'zh-tw' || nav === 'zh-hk') return 'zh-TW';
  if (nav.startsWith('zh')) return 'zh-CN';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('ko')) return 'ko';
  return 'en';
}

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ?? TRANSLATIONS.en[key];
}

function applyLang(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = lang;
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}

  const enterEl = document.querySelector('.page-enter-text');
  if (enterEl) {
    enterEl.textContent = t('enterText');
    enterEl.setAttribute('aria-label', t('ariaEnter'));
  }

  const locationText = document.querySelector('.location-text');
  if (locationText) locationText.textContent = t('locationText');

  const locationEl = document.querySelector('.location');
  if (locationEl) locationEl.setAttribute('data-tooltip', t('tooltipLocation'));

  const volumeWrap = document.querySelector('.volume-wrap');
  if (volumeWrap) volumeWrap.setAttribute('data-tooltip', t('tooltipVolume'));

  const volumeInput = document.getElementById('volume');
  if (volumeInput) volumeInput.setAttribute('aria-label', t('ariaVolume'));

  const volumeLabel = document.querySelector('label[for="volume"]');
  if (volumeLabel) volumeLabel.textContent = t('ariaVolume');

  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.setAttribute('aria-label', t('ariaSeek'));

  const bilibiliLink = document.querySelector('.social[href*="bilibili"]');
  if (bilibiliLink) bilibiliLink.setAttribute('data-tooltip', t('tooltipBilibili'));

  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) prevBtn.setAttribute('aria-label', t('ariaPrev'));

  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.setAttribute('aria-label', t('ariaNext'));

  const playBtn = document.getElementById('playBtn');
  const audio = document.getElementById('music');
  if (playBtn) playBtn.setAttribute('aria-label', audio && !audio.paused ? t('ariaPause') : t('ariaPlay'));

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  if (!document.body.classList.contains('entering')) {
    initTypewriter();
  }
}

function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

let twGeneration = 0;

function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  twGeneration++;
  const myGen = twGeneration;

  // 减弱动态偏好：静态显示第一段文案，不做打字机动画
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = t('typewriterTexts')[0];
    return;
  }

  let textIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    if (myGen !== twGeneration) return;
    const texts = t('typewriterTexts');
    const full = texts[textIdx % texts.length];
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
  let playAttempted = false;

  const PLAY_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/></svg>';
  const PAUSE_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14 19V5q0-.425.288-.713T15 4h5q.425 0 .713.288T21 5v14q0 .425-.288.713T20 20h-5q-.425 0-.712-.288T14 19M3 19V5q0-.425.288-.713T4 4h5q.425 0 .713.288T10 5v14q0 .425-.288.713T9 20H4q-.425 0-.712-.288T3 19"/></svg>';

  function loadTrack(idx) {
    if (!TRACKS.length) return;
    currentIdx = (idx + TRACKS.length) % TRACKS.length;
    const track = TRACKS[currentIdx];
    audio.src = track.src;
    musicTitle.textContent = track.title;
    musicCover.src = track.cover;
    progressFill.style.width = '0%';
    progressThumb.style.left = '0%';
    musicCurrent.textContent = '0:00';
    musicDuration.textContent = '0:00';
  }

  // 懒加载：进入页面前不请求音频源，首次播放时才设置 src（省下 2.1MB 初始流量）
  function ensureSource() {
    if (!audio.getAttribute('src') && TRACKS.length) {
      const track = TRACKS[currentIdx];
      audio.src = track.src;
      musicTitle.textContent = track.title;
      musicCover.src = track.cover;
    }
  }

  function togglePlay() {
    if (audio.paused) {
      ensureSource();
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

  audio.addEventListener('play', () => { playBtn.innerHTML = PAUSE_SVG; playBtn.setAttribute('aria-label', t('ariaPause')); });
  audio.addEventListener('pause', () => { playBtn.innerHTML = PLAY_SVG; playBtn.setAttribute('aria-label', t('ariaPlay')); });

  audio.addEventListener('loadedmetadata', () => {
    musicDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
    progressThumb.style.left = pct + '%';
    musicCurrent.textContent = formatTime(audio.currentTime);
    progressBar.setAttribute('aria-valuenow', String(Math.round(pct)));
    progressBar.setAttribute('aria-valuetext', `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`);
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

  progressBar.addEventListener('touchstart', (e) => { dragging = true; seekFromEvent(e); }, { passive: true });
  window.addEventListener('touchmove', (e) => { if (dragging) seekFromEvent(e); }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });

  // 键盘无障碍：方向键/Home/End 调整进度（Shift 加速）
  progressBar.addEventListener('keydown', (e) => {
    if (!audio.duration) return;
    const step = e.shiftKey ? 10 : 5;
    let target;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        target = audio.currentTime + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        target = audio.currentTime - step;
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = audio.duration;
        break;
      default:
        return;
    }
    e.preventDefault();
    audio.currentTime = Math.max(0, Math.min(audio.duration, target));
  });

  // 初始只同步 UI，不加载音频（懒加载，见 ensureSource）
  if (TRACKS.length) {
    musicTitle.textContent = TRACKS[0].title;
    musicCover.src = TRACKS[0].cover;
  }

  // ============ 播放控制（含自动播放策略回退） ============

  function attemptPlay() {
    if (playAttempted) return; // 已经尝试过就不再重复
    playAttempted = true;

    ensureSource();
    audio.play()
      .then(() => {
        // 播放成功后移除所有备用监听器（图标切换由 play 事件统一处理）
        document.removeEventListener('click', handleAnyInteraction);
        document.removeEventListener('touchstart', handleAnyInteraction);
        document.removeEventListener('keydown', handleAnyInteraction);
      })
      .catch(() => {
        // 自动播放被阻止：监听用户的下一次交互
        document.addEventListener('click', handleAnyInteraction, { once: true });
        document.addEventListener('touchstart', handleAnyInteraction, { once: true });
        document.addEventListener('keydown', handleAnyInteraction, { once: true });
      });
  }

  function handleAnyInteraction() {
    if (!audio.paused) return; // 已经在播放就不重复触发
    ensureSource();
    audio.play().catch(() => {});
  }

  function playOnEnter() {
    // 延迟一点点，确保音频元素已完全加载
    setTimeout(attemptPlay, 200);
  }

  return playOnEnter;
}

function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const isSmall = window.innerWidth < 600;
  const COUNT = isSmall ? 30 : 65;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      alpha: Math.random() * 0.5 + 0.15,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    };
  }

  function setup() {
    resize();
    particles = Array.from({ length: COUNT }, makeParticle);
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      // 鼠标排斥：距离越近推力越大
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const d2 = dx * dx + dy * dy;
      if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const f = (1 - d / REPEL_RADIUS) * REPEL_FORCE;
        p.x += (dx / d) * f;
        p.y += (dy / d) * f;
      }
      p.twinklePhase += p.twinkleSpeed;
      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
      if (p.x < -5) p.x = w + 5;
      if (p.x > w + 5) p.x = -5;
      const a = p.alpha * (0.5 + 0.5 * Math.sin(p.twinklePhase));
      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 232, 232, ${a.toFixed(3)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  // 鼠标交互：靠近光标的粒子被轻柔推开（排斥效果）
  let mouseX = -9999, mouseY = -9999;
  const REPEL_RADIUS = 120;
  const REPEL_FORCE = 1.8;
  window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 200);
  });

  setup();
  tick();
}

function initParallax() {
  const wrap = document.querySelector('.card-wrap');
  if (!wrap) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  let running = false;
  const maxShift = 10;
  const maxTilt = 4;

  function loop() {
    curX += (targetX - curX) * 0.06;
    curY += (targetY - curY) * 0.06;
    wrap.style.transform =
      `rotateY(${(curX * maxTilt).toFixed(2)}deg) rotateX(${(-curY * maxTilt).toFixed(2)}deg) ` +
      `translate(${(curX * maxShift).toFixed(1)}px, ${(curY * maxShift).toFixed(1)}px)`;
    // 追平目标后停止 rAF（空闲不再空转，省 CPU/电量），下次鼠标移动再唤醒
    if (Math.abs(targetX - curX) < 0.002 && Math.abs(targetY - curY) < 0.002) {
      running = false;
      return;
    }
    requestAnimationFrame(loop);
  }

  function kick() {
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
    kick();
  });

  window.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    kick();
  });
}

function init() {
  currentLang = detectLang();
  applyLang(currentLang);
  initLangSwitch();
  initParticles();
  initParallax();

  const enterText = document.querySelector('.page-enter-text');
  const cardWrap = document.querySelector('.card-wrap');
  const playOnEnter = initMusicPlayer();

  // 页面切到后台时暂停背景视频，回来再继续（省电、降低占用）
  const bgVideo = document.getElementById('background');
  if (bgVideo) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        bgVideo.pause();
      } else {
        bgVideo.play().catch(() => {});
      }
    });
  }

  let entered = false;

  function onEnter() {
    if (entered) return;
    entered = true;
    if (cardWrap) cardWrap.inert = false; // 解除卡片的不可聚焦状态
    enterText.classList.add('entered');
    document.body.classList.remove('entering');
    initTypewriter();
    playOnEnter(); // 调用播放函数

    // 淡出结束后从无障碍树与 Tab 顺序中彻底移除
    setTimeout(() => {
      enterText.hidden = true;
      enterText.setAttribute('aria-hidden', 'true');
    }, 900);

    enterText.removeEventListener('click', onEnter);
    enterText.removeEventListener('keydown', onKeyEnter);
    enterText.removeEventListener('touchstart', onEnter);
  }

  function onKeyEnter(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onEnter();
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // 减弱动态偏好下进入遮罩被 CSS 隐藏：直接进入；音频在首次交互后播放
    onEnter();
  } else {
    // 进入前卡片不可见：置为 inert，避免 Tab 聚焦到隐藏元素
    if (cardWrap) cardWrap.inert = true;
    enterText.addEventListener('click', onEnter);
    enterText.addEventListener('keydown', onKeyEnter);
    enterText.addEventListener('touchstart', onEnter, { passive: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
