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

export interface CourseEntry {
  title: string;
  platform: string;
  platformLogo: string;
  certificateUrl?: string;
  courseUrl?: string;
  tags?: string[];
}

export interface NavItem {
  key: string;
  href: string;
  label: string;
}
