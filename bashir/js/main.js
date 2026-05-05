/* =========================================================
   BASHIR — main.js
   GSAP + ScrollTrigger + Lenis (smooth scroll)
   Apple-grade scroll/animation sync
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* Global ScrollTrigger config — must be set before any trigger */
ScrollTrigger.config({
  ignoreMobileResize: true,            // ignore iOS Safari URL-bar resize jumps
  limitCallbacks: true,                // throttle onUpdate calls
});
gsap.config({ force3D: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* =========================================================
   1. LENIS + SCROLLTRIGGER — single source of truth
   ---------------------------------------------------------
   Critical: drive Lenis's raf ONLY through gsap.ticker.
   Running both requestAnimationFrame(raf) AND gsap.ticker
   double-advances Lenis each frame → jitter and desync.
   ========================================================= */
let lenis = null;

function initLenis() {
  if (reduceMotion) return null;

  lenis = new Lenis({
    lerp: 0.085,                       // smoother than duration-based on heavy pages
    smoothWheel: true,
    smoothTouch: false,                // never smooth on touch — feels broken on mobile
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    syncTouch: false,
  });

  /* The ONLY raf loop driving Lenis */
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);         // do not let GSAP fudge timestamps under load

  /* Tell ScrollTrigger to update on every Lenis tick — fixes desync */
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}

/* =========================================================
   2. LOADER
   ========================================================= */
function runLoader() {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    const count = document.getElementById('loaderCount');
    const line = document.getElementById('loaderLine');
    const brandText = document.querySelector('.loader__brand-text');

    if (reduceMotion) {
      loader.style.display = 'none';
      resolve();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          y: '-100%',
          duration: 1.1,
          ease: 'expo.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            resolve();
          },
        });
      },
    });

    tl.to(brandText, { y: '0%', duration: 1.0, ease: 'expo.out' }, 0)
      .to(counter, {
        val: 100,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(counter.val);
          count.textContent = v.toString().padStart(2, '0');
          line.style.width = v + '%';
        },
      }, 0.1)
      .to({}, { duration: 0.3 });
  });
}

/* =========================================================
   3. CUSTOM CURSOR — quickTo (no style.transform thrash)
   ========================================================= */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || !isFinePointer) return;

  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');

  /* quickTo creates a single internal tween reused per frame
     → no per-frame allocations, no style strings parsed */
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3.out' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    dotX(e.clientX); dotY(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
  }, { passive: true });

  document.querySelectorAll('[data-cursor]').forEach((el) => {
    const type = el.getAttribute('data-cursor');
    el.addEventListener('mouseenter', () => cursor.classList.add(`is-${type}`));
    el.addEventListener('mouseleave', () => cursor.classList.remove(`is-${type}`));
  });
}

/* =========================================================
   4. NAV scroll state — ScrollTrigger driven (no extra listener)
   ========================================================= */
function initNav() {
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 60,
    end: 'max',
    onToggle: (self) => nav.classList.toggle('is-scrolled', self.isActive),
  });
}

/* =========================================================
   5. HERO entrance + parallax — single fromTo per property
   ========================================================= */
function animateHero() {
  if (reduceMotion) return;

  const heroImage = document.querySelector('.hero__image');
  const words = document.querySelectorAll('.hero__title .word');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const bottom = document.querySelector('.hero__bottom');
  const scroll = document.querySelector('.hero__scroll');

  /* Initial state set by GSAP, NOT CSS — so scroll parallax never fights */
  gsap.set(heroImage, { scale: 1.12, yPercent: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to(heroImage, { scale: 1.0, duration: 2.4 }, 0)
    .to(eyebrow, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.2)
    .to(words, { y: '0%', duration: 1.4, stagger: 0.08 }, 0.3)
    .to(bottom, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.2)
    .to(scroll, { opacity: 1, duration: 1, ease: 'power2.out' }, 1.4);

  /* Parallax — fromTo with explicit values prevents conflict with entrance */
  gsap.fromTo(heroImage,
    { yPercent: 0, scale: 1.0 },
    {
      yPercent: 18,
      scale: 1.14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,                    // small smoothing → buttery, not laggy
        invalidateOnRefresh: true,
      },
    }
  );

  gsap.to('.hero__content', {
    yPercent: -8,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });
}

/* =========================================================
   6. MARQUEE — quickTo for velocity (no overwrite tween storm)
   ========================================================= */
function initMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;

  const tween = gsap.to(track, {
    xPercent: -50,
    duration: 28,
    ease: 'none',
    repeat: -1,
  });

  if (reduceMotion) return;

  /* One reusable tween for timeScale — replaces gsap.to(...overwrite) per scroll */
  const setScale = gsap.quickTo(tween, 'timeScale', { duration: 0.6, ease: 'power2.out' });

  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = self.getVelocity();
      const factor = 1 + gsap.utils.clamp(-3, 3, v / 1200) * (v > 0 ? 1 : -1);
      setScale(factor);
    },
  });
}

/* =========================================================
   7. STORY — word-by-word reveal (scrubbed, smoothed)
   ========================================================= */
function initStoryReveal() {
  const words = gsap.utils.toArray('.reveal-word');
  if (!words.length) return;

  ScrollTrigger.create({
    trigger: '.story__text',
    start: 'top 75%',
    end: 'bottom 45%',
    scrub: 0.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const idx = Math.floor(self.progress * words.length);
      for (let i = 0; i < words.length; i++) {
        const active = i <= idx;
        if (words[i]._active === active) continue;   // skip if no change → no DOM write
        words[i]._active = active;
        words[i].classList.toggle('is-active', active);
      }
    },
  });
}

/* =========================================================
   8. SECTION TITLES — fade up
   ========================================================= */
function initSectionReveals() {
  if (reduceMotion) return;

  const targets = gsap.utils.toArray(
    '.section__index, .section__title, .section__subtitle, .story__index, .story__sub p'
  );

  targets.forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',  // no reverse → no flicker on micro-scroll
        once: true,                            // run once → cheaper, no state churn
      },
    });
  });
}

/* =========================================================
   9. PRODUCTS — reveal + parallax (mobile: reveal only)
   ========================================================= */
function initProducts() {
  if (reduceMotion) return;

  const products = gsap.utils.toArray('.product');

  products.forEach((p) => {
    gsap.from(p, {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    /* Skip per-image parallax on mobile — too expensive, marginal payoff */
    if (isMobile) return;

    const img = p.querySelector('img');
    if (!img) return;

    gsap.fromTo(img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: p,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}

/* =========================================================
   10. IMMERSION — clamped parallax (no end-of-section jumps)
   ========================================================= */
function initImmersion() {
  if (reduceMotion) return;

  const panels = gsap.utils.toArray('.immersion__panel, .immersion__half');

  panels.forEach((panel) => {
    const img = panel.querySelector('img');
    if (!img) return;

    /* Soft on mobile */
    const speedAttr = parseFloat(panel.dataset.speed) || 1;
    const intensity = isMobile ? 4 : 10;
    const range = intensity * speedAttr;

    gsap.fromTo(img,
      { yPercent: -range },
      {
        yPercent: range,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  gsap.utils.toArray('.immersion__caption').forEach((cap) => {
    gsap.from(cap, {
      y: 60,
      opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: cap,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  });
}

/* =========================================================
   11. CTA section
   ========================================================= */
function initCTA() {
  if (reduceMotion) return;

  const lines = document.querySelectorAll('.cta-section__title .line');
  gsap.set(lines, { y: '110%' });

  ScrollTrigger.create({
    trigger: '.cta-section',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(lines, { y: '0%', duration: 1.4, stagger: 0.1, ease: 'expo.out' });
      gsap.from('.cta-section__sub',
        { opacity: 0, y: 20, duration: 1, delay: 0.4, ease: 'power2.out' });
      gsap.from('.cta-section .cta',
        { opacity: 0, y: 20, duration: 1, delay: 0.6, ease: 'power2.out' });
    },
  });
}

/* =========================================================
   12. FOOTER reveal
   ========================================================= */
function initFooter() {
  if (reduceMotion) return;
  gsap.from('.footer__mark', {
    y: 60,
    opacity: 0,
    duration: 1.6,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.footer', start: 'top 85%', once: true },
  });
}

/* =========================================================
   13. POST-LOAD REFRESH — recompute trigger positions once
        all images have a real height (avoids early/late firing)
   ========================================================= */
function refreshOnImagesReady() {
  const imgs = Array.from(document.images);
  const pending = imgs.filter((img) => !img.complete);

  if (pending.length === 0) {
    ScrollTrigger.refresh();
    return;
  }

  let remaining = pending.length;
  const done = () => { if (--remaining === 0) ScrollTrigger.refresh(); };
  pending.forEach((img) => {
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}

/* =========================================================
   BOOT
   ========================================================= */
window.addEventListener('load', async () => {
  initLenis();           // before anything that listens to scroll
  await runLoader();

  initCursor();
  initNav();
  animateHero();
  initMarquee();
  initStoryReveal();
  initSectionReveals();
  initProducts();
  initImmersion();
  initCTA();
  initFooter();

  refreshOnImagesReady();
});

/* Recompute on resize (debounced by ScrollTrigger internally via ignoreMobileResize) */
window.addEventListener('resize', () => ScrollTrigger.refresh());
