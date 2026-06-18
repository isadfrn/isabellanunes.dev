export type Locale = "pt" | "en";

export const locales: Locale[] = ["pt", "en"];

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  location?: string;
  workMode?: string;
  description?: string[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  repo: string;
}

export interface PublicationEntry {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  language: Locale;
  url: string;
}

export interface CourseEntry {
  title: string;
  platform: string;
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
  content: string;
}

export interface NavItem {
  key: string;
  href: string;
  label: string;
}
