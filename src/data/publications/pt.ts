import type { PublicationEntry } from '@/types';

const publications: PublicationEntry[] = [
  {
    slug: 'artigo-lorem-ipsum',
    title: 'Lorem Ipsum: Um Estudo sobre Práticas Modernas de Desenvolvimento Web',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uma análise aprofundada das abordagens contemporâneas para arquitetura de aplicações web escaláveis.',
    authors: ['Isabella Nunes', 'Lorem Ipsum', 'Dolor Sit'],
    venue: 'Journal of Web Engineering',
    year: 2024,
    url: 'https://example.com/publications/lorem-ipsum-paper',
    tags: ['desenvolvimento web', 'arquitetura', 'TypeScript'],
  },
  {
    slug: 'artigo-consectetur',
    title: 'Consectetur: Padrões de Acessibilidade em Frameworks Baseados em Componentes',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Uma revisão abrangente de estratégias de implementação de acessibilidade.',
    authors: ['Isabella Nunes', 'Adipiscing Elit'],
    venue: 'Conferência Internacional de Acessibilidade Web (ICWA)',
    year: 2023,
    url: 'https://example.com/publications/consectetur-conference',
    tags: ['acessibilidade', 'React', 'componentes'],
  },
];

export default publications;
