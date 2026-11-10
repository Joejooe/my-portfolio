# Joe Abednego — Portfolio

Personal portfolio of Joe Abednego, a Computer Science student at BINUS University and front-end developer (Vue.js). It covers an about section, internship experience at Superspring, selected projects and contact links.

## Tech Stack

- [Vue 3](https://vuejs.org/) with `<script setup>` and TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Bun](https://bun.sh/) for package management

## Design

Dark theme built on two loud colors and an accent:

| Role   | Color     |
| ------ | --------- |
| Base   | `#03203D` |
| Loud   | `#EB2F33` |
| Accent | `#639CC5` |

The palette, fonts (Space Grotesk, JetBrains Mono) and animations are defined in the `@theme` block of `src/style.css`.

## Getting Started

```bash
bun install
bun run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `bun run dev`     | Start the dev server              |
| `bun run build`   | Type-check and build to `dist/`   |
| `bun run preview` | Preview the production build      |

## Project Structure

```
src/
├── App.vue          # Page layout and all sections (Tailwind utility classes)
├── data.ts          # Content: projects, internship, skills, social links
├── style.css        # Tailwind import, theme tokens, base styles
├── main.ts          # App entry
└── assets/images/   # Portrait photo
```

## Editing Content

Most text lives in `src/data.ts`:

- `projects` — project cards (title, summary, tags, links)
- `internship` — role details and highlights
- `skillGroups` — technical skills
- `links` — WhatsApp, GitHub and LinkedIn URLs

The hero and About copy are in `src/App.vue`. To change the portrait, replace `src/assets/images/joe.jpeg`.
