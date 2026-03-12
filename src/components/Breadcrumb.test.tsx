import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

const items = [
  { href: '/pt', label: 'Início' },
  { href: '/pt/blog', label: 'Blog' },
  { href: '/pt/blog/post', label: 'Meu Post' },
];

describe('Breadcrumb', () => {
  it('renders all labels', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Meu Post')).toBeInTheDocument();
  });

  it('renders intermediate items as links', () => {
    render(<Breadcrumb items={items} />);
    const homeLink = screen.getByRole('link', { name: 'Início' });
    expect(homeLink).toHaveAttribute('href', '/pt');
    const blogLink = screen.getByRole('link', { name: 'Blog' });
    expect(blogLink).toHaveAttribute('href', '/pt/blog');
  });

  it('renders last item as aria-current page, not a link', () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText('Meu Post');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).not.toBe('A');
  });

  it('renders separators between items', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(items.length - 1);
  });

  it('renders with schema.org structured data', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const list = container.querySelector('ol');
    expect(list).toHaveAttribute('itemType', 'https://schema.org/BreadcrumbList');
  });
});
