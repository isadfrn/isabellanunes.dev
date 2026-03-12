import { useState } from 'react';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import ThemeToggle from './ThemeToggle';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { getAlternatePath } from '@/i18n/utils';
import { getAlternateLocale } from '@/i18n';
import type { NavItem } from '@/types';
import type { Translations } from '@/i18n';

export interface HamburgerMenuProps {
  locale: string;
  currentPath: string;
  navItems: NavItem[];
  translations: Pick<Translations, 'common'>;
}

export default function HamburgerMenu({
  locale,
  currentPath,
  navItems,
  translations,
}: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const common = translations.common;
  const alternateLocale = getAlternateLocale(locale);
  const alternatePath = getAlternatePath(currentPath, locale);

  // Desktop: menu sempre aberto, não responde a tentativas de fechar.
  const effectiveOpen = isDesktop ? true : open;
  const handleOpenChange = (next: boolean) => {
    if (!isDesktop) setOpen(next);
  };

  return (
    <Dialog.Root open={effectiveOpen} onOpenChange={handleOpenChange} modal={!isDesktop}>
      {/* Botão de abrir — visível apenas em mobile/tablet */}
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed top-4 left-4 z-[1000] flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer lg:hidden"
          aria-label={common.openMenu}
        >
          <Bars3Icon className="w-5 h-5" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay: apenas em mobile/tablet — clicar fora fecha */}
        <Dialog.Overlay className="fixed inset-0 z-[998] bg-black/50 opacity-0 data-[state=open]:opacity-100 invisible data-[state=open]:visible transition-all duration-200 lg:hidden" />

        {/* Sidebar */}
        <Dialog.Content
          className="fixed top-0 left-0 bottom-0 z-[999] w-[min(256px,90vw)] bg-white dark:bg-slate-800 shadow-lg -translate-x-full data-[state=open]:translate-x-0 transition-transform duration-300 overflow-y-auto flex flex-col"
          aria-describedby={undefined}
        >
          <VisuallyHidden>
            <Dialog.Title>{common.openMenu}</Dialog.Title>
          </VisuallyHidden>

          {/* Header com botão fechar — visível apenas em mobile/tablet */}
          <header className="flex items-center justify-end px-4 py-4 border-b border-slate-100 dark:border-slate-700 lg:hidden">
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer"
                aria-label={common.closeMenu}
              >
                <XMarkIcon className="w-5 h-5" aria-hidden />
              </button>
            </Dialog.Close>
          </header>

          {/* Navegação — usa navItems do i18n (fonte única de verdade) */}
          <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
            {navItems.map((item) => {
              const isActive =
                item.key === 'home'
                  ? currentPath === `/${locale}` || currentPath === `/${locale}/`
                  : currentPath.startsWith(item.href);
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-colors duration-150 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <Separator.Root className="h-px bg-slate-100 dark:bg-slate-700 mx-4" />

          {/* Footer: tema + idioma */}
          <footer className="flex items-center justify-between px-4 py-4">
            <ThemeToggle
              labels={{ light: common.lightMode, dark: common.darkMode }}
            />
            <a
              href={alternatePath}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-150"
              aria-label={`Switch to ${alternateLocale === 'en' ? 'English' : 'Português'}`}
            >
              <GlobeAltIcon className="w-4 h-4" aria-hidden />
              {alternateLocale.toUpperCase()}
            </a>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
