import type { NavItem } from '@/types';
import { getTranslations, getLocalizedPath } from './index';

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
