(function () {
  'use strict';

  const header = document.getElementById('header');
  const navBurger = document.getElementById('navBurger');
  const navList = document.getElementById('navList');
  const contactForm = document.getElementById('contactForm');
  const casesGrid = document.getElementById('casesGrid');

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initHeader() {
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  function initNav() {
    if (!navBurger || !navList) return;

    navBurger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navBurger.classList.toggle('active', isOpen);
      navBurger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navList.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navBurger.classList.remove('active');
        navBurger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  function initForm() {
    if (!contactForm) return;

    const nameInput = contactForm.querySelector('#name');
    const contactInput = contactForm.querySelector('#contactInfo');
    const messageInput = contactForm.querySelector('#message');
    const successEl = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const contact = contactInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !contact || !message) {
        contactForm.reportValidity();
        return;
      }

      successEl.hidden = false;
      contactForm.reset();

      setTimeout(() => {
        successEl.hidden = true;
      }, 5000);
    });
  }

  function encodePath(path) {
    return path.split('/').map(encodeURIComponent).join('/');
  }

  async function getProjects() {
    if (window.PROJECTS_DATA?.length) {
      return window.PROJECTS_DATA;
    }

    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Failed to load projects');
      return await response.json();
    } catch {
      return null;
    }
  }

  function renderCases(projects) {
    if (!casesGrid) return;

    if (!projects?.length) {
      casesGrid.innerHTML = '<p class="cases__empty">Не удалось загрузить кейсы. Обновите страницу.</p>';
      return;
    }

    casesGrid.innerHTML = projects
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      .map((project) => {
        const featuredClass = project.featured ? ' case-card--featured' : '';
        const toolsHtml = (project.tools || [])
          .map((t) => `<span class="case-card__tool">${escapeHtml(t)}</span>`)
          .join('');

          const imageClass = [
            project.featured && project.image && project.imageFit !== 'contain'
              ? ' case-card__image--screenshot'
              : '',
            project.imageFit === 'contain' ? ' case-card__image--contain' : '',
            !project.image && project.gradient ? ' case-card__image--gradient' : '',
          ].join('');

        const imageContent = project.image
          ? `<img src="${encodePath(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" width="800" height="500">`
          : '';

        const imageStyle = !project.image && project.gradient
          ? ` style="background-image: ${project.gradient}"`
          : '';

        const imageAria = !project.image ? ' aria-hidden="true"' : '';

        return `
          <article class="case-card${featuredClass}">
            <div class="case-card__image${imageClass}"${imageAria}${imageStyle}>${imageContent}</div>
            <div class="case-card__body">
              <h3>${escapeHtml(project.title)}</h3>
              <p>${escapeHtml(project.description)}</p>
              <div class="case-card__tools">${toolsHtml}</div>
              <a href="#contact" class="case-card__link">
                Подробнее
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </article>
        `;
      })
      .join('');

    if (typeof window.animateCaseCards === 'function') {
      window.animateCaseCards();
    }
  }

  async function loadCases() {
    const projects = await getProjects();
    renderCases(projects);
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  initHeader();
  initNav();
  initForm();
  initSmoothAnchors();
  loadCases();
})();
