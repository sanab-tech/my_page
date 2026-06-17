(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline
    .from('.hero__badge', { y: 30, opacity: 0, duration: 1 }, 0.5)
    .from('.hero__title', { y: 40, opacity: 0, duration: 0.9 }, 0.7)
    .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, 1.0)
    .from('.hero__actions', { y: 20, opacity: 0, duration: 0.7 }, 1.2);

  gsap.utils.toArray('.hero__shape').forEach((shape, i) => {
    const inner = shape.querySelector('.hero__shape-inner');

    gsap.from(shape, {
      opacity: 0,
      y: -120,
      duration: 2.2,
      delay: 0.3 + i * 0.15,
      ease: 'power3.out',
    });

    if (inner) {
      gsap.to(inner, {
        y: 15,
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1 + i * 0.4,
      });
    }
  });

  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.process__step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out',
    });
  });

  window.animateCaseCards = function () {
    gsap.utils.toArray('#casesGrid .case-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power3.out',
      });
    });
    ScrollTrigger.refresh();
  };

  gsap.to('.hero__bg-gradient', {
    opacity: 0.85,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  const vennCircles = document.querySelectorAll('.venn__circle');
  if (vennCircles.length) {
    gsap.from(vennCircles, {
      scrollTrigger: {
        trigger: '.venn',
        start: 'top 80%',
      },
      scale: 0.6,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.5)',
    });

    gsap.from('.venn__center', {
      scrollTrigger: {
        trigger: '.venn',
        start: 'top 75%',
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: 0.5,
      ease: 'back.out(2)',
    });
  }
})();
