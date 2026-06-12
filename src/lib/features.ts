export type FeatureKey =
  | "about"
  | "career"
  | "education"
  | "courses"
  | "books"
  | "projects"
  | "publications"
  | "blog";

export const FEATURE_KEYS: FeatureKey[] = [
  "about",
  "career",
  "education",
  "courses",
  "books",
  "projects",
  "publications",
  "blog",
];

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

export const STORAGE_KEY = "feature-flags";

export const DEFAULT_FLAGS: FeatureFlags = {
  about: true,
  career: true,
  education: true,
  courses: true,
  books: true,
  projects: true,
  publications: true,
  blog: true,
};

export function getFlags(): FeatureFlags {
  if (typeof window === "undefined") return { ...DEFAULT_FLAGS };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_FLAGS, ...JSON.parse(stored) } : { ...DEFAULT_FLAGS };
  } catch {
    return { ...DEFAULT_FLAGS };
  }
}

export function saveFlags(flags: FeatureFlags): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}
