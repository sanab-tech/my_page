(function () {
  'use strict';

  const header = document.getElementById('header');
  const navBurger = document.getElementById('navBurger');
  const navList = document.getElementById('navList');
  const contactForm = document.getElementById('contactForm');
  const casesGrid = document.getElementById('casesGrid');

  function initHeader() {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  function initNav() {
    navBurger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navBurger.classList.toggle('active', isOpen);
      navBurger.setAttribute('aria-expanded', isOpen);
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
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const contact = contactForm.contact.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !contact || !message) return;

      const successEl = document.getElementById('formSuccess');
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
    if (window.PROJECTS_DATA) {
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
    if (!casesGrid || !projects?.length) {
      if (casesGrid) {
        casesGrid.innerHTML = '<p class="cases__empty">Не удалось загрузить кейсы. Обновите страницу.</p>';
      }
      return;
    }

    casesGrid.innerHTML = projects
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .map((project) => {
          const featuredClass = project.featured ? ' case-card--featured' : '';
          const toolsHtml = project.tools
            .map((t) => `<span class="case-card__tool">${t}</span>`)
            .join('');

          const imageStyle = project.image
            ? `background-image: url('${encodePath(project.image)}')`
            : `background-image: ${project.gradient}`;

          const imageAlt = project.image
            ? ` role="img" aria-label="${project.title}"`
            : ' aria-hidden="true"';

          const imageClass = [
            project.featured && project.image ? ' case-card__image--screenshot' : '',
            project.imageFit === 'contain' ? ' case-card__image--banner' : '',
          ].join('');

          return `
            <article class="case-card${featuredClass}">
              <div class="case-card__image${imageClass}"${imageAlt} style="${imageStyle}"></div>
              <div class="case-card__body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="case-card__tools">${toolsHtml}</div>
                <a href="#contact" class="case-card__link">
                  Подробнее
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
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
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  initHeader();
  initNav();
  initForm();
  initSmoothAnchors();
  loadCases();
})();
