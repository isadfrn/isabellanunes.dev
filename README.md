# isabellanunes.dev

![Languages](https://img.shields.io/github/languages/count/isadfrn/isabellanunes.dev?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/isadfrn/isabellanunes.dev?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/isadfrn/isabellanunes.dev?style=flat-square)
![Coverage](https://img.shields.io/badge/coverage-0%25-red?style=flat-square)

Personal website and portfolio for [Isabella Nunes](https://isabellanunes.dev).

## About the Project

A bilingual static application (Portuguese and English) that brings together career, education, projects, publications, and blog content in one place. Content is defined in TypeScript and Markdown files, with no database.

### Sections

The home page (`/pt/`, `/en/`) is a single scrolling page with a full-bleed hero image and the sections below, reached via smooth scroll instead of separate routes. Blog remains its own set of pages.

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
- Always-collapsed hamburger menu (desktop and mobile) with smooth scroll-to-section navigation and scroll-spy active state
- Feature flags to show or hide sections in real time
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

Vitest is configured (via `vitest.config.ts`, sharing Astro's aliases and Vite plugins) but no test files exist yet — `npm run test` passes with zero tests so the command stays usable as suites are added. The coverage badge above is updated by hand from the `% Lines` total in `npm run test:coverage`'s summary; it isn't wired to CI yet.

## Project Structure

```
src/
├── components/          # Astro and React components
│   ├── Breadcrumb.tsx
│   ├── FeatureFlagsAdmin.tsx
│   ├── HamburgerMenu.tsx
│   ├── ThemeToggle.tsx
│   └── ...
├── config/              # Canonical config, e.g. the section/nav key registry
├── data/                # Content per section (pt/en)
│   ├── about/
│   ├── blog/
│   ├── books/
│   ├── career/
│   ├── courses/
│   ├── education/
│   ├── home/
│   ├── projects/
│   └── publications/
├── hooks/               # Shared React hooks (useScrollSpy, useVisibleNavItems)
├── i18n/                # UI translations
├── layouts/             # BaseLayout, PostLayout
├── lib/                 # Section visibility preferences (local storage)
├── pages/
│   ├── [locale]/        # Localized routes
│   └── index.astro      # Root redirect
└── styles/
    └── global.css
```

## Section Visibility

Menu sections can be toggled on or off from the `/admin/flags` panel. Preferences are saved to that browser's `localStorage` only — they are a per-device preference, not a shared flag, so they don't affect what other visitors see. Useful for hiding pages under construction on your own machine without changing code.

## License

[MIT](./LICENSE)
