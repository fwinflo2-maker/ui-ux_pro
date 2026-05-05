/* =========================================================
   BASHIR — main.js
   GSAP + ScrollTrigger + Lenis smooth scroll
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   1. LOADER
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
          duration: 1.2,
          ease: 'expo.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            resolve();
          }
        });
      }
    });

    tl.to(brandText, { y: '0%', duration: 1.0, ease: 'expo.out' }, 0)
      .to(counter, {
        val: 100, duration: 2.2, ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(counter.val);
          count.textContent = v.toString().padStart(2, '0');
          line.style.width = v + '%';
        }
      }, 0.1)
      .to({}, { duration: 0.4 });
  });
}

/* =========================================================
   2. SMOOTH SCROLL (Lenis)
   ========================================================= */
function initLenis() {
  if (reduceMotion) return null;
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* =========================================================
   3. CUSTOM CURSOR
   ========================================================= */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };

  window.addEventListener('mousemove', (e) => { pos.x = e.clientX; pos.y = e.clientY; });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll('[data-cursor]').forEach(el => {
    const type = el.getAttribute('data-cursor');
    el.addEventListener('mouseenter', () => cursor.classList.add(`is-${type}`));
    el.addEventListener('mouseleave', () => cursor.classList.remove(`is-${type}`));
  });
}

/* =========================================================
   4. NAV scroll state
   ========================================================= */
function initNav() {
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top -10',
    end: 'max',
    onUpdate: (self) => {
      if (self.scroll() > 60) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
  });
}

/* =========================================================
   5. HERO entrance
   ========================================================= */
function animateHero() {
  if (reduceMotion) return;

  const heroImage = document.querySelector('.hero__image');
  const words = document.querySelectorAll('.hero__title .word');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const bottom = document.querySelector('.hero__bottom');
  const scroll = document.querySelector('.hero__scroll');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to(heroImage, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
    .to(eyebrow, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.2)
    .to(words, {
      y: '0%',
      duration: 1.4,
      stagger: 0.08,
      ease: 'expo.out'
    }, 0.3)
    .to(bottom, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.2)
    .to(scroll, { opacity: 1, duration: 1, ease: 'power2.out' }, 1.4);

  /* Hero parallax on scroll */
  gsap.to(heroImage, {
    yPercent: 18,
    scale: 1.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to('.hero__content', {
    yPercent: -10,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* =========================================================
   6. MARQUEE infinite
   ========================================================= */
function initMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;

  const tl = gsap.to(track, {
    xPercent: -50,
    duration: 28,
    ease: 'none',
    repeat: -1,
  });

  /* Speed boost on scroll */
  ScrollTrigger.create({
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const v = self.getVelocity();
      gsap.to(tl, {
        timeScale: 1 + Math.min(Math.abs(v) / 1200, 3) * (v > 0 ? 1 : -1),
        duration: 0.4,
        overwrite: true
      });
    },
    onLeave: () => gsap.to(tl, { timeScale: 1, duration: 0.5 }),
    onLeaveBack: () => gsap.to(tl, { timeScale: 1, duration: 0.5 })
  });
}

/* =========================================================
   7. STORY word reveal
   ========================================================= */
function initStoryReveal() {
  const words = gsap.utils.toArray('.reveal-word');
  if (!words.length) return;

  ScrollTrigger.create({
    trigger: '.story__text',
    start: 'top 70%',
    end: 'bottom 40%',
    scrub: 0.6,
    onUpdate: (self) => {
      const idx = Math.floor(self.progress * words.length);
      words.forEach((w, i) => {
        if (i <= idx) w.classList.add('is-active');
        else w.classList.remove('is-active');
      });
    }
  });
}

/* =========================================================
   8. SECTION TITLES — fade up
   ========================================================= */
function initSectionReveals() {
  if (reduceMotion) return;

  gsap.utils.toArray('.section__index, .section__title, .section__subtitle, .story__index, .story__sub p').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

/* =========================================================
   9. PRODUCTS reveal + parallax
   ========================================================= */
function initProducts() {
  if (reduceMotion) return;

  gsap.utils.toArray('.product').forEach((p, i) => {
    const img = p.querySelector('img');

    gsap.from(p, {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.fromTo(img, {
      yPercent: -6,
    }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: p,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

/* =========================================================
   10. IMMERSION parallax (data-speed)
   ========================================================= */
function initImmersion() {
  if (reduceMotion) return;

  gsap.utils.toArray('.immersion__panel, .immersion__half').forEach(panel => {
    const img = panel.querySelector('img');
    const speed = parseFloat(panel.dataset.speed) || 1;

    gsap.fromTo(img, {
      yPercent: -10 * speed,
    }, {
      yPercent: 10 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  gsap.utils.toArray('.immersion__caption').forEach(cap => {
    gsap.from(cap, {
      y: 60, opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: cap,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
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
    start: 'top 70%',
    onEnter: () => {
      gsap.to(lines, { y: '0%', duration: 1.4, stagger: 0.1, ease: 'expo.out' });
      gsap.from('.cta-section__sub', { opacity: 0, y: 20, duration: 1, delay: 0.4, ease: 'power2.out' });
      gsap.from('.cta-section .cta', { opacity: 0, y: 20, duration: 1, delay: 0.6, ease: 'power2.out' });
    }
  });
}

/* =========================================================
   12. FOOTER reveal
   ========================================================= */
function initFooter() {
  if (reduceMotion) return;
  gsap.from('.footer__mark', {
    y: 60, opacity: 0,
    duration: 1.6,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.footer', start: 'top 80%' }
  });
}

/* =========================================================
   BOOT
   ========================================================= */
window.addEventListener('load', async () => {
  await runLoader();

  initLenis();
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

  ScrollTrigger.refresh();
});
