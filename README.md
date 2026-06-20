# isabellanunes.dev

![Languages](https://img.shields.io/github/languages/count/isadfrn/isabellanunes.dev?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/isadfrn/isabellanunes.dev?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/isadfrn/isabellanunes.dev?style=flat-square)

Personal website and portfolio for [Isabella Nunes](https://isabellanunes.dev) — Software Engineer with over 10 years of experience in full stack development, architecture, and automation.

## About the Project

A bilingual static application (Portuguese and English) that brings together career, education, projects, publications, and blog content in one place. Content is defined in TypeScript and Markdown files, with no database.

### Sections

| Section | Description |
| ------- | ----------- |
| Home | Introduction and professional subtitle |
| About | Bio, achievements, and interests |
| Career | Professional experience timeline |
| Education | Academic background |
| Courses | Certifications and courses with links |
| Books | Recommendations with affiliate links |
| Projects | Portfolio with GitHub repositories |
| Publications | Articles and academic work |
| Blog | Markdown posts (PT/EN) |

### Features

- Internationalization (PT-BR default, EN) with prefixed routes (`/pt/`, `/en/`)
- Light and dark mode
- Responsive layout (mobile and desktop)
- Navigation with hamburger menu and breadcrumbs
- Feature flags to show or hide sections in real time
- Automatic sitemap

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

## Project Structure

```
src/
├── components/          # Astro and React components
│   ├── Breadcrumb.tsx
│   ├── FeatureFlagsAdmin.tsx
│   ├── HamburgerMenu.tsx
│   ├── ThemeToggle.tsx
│   └── ...
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
├── i18n/                # UI translations
├── layouts/             # BaseLayout, PostLayout
├── lib/                 # Feature flags
├── pages/
│   ├── [locale]/        # Localized routes
│   └── index.astro      # Root redirect
└── styles/
    └── global.css
```

## Feature Flags

Menu sections can be toggled on or off from the admin panel. Preferences are saved in the browser's `localStorage`. Useful for hiding pages under construction without changing code.

## License

[MIT](./LICENSE)
