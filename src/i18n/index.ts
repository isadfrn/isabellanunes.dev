import type { Locale } from "@/types";
import pt from "./locales/pt.json";
import en from "./locales/en.json";

const translations: Record<Locale, typeof pt> = { pt, en };

export function getTranslations(locale: string): typeof pt {
  return translations[locale as Locale] ?? translations.pt;
}

export type Translations = ReturnType<typeof getTranslations>;

export function getLocalizedPath(path: string, locale: string): string {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return `/${locale}${normalized}`;
}

export function getAlternateLocale(locale: string): Locale {
  return locale === "pt" ? "en" : "pt";
}
