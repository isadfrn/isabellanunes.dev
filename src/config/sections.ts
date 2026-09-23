export const HOME_KEY = "home" as const;

export const SECTION_KEYS = [
  "about",
  "career",
  "education",
  "courses",
  "books",
  "projects",
  "publications",
  "blog",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];
export type NavKey = typeof HOME_KEY | SectionKey;

export const NAV_KEYS: readonly NavKey[] = [HOME_KEY, ...SECTION_KEYS];
