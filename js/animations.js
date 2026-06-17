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
    .from('.hero__tag', { y: 30, opacity: 0, duration: 0.7 })
    .from('.hero__title', { y: 40, opacity: 0, duration: 0.9 }, '-=0.4')
    .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero__actions', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');

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

  gsap.utils.toArray('.case-card').forEach((card, i) => {
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

  gsap.to('.hero__glow--cyan', {
    x: 30,
    y: -20,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.hero__glow--violet', {
    x: -20,
    y: 30,
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
