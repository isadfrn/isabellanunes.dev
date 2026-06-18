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

const NAV_PATHS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  about: "/about",
  career: "/career",
  education: "/education",
  courses: "/courses",
  books: "/books",
  projects: "/projects",
  publications: "/publications",
  blog: "/blog",
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
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getAlternatePath(currentPath: string, currentLocale: string): string {
  const alternate = getAlternateLocale(currentLocale);
  const rest = currentPath.replace(new RegExp(`^/${currentLocale}/?`), "/");
  return `/${alternate}${rest === "/" ? "/" : rest}`;
}
