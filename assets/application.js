/* ============================================================
   FUTURETECH — MAIN JAVASCRIPT
   Scroll effects · Counter animations · Reveal · Cart
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header shadow ── */
  const header = document.querySelector('.ft-site-header, .site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = scrollY > 20
        ? '0 4px 30px rgba(0,240,255,.07)'
        : 'none';
    }, { passive: true });
  }

  /* ── Counter animation ── */
  function animateCounter(el) {
    const raw = parseInt(el.dataset.count);
    if (isNaN(raw)) return;
    const isK = raw >= 1000;
    let start = 0;
    const step = raw / 55;
    const timer = setInterval(() => {
      start += step;
      if (start >= raw) {
        el.textContent = isK ? Math.round(raw / 1000) + 'K+' : raw + '+';
        clearInterval(timer);
      } else {
        const v = Math.floor(start);
        el.textContent = isK ? Math.round(v / 1000) + 'K+' : v + '+';
      }
    }, 22);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* ── Scroll reveal ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, (i % 6) * 75);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  const revealTargets = [
    '.ft-why__card', '.product-card', '.ft-testi__card',
    '.ft-cat-card', '.supplier-card', '.ft-stat-block',
    '.feature-card', '.testimonial-card', '.cat-card'
  ].join(',');

  document.querySelectorAll(revealTargets).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    revealObs.observe(el);
  });

  /* ── Tab filter (products) ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ── Cart counter ── */
  const cartCount = document.querySelector('.ft-cart-count, .cart-count');
  if (cartCount) {
    document.querySelectorAll('[href*="cart"], .btn-primary').forEach(btn => {
      btn.addEventListener('click', e => {
        const count = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = count + 1;
        cartCount.style.transform = 'scale(1.5)';
        setTimeout(() => cartCount.style.transform = '', 300);
      });
    });
  }

  /* ── Mobile menu toggle ── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }

});
