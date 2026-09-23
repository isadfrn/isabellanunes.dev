# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 0.0.2 (2026-09-23)

### Features

* add base project ([a3bac59](https://github.com/isadfrn/isabellanunes/commit/a3bac59fd8489fbabbb406a505e109040cb9f7b9))
* add base project ([78fc875](https://github.com/isadfrn/isabellanunes/commit/78fc87559a80ab229d6dd7bacb33740a3d9d4726))
* add new background image for homepage ([a260bf0](https://github.com/isadfrn/isabellanunes/commit/a260bf0fb7b349eb025f050d43f6743aec11bf48))
* add new content and remoe unused vars ([6bf7978](https://github.com/isadfrn/isabellanunes/commit/6bf79783dfe3eb9291bcf70f2da015d9e8973002))
* add readme extension ([ffd777c](https://github.com/isadfrn/isabellanunes/commit/ffd777cbc1892d0e96b5cf50f0029861415cfdf9))
* add readme info ([74b7612](https://github.com/isadfrn/isabellanunes/commit/74b76122742bb2609f9d5a906a92fce758211b83))
* adjsut build ([d3b4721](https://github.com/isadfrn/isabellanunes/commit/d3b4721fcc977f8f7b0ebfaef8f0830d4f4ac639))
* change password to stdin ([755ffa7](https://github.com/isadfrn/isabellanunes/commit/755ffa736ebd2c8c0fd93390067b5afcd5f458c6))
* enhance HamburgerMenu with active section tracking and remove useIsDesktop hook ([255d0fc](https://github.com/isadfrn/isabellanunes/commit/255d0fc3c1e95c33a8923e43519e7e7aed1e0e9c))
* fix website description ([00345a9](https://github.com/isadfrn/isabellanunes/commit/00345a98336ff6c66a12ffb74136edfbc94fadc8))
* integrate Vitest for testing and coverage reporting; add new components and update existing ones for improved structure and functionality ([f5c42d9](https://github.com/isadfrn/isabellanunes/commit/f5c42d9608d3e2cc38d5604b6ac0a5b185d1fc24))
* restructure homepage and blog layout; add new sections for about, career, education, and courses ([284cc53](https://github.com/isadfrn/isabellanunes/commit/284cc5310c90e8f621af01f8698d8b2216fd210b))
* update blog post titles and content for clarity and engagement ([43dbab3](https://github.com/isadfrn/isabellanunes/commit/43dbab33dc9ce01b12f85ae3f5e66e82c3508c58))
* update favicon ([4b4d3ad](https://github.com/isadfrn/isabellanunes/commit/4b4d3ad4a23805ada8e0c3d6e4a932f44037c445))
* update global CSS variables for a new color theme, enhancing visual aesthetics with primary, accent, teal, slate, and stone color palettes ([b90d22d](https://github.com/isadfrn/isabellanunes/commit/b90d22d897e9e4fd9f44a7565f96938b612bebf4))
* update security issues ([1ebdad5](https://github.com/isadfrn/isabellanunes/commit/1ebdad50c6bc5002be109f056c74810735f80224))

### Bug Fixes

* defer initReveal to DOMContentLoaded and use server-side root redirect ([1d341e5](https://github.com/isadfrn/isabellanunes/commit/1d341e5ddf787f201e54a06757142ec3c1c0a90c))
* remove -t ed25519 from ssh-keyscan to avoid exit code 1 ([d81fa80](https://github.com/isadfrn/isabellanunes/commit/d81fa80c0425113c324151b36666ff59105ff2a5))
* use ssh-keyscan for host verification in deploy ([cbd8e71](https://github.com/isadfrn/isabellanunes/commit/cbd8e71fc8e985fdd93628fcd3a7f0bb33a20e32))

## [0.0.1] - 2026-06-18

### Added

- Bilingual personal site (PT/EN) built with Astro 6, React, and Tailwind CSS 4
- Sections: home, about, career, education, courses, books, projects, publications, and blog
- Content structured in TypeScript and Markdown files per locale
- Light/dark mode with `ThemeToggle`
- Responsive navigation with hamburger menu and breadcrumbs
- Career timeline and cards for projects, courses, and books
- Blog with Markdown posts and MDX support
- Feature flags to show or hide sections via `/admin/flags` panel
- Automatic sitemap with `@astrojs/sitemap`
- Multi-stage Dockerfile (Node build + nginx)
- HTTP Basic authentication on the admin panel with runtime credentials (`generate-htpasswd.sh`)
- Security headers in nginx (`X-Content-Type-Options`, `X-Frame-Options`, etc.)
- GitHub Actions deploy workflow (build, push to GHCR, deploy to VPS via SSH)
- Custom favicon
- ESLint and Prettier configuration

### Changed

- Migrated deployment from PM2 to Docker container with nginx
- Server-side root redirect (`/`) to `/pt/` via nginx
- Admin credentials generated via stdin (`htpasswd -i`) instead of command-line argument

### Fixed

- Deferred `initReveal` to `DOMContentLoaded` to avoid errors before the DOM is ready
- SSH host verification in deploy with `ssh-keyscan` (removed incompatible `-t` flag)
- Build adjustments and removal of unused variables

[Unreleased]: https://github.com/isadfrn/isabellanunes.dev/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/isadfrn/isabellanunes.dev/releases/tag/v0.0.1
