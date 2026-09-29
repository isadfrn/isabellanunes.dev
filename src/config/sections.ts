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

// Sections stay fully defined above (markup, data, nav labels), and can be
// switched off here without touching any other code. A disabled section
// disappears everywhere at once: the mobile layout, the mobile menu, the
// desktop computer's program menu and its program window, and (for books)
// the shelf hotspot in the scene.
export const ENABLED_SECTIONS: readonly SectionKey[] = SECTION_KEYS;

export function isSectionEnabled(
  key: SectionKey,
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): boolean {
  return enabled.includes(key);
}

export function getNavKeys(
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): readonly NavKey[] {
  return [HOME_KEY, ...enabled];
}

// The sections the desktop computer has a program for, in the order its
// Openbox menu lists them.
export const OS_PROGRAM_KEYS = [
  "about",
  "career",
  "projects",
  "education",
  "courses",
  "blog",
] as const satisfies readonly SectionKey[];

export type OsProgramKey = (typeof OS_PROGRAM_KEYS)[number];

export function getOsPrograms(
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): readonly OsProgramKey[] {
  return OS_PROGRAM_KEYS.filter((key) => isSectionEnabled(key, enabled));
}
