import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface ThemeToggleProps {
  labels?: { light: string; dark: string };
  className?: string;
}

export default function ThemeToggle({
  labels = { light: 'Light mode', dark: 'Dark mode' },
  className = '',
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(stored === 'light' || stored === 'dark' ? stored : getInitialTheme());
  }, []);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer ${className}`}
      aria-label={isDark ? labels.light : labels.dark}
      title={isDark ? labels.light : labels.dark}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" aria-hidden />
      ) : (
        <MoonIcon className="w-5 h-5" aria-hidden />
      )}
    </button>
  );
}
