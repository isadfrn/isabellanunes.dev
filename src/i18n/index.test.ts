import { describe, it, expect } from 'vitest';
import { getTranslations, getLocalizedPath, getAlternateLocale } from './index';

describe('i18n', () => {
  describe('getTranslations', () => {
    it('returns Portuguese translations for "pt"', () => {
      const t = getTranslations('pt');
      expect(t.nav.home).toBe('Início');
    });

    it('returns English translations for "en"', () => {
      const t = getTranslations('en');
      expect(t.nav.home).toBe('Home');
    });

    it('falls back to Portuguese for unknown locale', () => {
      const t = getTranslations('xx');
      expect(t.nav.home).toBe('Início');
    });
  });

  describe('getLocalizedPath', () => {
    it('prepends locale to path', () => {
      expect(getLocalizedPath('/about', 'en')).toBe('/en/about');
      expect(getLocalizedPath('/career', 'pt')).toBe('/pt/career');
    });
  });

  describe('getAlternateLocale', () => {
    it('returns "en" when given "pt"', () => {
      expect(getAlternateLocale('pt')).toBe('en');
    });

    it('returns "pt" when given "en"', () => {
      expect(getAlternateLocale('en')).toBe('pt');
    });
  });
});
