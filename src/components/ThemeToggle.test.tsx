import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'light';
    localStorage.clear();
  });

  it('renders a button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows dark mode label when in light mode', () => {
    document.documentElement.dataset.theme = 'light';
    render(<ThemeToggle labels={{ light: 'Light mode', dark: 'Dark mode' }} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Dark mode');
  });

  it('shows light mode label when in dark mode', () => {
    document.documentElement.dataset.theme = 'dark';
    render(<ThemeToggle labels={{ light: 'Light mode', dark: 'Dark mode' }} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Light mode');
  });

  it('toggles theme on click', () => {
    document.documentElement.dataset.theme = 'light';
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('persists theme to localStorage on click', () => {
    document.documentElement.dataset.theme = 'light';
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('accepts custom className', () => {
    render(<ThemeToggle className="my-custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });
});
