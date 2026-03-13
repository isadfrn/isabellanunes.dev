export type Locale = 'pt' | 'en';

export const locales: Locale[] = ['pt', 'en'];
export const defaultLocale: Locale = 'pt';

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface ProjectEntry {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  repo?: string;
}

export interface PublicationEntry {
  slug: string;
  title: string;
  description: string;
  authors: string[];
  venue: string;
  year: number;
  url?: string;
  tags?: string[];
}

export interface CourseEntry {
  title: string;
  platform: string;
  platformLogo: string;
  certificateUrl?: string;
  courseUrl?: string;
  tags?: string[];
}

export interface HomeContent {
  greeting: string;
  subtitle: string;
  description: string;
  extra: string;
}

export interface AboutContent {
  title: string;
  intro: string;
  bio_1: string;
  bio_2: string;
  skills_title: string;
  skills_desc: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
  image?: string;
  content: string;
}

export interface NavItem {
  key: string;
  href: string;
  label: string;
}
