import { SECTION_KEYS, type SectionKey } from "@/config/sections";

export type FeatureKey = SectionKey;

export const FEATURE_KEYS: readonly FeatureKey[] = SECTION_KEYS;

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  about: "About",
  career: "Career",
  education: "Education",
  courses: "Courses",
  books: "Books",
  projects: "Projects",
  publications: "Publications",
  blog: "Blog",
};

export type FeatureFlags = Record<FeatureKey, boolean>;

// Visibility toggles are stored in this browser's localStorage only — they
// are a personal, per-device preference, not a shared/server-side flag. The
// admin panel at /admin/flags only ever changes what the current browser sees.
export const STORAGE_KEY = "feature-flags";

export const DEFAULT_FLAGS: FeatureFlags = Object.fromEntries(
  SECTION_KEYS.map((key) => [key, true]),
) as FeatureFlags;

export function getFlags(): FeatureFlags {
  if (typeof window === "undefined") return { ...DEFAULT_FLAGS };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? { ...DEFAULT_FLAGS, ...JSON.parse(stored) }
      : { ...DEFAULT_FLAGS };
  } catch {
    return { ...DEFAULT_FLAGS };
  }
}

export function saveFlags(flags: FeatureFlags): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}
