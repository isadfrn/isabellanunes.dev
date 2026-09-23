import type { NavItem } from "@/types";
import { getAlternateLocale, getLocalizedPath, getTranslations } from "./index";

const NAV_KEYS = [
  "home",
  "about",
  "career",
  "education",
  "courses",
  "books",
  "projects",
  "publications",
  "blog",
] as const;

const SCROLL_SECTION_KEYS = new Set<(typeof NAV_KEYS)[number]>([
  "about",
  "career",
  "education",
  "courses",
  "books",
  "projects",
  "publications",
  "blog",
]);

export function isScrollSectionKey(key: string): boolean {
  return SCROLL_SECTION_KEYS.has(key as (typeof NAV_KEYS)[number]);
}

export function getNavItems(locale: string): NavItem[] {
  const t = getTranslations(locale);
  return NAV_KEYS.map((key) => {
    const anchor = key === "home" ? "" : `#${key}`;
    return {
      key,
      href: `${getLocalizedPath("/", locale)}${anchor}`,
      label: t.nav[key],
    };
  });
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getAlternatePath(
  currentPath: string,
  currentLocale: string,
): string {
  const alternate = getAlternateLocale(currentLocale);
  const rest = currentPath.replace(new RegExp(`^/${currentLocale}/?`), "/");
  return `/${alternate}${rest === "/" ? "/" : rest}`;
}
