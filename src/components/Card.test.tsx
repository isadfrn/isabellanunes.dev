import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const entry = {
  slug: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  image: '/images/test.jpg',
  tags: ['React', 'TypeScript'],
};

describe('Card', () => {
  it('renders title and description', () => {
    render(<Card entry={entry} href="/en/projects/test-project" />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<Card entry={entry} href="/en/projects/test-project" />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders as a link with correct href', () => {
    render(<Card entry={entry} href="/en/projects/test-project" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/en/projects/test-project');
  });

  it('renders custom readMoreLabel', () => {
    render(<Card entry={entry} href="/en/projects/test-project" readMoreLabel="Leia mais" />);
    expect(screen.getByText(/Leia mais/)).toBeInTheDocument();
  });

  it('renders default readMoreLabel when not provided', () => {
    render(<Card entry={entry} href="/en/projects/test-project" />);
    expect(screen.getByText(/Read more/)).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<Card entry={entry} href="/en/projects/test-project" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Test Project');
    expect(img).toHaveAttribute('src', '/images/test.jpg');
  });
});
