// Custom cursor: dot follows exactly, ring eases behind it,
// both widen slightly over links/buttons. Skipped on touch devices.
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (isFinePointer && cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button')) cursorRing.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button')) cursorRing.classList.remove('hovering');
  });
}

// Light / dark theme toggle
const themeToggles = document.querySelectorAll('#themeToggle');
themeToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  });
});

// ============================================================
// SIDEBAR: mobile open/close + scroll-spy active state + progress
// ============================================================
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarScrim = document.getElementById('sidebarScrim');
const navLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
const navSections = ['top', 'work', 'about', 'process', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function closeSidebar(){ sidebar && sidebar.classList.remove('open'); }

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}
if (sidebarScrim) {
  sidebarScrim.addEventListener('click', closeSidebar);
}
navLinks.forEach(link => link.addEventListener('click', closeSidebar));

function updateNav(){
  const vh = window.innerHeight;
  // Pick whichever section has scrolled furthest past the threshold line —
  // i.e. the one with the largest (least negative) top among those already
  // crossed — so the result reflects true document position, not the
  // order sections happen to be listed in the array above.
  let current = navSections[0];
  let bestTop = -Infinity;
  navSections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < vh * 0.4 && top > bestTop) {
      bestTop = top;
      current = sec;
    }
  });
  const currentId = current ? current.id : 'top';
  const mappedId = (currentId === 'roles') ? 'work' : currentId;

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === mappedId);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('resize', updateNav);
updateNav();

document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// EDIT YOUR THREADS HERE
// Replace protocol / title / desc / readTime for each entry below
// with the real content of that thread. The url is already wired
// up to your actual X post — leave those as they are.
//
// IMAGE: drop a cover image next to index.html (e.g. an images/
// folder) and set "image" to its filename, like "images/thread1.jpg".
// Leave image as "" to fall back to the generated line-art cover —
// no broken images either way.
//
// Add or remove objects from this array to add/remove threads;
// the grid layout and card interactions update automatically.
// ============================================================
const THREADS = [
  { protocol: "AION BY OORT", title: "AION by Oort: A Deep Dive", desc: "A comprehensive exploration of AION, OORT's autonomous multi-agent protocol for Web3 operations.", readTime: "3 min read", image: "images/AION.png", url: "https://x.com/dojoxbt/status/2082518772913676314?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 2", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "5 min read", image: "", url: "https://x.com/dojoxbt/status/2073779640787956132?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 3", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "7 min read", image: "", url: "https://x.com/dojoxbt/status/2071968429700178373?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 4", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "4 min read", image: "", url: "https://x.com/dojoxbt/status/2069608379203662255?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 5", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "6 min read", image: "", url: "https://x.com/dojoxbt/status/1952682996982804889?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 6", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "5 min read", image: "", url: "https://x.com/dojoxbt/status/1944739065758351374?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 7", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "8 min read", image: "", url: "https://x.com/dojoxbt/status/1943537170528260247?s=20" },
  { protocol: "PROTOCOL NAME — THREAD 8", title: "Replace with your thread's headline", desc: "Replace with a 1–2 sentence description of what this thread covers.", readTime: "5 min read", image: "", url: "https://x.com/dojoxbt/status/1940734965039485214?s=20" }
];

// A small rotating set of quiet geometric line-art marks used as the
// cover for any thread that doesn't have a real image set yet, so
// nothing ever looks broken or empty.
const ART = [
  '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="0.6"/><circle cx="50" cy="50" r="18" stroke="currentColor" stroke-width="0.6"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="0.4"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="0.4"/></svg>',
  '<svg viewBox="0 0 100 100" fill="none"><rect x="20" y="20" width="60" height="60" stroke="currentColor" stroke-width="0.6"/><rect x="32" y="32" width="36" height="36" stroke="currentColor" stroke-width="0.6"/><line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="0.4"/><line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" stroke-width="0.4"/></svg>',
  '<svg viewBox="0 0 100 100" fill="none"><path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke="currentColor" stroke-width="0.6"/><path d="M50 10 L50 90 M15 30 L85 70 M85 30 L15 70" stroke="currentColor" stroke-width="0.4"/></svg>',
  '<svg viewBox="0 0 100 100" fill="none"><path d="M15 75 L35 40 L55 60 L85 20" stroke="currentColor" stroke-width="0.6"/><circle cx="15" cy="75" r="2" fill="currentColor"/><circle cx="35" cy="40" r="2" fill="currentColor"/><circle cx="55" cy="60" r="2" fill="currentColor"/><circle cx="85" cy="20" r="2" fill="currentColor"/></svg>'
];

const threadsList = document.getElementById('threadsList');
if (threadsList) {
  let html = '';
  THREADS.forEach((t, i) => {
    const media = t.image
      ? `<img src="${t.image}" alt="${t.title}" loading="lazy">`
      : `<div class="thread-card-art">${ART[i % ART.length]}</div>`;
    html += `
      <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="thread-card tilt reveal">
        <div class="thread-card-media">${media}</div>
        <div class="thread-card-body">
          <div class="thread-card-top">
            <span class="thread-protocol">${t.protocol}</span>
            <span class="thread-read-time">${t.readTime}</span>
          </div>
          <div class="thread-title">${t.title}</div>
          <p class="thread-desc">${t.desc}</p>
          <span class="thread-read">Read Thread →</span>
        </div>
      </a>`;
  });
  threadsList.innerHTML = html;
}

// Fade-up / rule-expand reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .rule').forEach(el => io.observe(el));

// Process rail: fill line + highlight active step based on scroll position
const rail = document.querySelector('.process-rail');
const fill = document.getElementById('processFill');
const steps = document.querySelectorAll('.process-step');

function updateProcess(){
  if(!rail) return;
  const rect = rail.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height;
  const visibleTop = Math.min(Math.max(vh * 0.65 - rect.top, 0), total);
  const pct = total > 0 ? (visibleTop / total) * 100 : 0;
  fill.style.height = pct + '%';

  steps.forEach(step=>{
    const r = step.getBoundingClientRect();
    if(r.top < vh * 0.65 && r.bottom > vh * 0.35){
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateProcess, { passive:true });
window.addEventListener('resize', updateProcess);
updateProcess();

// ============================================================
// Animated stat counters — count up once when scrolled into view
// ============================================================
const statEls = document.querySelectorAll('.stat-num');
const statIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statIo.unobserve(el);
  });
}, { threshold: 0.4 });

statEls.forEach(el => statIo.observe(el));

// ============================================================
// Magnetic buttons — subtle pull toward the cursor
// ============================================================
if (isFinePointer) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // Card tilt — gentle 3D tilt following the cursor
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // Hero visual parallax — cards drift slightly with the cursor
  const heroVisual = document.getElementById('heroVisual');
  if (heroVisual) {
    const hvCards = heroVisual.querySelectorAll('.hv-card');
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      hvCards.forEach(card => {
        card.style.setProperty('--px', (px * 18).toFixed(2));
        card.style.setProperty('--py', (py * 18).toFixed(2));
      });
    });
    heroVisual.addEventListener('mouseleave', () => {
      hvCards.forEach(card => {
        card.style.setProperty('--px', 0);
        card.style.setProperty('--py', 0);
      });
    });
  }
}
