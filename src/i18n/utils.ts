import { HOME_KEY, NAV_KEYS, SECTION_KEYS } from "@/config/sections";
import type { NavItem } from "@/types";
import { getAlternateLocale, getLocalizedPath, getTranslations } from "./index";

const SCROLL_SECTION_KEYS = new Set<string>(SECTION_KEYS);

export function isScrollSectionKey(key: string): boolean {
  return SCROLL_SECTION_KEYS.has(key);
}

export function getNavItems(locale: string): NavItem[] {
  const t = getTranslations(locale);
  return NAV_KEYS.map((key) => {
    const anchor = key === HOME_KEY ? "" : `#${key}`;
    return {
      key,
      href: `${getLocalizedPath("/", locale)}${anchor}`,
      label: t.nav[key],
    };
  });
}

// `timeZone: "UTC"` matters here: date-only strings ("2023-01-01") parse as
// UTC midnight, so formatting in the server/browser's local zone can render
// the previous day/month wherever the local offset is negative. Reading the
// date back in UTC keeps it matched to the calendar date that was written.

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatMonthYear(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

export function formatYear(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    timeZone: "UTC",
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
