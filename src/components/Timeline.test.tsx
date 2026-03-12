import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';

const entries = [
  {
    title: 'Senior Developer',
    organization: 'Acme Corp',
    period: '2022 – present',
    description: 'Led frontend architecture.',
    tags: ['React', 'TypeScript'],
  },
  {
    title: 'Junior Developer',
    organization: 'Startup Inc',
    period: '2020 – 2022',
    description: 'Built REST APIs.',
    tags: [],
  },
];

describe('Timeline', () => {
  it('renders all entry titles', () => {
    render(<Timeline entries={entries} />);
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  });

  it('renders organization and period', () => {
    render(<Timeline entries={entries} />);
    expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
    expect(screen.getByText(/2022 – present/)).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Timeline entries={entries} />);
    expect(screen.getByText('Led frontend architecture.')).toBeInTheDocument();
    expect(screen.getByText('Built REST APIs.')).toBeInTheDocument();
  });

  it('renders tags when present', () => {
    render(<Timeline entries={entries} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('does not render tag container when tags are empty', () => {
    render(<Timeline entries={[entries[1]]} />);
    expect(screen.queryByRole('list')).toBeDefined();
    // No tag spans for empty tags array
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});
