# isabellanunes.dev

Personal portfolio website built with [Astro](https://astro.build), featuring internationalization (PT/EN), dark/light theme, and markdown-based blog.

## Tech Stack

- **Framework:** Astro v5 with TypeScript
- **UI Components:** React + Radix UI primitives
- **Icons:** Lucide React
- **Styling:** CSS custom properties with theme system
- **Content:** Astro Content Collections (Markdown/MDX)
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Linting:** ESLint + Prettier

## Project Structure

```
src/
├── components/       # React + Astro UI components
├── content/          # Blog posts (Markdown)
│   └── blog/
│       ├── en/       # English posts
│       └── pt/       # Portuguese posts
├── data/             # Static data (career, education, projects)
├── i18n/             # Internationalization system
│   └── locales/      # Translation files (pt.json, en.json)
├── layouts/          # Astro layouts (Base, Post)
├── pages/            # Route pages
│   ├── en/           # English routes
│   └── pt/           # Portuguese routes
├── styles/           # Global CSS and theme
└── types/            # TypeScript type definitions
```

## Features

- **Hamburger Menu:** Fixed left sidebar with navigation, theme toggle, and language switcher
- **i18n:** Portuguese and English with easy extensibility
- **Dark/Light Theme:** Persisted via localStorage, respects system preference
- **Blog:** Markdown-based with tags, dates, YouTube embeds, code snippets, images
- **Timeline:** Career and Education pages with timeline component
- **Cards:** Projects and Blog listings with card grid layout
- **Breadcrumb:** Detail pages include breadcrumb navigation
- **Full-screen Pages:** Each page occupies the full viewport height

## Commands

| Command             | Action                                      |
| :------------------ | :------------------------------------------ |
| `npm install`       | Install dependencies                        |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview build locally                       |
| `npm run lint`      | Run ESLint                                  |
| `npm run lint:fix`  | Run ESLint with auto-fix                    |
| `npm run format`    | Format with Prettier                        |
| `npm run test`      | Run unit tests (Vitest)                     |
| `npm run test:e2e`  | Run e2e tests (Playwright)                  |

## Adding a New Language

1. Create a new translation file: `src/i18n/locales/{lang}.json`
2. Import it in `src/i18n/index.ts` and add to the `translations` record
3. Add the locale to the `Locale` type and `locales` array in `src/types/index.ts`
4. Add the locale to `astro.config.mjs` i18n config
5. Create page directories under `src/pages/{lang}/`
6. Add data files under `src/data/*/` for the new locale

## Adding a Blog Post

Create a new `.md` file in `src/content/blog/{locale}/`:

```markdown
---
title: 'Post Title'
description: 'Brief description'
pubDate: 2025-03-01
tags: ['tag1', 'tag2']
image: '/images/blog/my-post.jpg'
locale: 'en'
---

Your content here...
```
