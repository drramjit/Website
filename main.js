/* ===== Mobile navigation ===== */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
    });
  }
})();

/* ===== Scroll reveal ===== */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ===== Publication filter ===== */
(function () {
  const bar = document.querySelector('.pub-filter');
  if (!bar) return;
  const items = document.querySelectorAll('.pub');
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    bar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(it => {
      it.style.display = (f === 'all' || it.dataset.type === f) ? '' : 'none';
    });
  });
})();

/* ===== Contact form (front-end only) ===== */
(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status.textContent = 'Thank you — your message has been noted. Ramjit typically replies within a few working days.';
    status.style.color = '#7a2230';
    form.reset();
  });
})();

/* ===== Footer year ===== */
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
