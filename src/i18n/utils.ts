import {
  ENABLED_SECTIONS,
  HOME_KEY,
  getNavKeys,
  getOsPrograms,
  SECTION_KEYS,
  type OsProgramKey,
  type SectionKey,
} from "@/config/sections";
import type { NavItem } from "@/types";
import {
  getAlternateLocale,
  getLocalizedPath,
  getTranslations,
  type Translations,
} from "./index";

const SCROLL_SECTION_KEYS = new Set<string>(SECTION_KEYS);

export function isScrollSectionKey(key: string): boolean {
  return SCROLL_SECTION_KEYS.has(key);
}

// Only the sections that are switched on (ENABLED_SECTIONS) get a nav item,
// so the menu never links to a section that isn't on the page.
export function getNavItems(
  locale: string,
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): NavItem[] {
  const t = getTranslations(locale);
  return getNavKeys(enabled).map((key) => {
    const anchor = key === HOME_KEY ? "" : `#${key}`;
    return {
      key,
      href: `${getLocalizedPath("/", locale)}${anchor}`,
      label: t.nav[key],
    };
  });
}

export interface DesktopMenuItem {
  id: OsProgramKey;
  label: string;
}

const DESKTOP_MENU_LABELS = {
  about: "menuAbout",
  career: "menuCareer",
  projects: "menuProjects",
  education: "menuEducation",
  courses: "menuCourses",
  blog: "menuBlog",
} as const satisfies Record<
  OsProgramKey,
  keyof Translations["computerDesktop"]
>;

// The entries of the simulated computer's Openbox menu: the same sections as
// the rest of the site, minus the ones ENABLED_SECTIONS switches off.
export function getDesktopMenuItems(
  locale: string,
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): DesktopMenuItem[] {
  const labels = getTranslations(locale).computerDesktop;
  return getOsPrograms(enabled).map((id) => ({
    id,
    label: labels[DESKTOP_MENU_LABELS[id]],
  }));
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
