import type { ProjectEntry } from '@/types';

const projects: ProjectEntry[] = [
  {
    slug: 'projeto-lorem',
    title: 'Projeto Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/images/projects/lorem.jpg',
    tags: ['React', 'TypeScript', 'Node.js'],
    url: 'https://example.com',
    repo: 'https://github.com/example/lorem',
  },
  {
    slug: 'projeto-dolor',
    title: 'Projeto Dolor Sit Amet',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/images/projects/dolor.jpg',
    tags: ['Astro', 'CSS', 'API'],
    url: 'https://example.com',
  },
  {
    slug: 'projeto-consectetur',
    title: 'Projeto Consectetur',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '/images/projects/consectetur.jpg',
    tags: ['Vue.js', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/example/consectetur',
  },
];

export default projects;
