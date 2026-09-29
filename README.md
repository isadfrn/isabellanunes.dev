# isabellanunes.dev

![Languages](https://img.shields.io/github/languages/count/isadfrn/isabellanunes.dev?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/isadfrn/isabellanunes.dev?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/isadfrn/isabellanunes.dev?style=flat-square)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)

Personal website and portfolio for [Isabella Nunes](https://isabellanunes.dev).

## About the Project

A bilingual static application (Portuguese and English) that brings together career, education, projects, publications, and blog content in one place. Content is defined in TypeScript and Markdown files, with no database.

### Sections

The home page (`/pt/`, `/en/`) currently renders only the full-screen hero (image, greeting, and subtitle) with no scrolling. The remaining sections below are implemented — markup, data, and translations all still exist — but are switched off in `src/config/sections.ts`. Blog remains its own set of pages, still reachable directly even while its home-page preview is off.

| Section | Description |
| ------- | ----------- |
| Home | Full-screen hero image, introduction, and professional subtitle |
| About | Bio, achievements, and interests |
| Career | Professional experience timeline |
| Education | Academic background |
| Courses | Certifications and courses with links |
| Books | Recommendations with affiliate links |
| Projects | Portfolio with GitHub repositories |
| Publications | Articles and academic work |
| Blog | Markdown posts (PT/EN), separate listing and post pages |

### Features

- Internationalization (PT-BR default, EN) with prefixed routes (`/pt/`, `/en/`)
- Light and dark mode
- Responsive layout (mobile and desktop)
- Hamburger menu on blog pages with language switch and theme toggle (not shown on the home page)
- Sections are toggled on/off at build time via `ENABLED_SECTIONS` in `src/config/sections.ts` — no runtime flags or admin UI
- Automatic sitemap
- Conventional commit messages enforced with commitlint + Husky, changelog generated with commit-and-tag-version

## Technologies

- [Astro 6](https://astro.build/) — main framework (SSG)
- [React 19](https://react.dev/) — interactive components (islands)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) — accessible primitives (dialog, navigation menu, toggle)
- [Heroicons](https://heroicons.com/)
- [MDX](https://mdxjs.com/) and [Marked](https://marked.js.org/) — blog content

## Requirements

- [Node.js 22.12+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation and Usage

**Install dependencies:**

```bash
npm install
```

**Run in development mode:**

```bash
npm run dev
```

The application will be available at `http://localhost:4321`.

**Production build:**

```bash
npm run build
npm run preview
```

**Lint and formatting:**

```bash
npm run lint
npm run lint:fix
npm run format
```

**Testing:**

```bash
npm run test           # run once
npm run test:watch     # watch mode
npm run test:coverage  # run with coverage report
```

Vitest is configured via `vitest.config.ts` (sharing Astro's aliases and Vite plugins), with [Testing Library](https://testing-library.com/) and `jsdom` for component and hook tests. `@vitest/coverage-v8` enforces a 95% minimum across statements, branches, functions, and lines — `npm run test:coverage` fails the moment any of them drops below that. The coverage badge above is updated by hand from the `% Lines` total in that command's summary; it isn't wired to CI yet.

## Project Structure

```
src/
├── components/          # Astro and React components
│   ├── scene/           # The interactive desktop scene: stage, hotspots, desk windows, computer OS
│   ├── mobile/          # The scrolling feed phones get instead of the scene
│   ├── Breadcrumb.tsx
│   ├── HamburgerMenu.tsx
│   └── ...
├── config/              # Canonical config
│   ├── scene.ts         # The scene as data: positions, sizes, visuals, hotspots, actions
│   ├── scene.types.ts   # The shapes that data may take
│   ├── scene.geometry.ts# Stage pixels -> CSS
│   ├── scene.actions.ts # Action -> hotspot element
│   └── sections.ts      # Section/nav key registry and ENABLED_SECTIONS
├── data/                # Content per section (pt/en); portfolio.ts gathers it for the home page
├── hooks/               # Shared React hooks (useScrollSpy)
├── i18n/                # UI translations
├── layouts/             # BaseLayout, PostLayout
├── pages/
│   ├── [locale]/        # Localized routes (home, blog, 404)
│   ├── 404.astro        # Fallback 404 (default locale)
│   └── index.astro      # Root redirect
├── scripts/             # Client-side TypeScript: the scene, reveal-on-scroll (bundled by Astro, no inline scripts)
└── styles/
    ├── global.css       # Entry point: imports the files below
    ├── theme.css        # Color tokens, dark variant, base/reset
    ├── prose.css        # Markdown typography
    ├── scene.css        # Stage, layers, hotspots, beams, desk windows, computer desktop
    └── animations.css   # Everything that moves: reveal, weather, steam, fish, printer
```

## Section Visibility

Sections are enabled or disabled at build time, not per visitor. `ENABLED_SECTIONS` in `src/config/sections.ts` is the single source of truth: add a section's key to that array to render it again, remove it to switch it off. A disabled section disappears everywhere at once — the mobile feed, the mobile menu, the desktop computer's program menu and program window, and (for books) the shelf hotspot. The section's markup, data, and translations stay in the codebase either way — nothing is deleted when a section is disabled.

## The Home Scene

On `sm` screens and up, the home page is an interactive 2.5D scene (a 2752×1536 stage scaled to cover the viewport); below that it is the classic scrolling feed. The scene is described entirely by data in `src/config/scene.ts` — to move, scale or re-wire an object, edit its entry in `SCENE_ITEMS`; no component or script changes:

```ts
{
  id: "lamp",
  x: 963, y: 929, width: 162, height: 271,                 // position and size (stage px)
  visuals: [                                                // what is drawn, back to front
    { type: "image", src: "/images/light.png" },
    { type: "beam", target: "lamp", beam: { /* ... */ } },
  ],
  interaction: {                                            // what a click does
    labelKey: "lampToggleLabel",                            // accessible name (src/i18n)
    hotspot: { x: 0.72, y: 0.23, size: 0.5 },               // glow, as fractions of the item
    action: { type: "toggle", target: "lamp" },
  },
}
```

Actions are `toggle` (lights/screens sharing a `target`), `open-window`, `open-link` and `run-printer`. Visuals are `image`, `weather`, `custom`, `beam`, `screen`, `steam` and `rig` (the printer; its print time is `durationMs`). The intro timing is `SCENE_REVEAL`.

Behavior lives in `src/scripts/`: one listener on the scene root routes clicks by `data-action` (`sceneController.ts`), with the desk windows, the printer, the computer's desktop and the clock in their own modules. `lifecycle.ts` sets everything up on each page and tears it down (listeners, timers, observers) before the Astro router swaps the page. `src/scripts/markup.test.ts` fails if the markup and the scripts drift apart.

Missing pages get a localized 404: `pages/[locale]/404.astro` is served by nginx for anything missing under `/en/` (see `nginx.conf`), and `/404.html` (Portuguese) is the fallback for everything else.

## License

[MIT](./LICENSE)
