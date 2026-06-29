/* ============================================================
   ARSALAN FAREED ABID — PORTFOLIO
   Main JavaScript: Particles, Typing, Nav, Animations
   ============================================================ */

'use strict';

/* ============================================================
   PARTICLE CANVAS BACKGROUND
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId;
  let W, H;

  const CONFIG = {
    count:              70,
    color:              '0, 230, 118',
    sizeMin:            0.6,
    sizeMax:            2.2,
    speedMax:           0.28,
    connectionDist:     130,
    connectionOpacity:  0.1,
  };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.init(); }

    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * CONFIG.speedMax * 2;
      this.vy = (Math.random() - 0.5) * CONFIG.speedMax * 2;
      this.r  = CONFIG.sizeMin + Math.random() * (CONFIG.sizeMax - CONFIG.sizeMin);
      this.a  = 0.15 + Math.random() * 0.45;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, ${this.a})`;
      ctx.fill();
    }
  }

  function buildParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) particles.push(new Particle());
  }

  function drawConnections() {
    const len = particles.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectionDist) {
          const alpha = (1 - dist / CONFIG.connectionDist) * CONFIG.connectionOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    rafId = requestAnimationFrame(loop);
  }

  resize();
  buildParticles();
  loop();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(rafId);
      resize();
      buildParticles();
      loop();
    }, 150);
  });
})();


/* ============================================================
   TYPING ANIMATION
   ============================================================ */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Cyber Security Student',
    'Aspiring SOC Analyst',
    'Network Security Enthusiast',
    'Ethical Hacker in Training',
    'Cloud Security Explorer',
    'Security-First Thinker',
  ];

  let pIdx   = 0;
  let cIdx   = 0;
  let deleting = false;
  let timeout;

  function tick() {
    const phrase = phrases[pIdx];

    if (deleting) {
      cIdx--;
      el.textContent = phrase.substring(0, cIdx);
    } else {
      cIdx++;
      el.textContent = phrase.substring(0, cIdx);
    }

    let delay = deleting ? 55 : 95;

    if (!deleting && cIdx === phrase.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      delay = 350;
    }

    timeout = setTimeout(tick, delay);
  }

  setTimeout(tick, 900);
})();


/* ============================================================
   NAVIGATION: scroll effect, mobile toggle, active link
   ============================================================ */
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!nav) return;

  const navLinkEls = links ? links.querySelectorAll('.nav__link') : [];

  /* Scroll class */
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile toggle */
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* Close mobile nav on link click */
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      links?.classList.remove('open');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active link tracking */
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function updateActiveLink() {
    const offset = window.scrollY + nav.offsetHeight + 60;
    let current  = '';

    sections.forEach(section => {
      if (offset >= section.offsetTop) current = section.id;
    });

    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  updateActiveLink();
})();


/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      /* Stagger siblings within same parent */
      const siblings = Array.from(entry.target.parentElement?.children ?? []);
      const idx      = siblings.indexOf(entry.target);
      const delay    = Math.min(idx * 90, 360);

      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ============================================================
   COUNTER ANIMATION (Stats section)
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.stats__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target ?? '0', 10);
    const duration = 1600;
    const start    = performance.now();

    function frame(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const eased    = 1 - Math.pow(1 - progress, 3);

      el.textContent = Math.round(eased * target);

      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target;
    }

    requestAnimationFrame(frame);
  }
})();


/* ============================================================
   SMOOTH SCROLLING (respects reduced motion)
   ============================================================ */
(function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navH   = document.getElementById('nav')?.offsetHeight ?? 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH - 12;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  });
})();


/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   CONTACT FORM (demo behaviour — wire to Formspree or EmailJS
   for real email delivery)
   ============================================================ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const note    = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Basic client-side validation */
    const name    = form.name?.value.trim();
    const email   = form.email?.value.trim();
    const subject = form.subject?.value.trim();
    const message = form.message?.value.trim();

    if (!name || !email || !subject || !message) {
      if (note) { note.style.color = '#ef4444'; note.textContent = 'Please fill in all fields.'; }
      return;
    }

    /* Disable button and show sending state */
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
    }
    if (note) { note.style.color = ''; note.textContent = ''; }

    /* TODO: Replace this timeout with a real fetch() to your Formspree/EmailJS endpoint.
       Example (Formspree):
       fetch('https://formspree.io/f/YOUR_FORM_ID', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name, email, subject, message }),
       })
       .then(res => { if (res.ok) showSuccess(); else showError(); })
       .catch(() => showError());
    */
    setTimeout(() => {
      showSuccess();
    }, 1200);
  });

  function showSuccess() {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #06d6a0, #059669)';
      submitBtn.style.borderColor = '#06d6a0';
    }
    if (note) {
      note.style.color = '#06d6a0';
      note.textContent = "Thanks — I'll get back to you as soon as possible.";
    }
    form.reset();

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Send Message';
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
      }
      if (note) note.textContent = '';
    }, 4000);
  }

  function showError() {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Send Message';
    }
    if (note) {
      note.style.color = '#ef4444';
      note.textContent = 'Something went wrong. Please email me directly.';
    }
  }
})();
