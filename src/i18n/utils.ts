import type { NavItem } from '@/types';
import { getTranslations, getLocalizedPath, getAlternateLocale } from './index';

const NAV_KEYS = ['home', 'about', 'career', 'education', 'projects', 'blog'] as const;
const NAV_PATHS: Record<(typeof NAV_KEYS)[number], string> = {
  home: '/',
  about: '/about',
  career: '/career',
  education: '/education',
  projects: '/projects',
  blog: '/blog',
};

export function getNavItems(locale: string): NavItem[] {
  const t = getTranslations(locale);
  return NAV_KEYS.map((key) => ({
    key,
    href: getLocalizedPath(NAV_PATHS[key], locale),
    label: t.nav[key],
  }));
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Extrai o slug final de um ID de content collection (ex: "en/first-post" → "first-post") */
export function slugFromId(id: string): string {
  const parts = id.split('/');
  return parts[parts.length - 1] ?? id;
}

/** Gera o path equivalente no locale alternativo, mantendo o restante da URL. */
export function getAlternatePath(currentPath: string, currentLocale: string): string {
  const alternate = getAlternateLocale(currentLocale);
  const pattern = new RegExp(`^/(${currentLocale}|${alternate})(/|$)`);
  return pattern.test(currentPath)
    ? currentPath.replace(pattern, `/${alternate}$2`)
    : `/${alternate}`;
}
