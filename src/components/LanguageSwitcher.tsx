import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { getAlternatePath } from '@/i18n/utils';
import { getAlternateLocale } from '@/i18n';

export interface LanguageSwitcherProps {
  currentLocale: string;
  currentPath: string;
}

export default function LanguageSwitcher({ currentLocale, currentPath }: LanguageSwitcherProps) {
  const alternateLocale = getAlternateLocale(currentLocale);
  const alternatePath = getAlternatePath(currentPath, currentLocale);

  return (
    <a
      href={alternatePath}
      className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
      aria-label={`Switch to ${alternateLocale === 'en' ? 'English' : 'Português'}`}
    >
      <GlobeAltIcon className="w-4 h-4" aria-hidden />
      {alternateLocale.toUpperCase()}
    </a>
  );
}
