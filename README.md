# Портфолио Оксаны

Одностраничный сайт-портфолио: дизайн, разработка и AI-инструменты.

## Структура проекта

```
my_page/
├── index.html
├── css/style.css
├── js/
│   ├── main.js
│   ├── animations.js
│   └── webgl.js
├── assets/
│   ├── images/photo.jpg
│   └── resume.pdf          ← добавьте своё резюме
├── data/projects.json
└── README.md
```

## Запуск

Откройте `index.html` в браузере или запустите локальный сервер:

```bash
npx serve .
```

> Для корректной загрузки кейсов из `data/projects.json` нужен локальный сервер (не `file://`).

## Что настроить

1. **Резюме** — положите файл `resume.pdf` в `assets/`
2. **Контакты** — замените ссылки Telegram, ВКонтакте и email в блоке «Контакты»
3. **Кейсы** — отредактируйте `data/projects.json`, добавьте изображения проектов
4. **Личная история** — заполните блок в секции «Обо мне»

## Технологии

- HTML5, CSS3, JavaScript ES6+
- Three.js (WebGL-сфера в Hero)
- GSAP + ScrollTrigger (анимации)

## SEO

Title и meta description настроены согласно техническому заданию.
