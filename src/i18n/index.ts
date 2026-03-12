import type { Locale } from '@/types';
import pt from './locales/pt.json';
import en from './locales/en.json';

const translations: Record<string, typeof pt> = { pt, en };

export function getTranslations(locale: string): typeof pt {
  return translations[locale] ?? translations.pt;
}

/** Tipo do objeto de traduções — use para tipar props que recebem o retorno de getTranslations(). */
export type Translations = ReturnType<typeof getTranslations>;

export function getLocalizedPath(path: string, locale: string): string {
  return `/${locale}${path}`;
}

export function getAlternateLocale(locale: string): string {
  return locale === 'pt' ? 'en' : 'pt';
}

export function extractLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'en') return 'en';
  return 'pt';
}
