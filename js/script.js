/* Light-weight interactions: theme, menu, form feedback */
(() => {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('toggleTheme');
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  // theme detection & persistence
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'dark'); // default dark for the futuristic look
    htmlEl.setAttribute('data-theme', initial);
    if (themeBtn) themeBtn.textContent = initial === 'dark' ? '☀️' : '🌙';
  } catch (e) { /* ignore storage errors */ }

  if (themeBtn) themeBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // responsive nav
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const opened = siteNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', opened);
    });
    // close when click outside
    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        siteNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // form submit (cadastro) - client feedback only
  const cadastro = document.getElementById('cadastroForm');
  if (cadastro) {
    cadastro.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = cadastro.querySelector('#nome')?.value || '';
      const msg = name ? `✅ Obrigado, ${name}! Seu cadastro foi recebido.` : '✅ Cadastro recebido! Obrigado por apoiar a ONG AVANÇA.';
      // small custom toast
      window.alert(msg);
      cadastro.reset();
    });
  }

})();
