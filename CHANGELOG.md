# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
