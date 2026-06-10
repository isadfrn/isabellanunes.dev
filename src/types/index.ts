export type Locale = "pt" | "en";

export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description: string[];
}

export interface ProjectEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  url?: string;
}

export interface PublicationEntry {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  language: Locale;
  url?: string;
  abstract?: string;
}

export interface CourseEntry {
  title: string;
  platform: string;
  platformLogo: string;
  certificateUrl?: string;
  courseUrl?: string;
  tags?: string[];
}

export interface BookEntry {
  title: string;
  author: string;
  cover?: string;
  affiliateUrl: string;
  tags?: string[];
}

export interface HomeContent {
  greeting: string;
  subtitle: string;
}

export interface AboutContent {
  title: string;
  description: string;
  bio: string;
  achievements: string[];
  believes: string;
  hobbies: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  image?: string;
  content: string;
}

export interface NavItem {
  key: string;
  href: string;
  label: string;
}
