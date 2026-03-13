import type { PublicationEntry } from '@/types';

const publications: PublicationEntry[] = [
  {
    slug: 'lorem-ipsum-paper',
    title: 'Lorem Ipsum: A Study on Modern Web Development Practices',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. An in-depth analysis of contemporary approaches to scalable web application architecture.',
    authors: ['Isabella Nunes', 'Lorem Ipsum', 'Dolor Sit'],
    venue: 'Journal of Web Engineering',
    year: 2024,
    url: 'https://example.com/publications/lorem-ipsum-paper',
    tags: ['web development', 'architecture', 'TypeScript'],
  },
  {
    slug: 'consectetur-conference',
    title: 'Consectetur: Accessibility Patterns in Component-Based Frameworks',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. A comprehensive review of accessibility implementation strategies.',
    authors: ['Isabella Nunes', 'Adipiscing Elit'],
    venue: 'International Conference on Web Accessibility (ICWA)',
    year: 2023,
    url: 'https://example.com/publications/consectetur-conference',
    tags: ['accessibility', 'React', 'components'],
  },
];

export default publications;
