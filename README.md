# Arena — Rock Paper Scissors

A full-viewport split-screen rock paper scissors match. First to 3
wins takes the match. Streaks are tracked, every round is logged,
and victory or defeat floods the entire screen in color.

Built as an original reimagining of the freeCodeCamp Rock Paper
Scissors Game project.

## Live Demo

[View Live](https://simeonatarr231.github.io/arena/)

---

## About

Arena breaks from the card-and-header layout used across the rest of
this portfolio. There is no header, no footer, no centered content
column — the entire viewport is the interface. Two solid color halves
represent player and rival. Choosing rock, paper, or scissors triggers
a full-screen color flood announcing the round's outcome. A slide-out
panel logs every round of the match, and a match concludes the moment
either side reaches 3 wins.

The project was designed and built from scratch — original concept,
original full-bleed UI, original design system, real Lucide icon
integration. The only thing shared with the freeCodeCamp curriculum
is the underlying JavaScript objective: random computer choice
generation and win/lose/draw comparison logic.

---

## Features

- Best-of-5 match structure — first to 3 round wins takes the match
- Full-screen color-flood result state for every round
- Consecutive win streak detection and live display
- Slide-out match log tracking every round's choices and outcome
- Real Lucide SVG icons throughout — no emoji, no placeholder graphics
- Rematch flow that fully resets match state
- Responsive down to mobile

---

## Built With

- HTML5 — semantic structure
- CSS3 — CSS Grid split-screen layout, full-viewport overlays,
  slide transitions
- Vanilla JavaScript — Math.random(), comparison logic, match state
  management, dynamic icon injection
- Lucide — SVG icon library
- Google Fonts — Archivo Black, JetBrains Mono

---

## JavaScript Concepts Practiced

- Math.random() and Math.floor() for randomized computer choice
- Object-based win condition mapping (CHOICES.beats)
- Multi-outcome comparison logic (win / lose / draw)
- Match-level state distinct from round-level state
- Streak detection across consecutive rounds
- requestAnimationFrame for reliable transition triggering
- Dynamic data-lucide attribute injection with re-render calls
- Array.prepend() for newest-first list ordering
- Ternary chaining for multi-branch text output

---

## Project Structure

arena/
├── index.html — full-viewport semantic structure
├── style.css — split-screen layout, result flood, log panel
├── script.js — game logic, match state, Lucide integration
└── README.md — project documentation

---

## Local Setup

```bash
git clone https://github.com/SimeonATarr231/arena.git
cd arena
```

Open `index.html` in your browser. Requires an internet connection
for Google Fonts and the Lucide icon CDN script.

---

## Designed & Built by [Simeon Aseon Tarr](https://github.com/SimeonATarr231)

© 2025 Tarr. All rights reserved.
