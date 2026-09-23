import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import * as Separator from "@radix-ui/react-separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useVisibleNavItems } from "@/hooks/useVisibleNavItems";
import { getAlternateLocale } from "@/i18n";
import type { Translations } from "@/i18n";
import { getAlternatePath } from "@/i18n/utils";
import type { NavItem } from "@/types";
import ThemeToggle from "./ThemeToggle";

export interface HamburgerMenuProps {
  locale: string;
  currentPath: string;
  navItems: NavItem[];
  translations: Pick<Translations, "common">;
}

export default function HamburgerMenu({
  locale,
  currentPath,
  navItems,
  translations,
}: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);

  const isHomePage =
    currentPath === `/${locale}` || currentPath === `/${locale}/`;

  const visibleItems = useVisibleNavItems(navItems);
  const activeSection = useScrollSpy(navItems, isHomePage);

  const common = translations.common;
  const alternateLocale = getAlternateLocale(locale);
  const alternatePath = getAlternatePath(currentPath, locale);

  function isActive(item: NavItem): boolean {
    if (item.key === "blog" && currentPath.startsWith(`/${locale}/blog`)) {
      return true;
    }
    if (!isHomePage) return false;
    return activeSection === item.key;
  }

  function handleNavClick() {
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed left-4 top-4 z-[1000] flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors duration-150 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label={common.openMenu}
        >
          <Bars3Icon className="h-5 w-5" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[998] invisible bg-black/50 opacity-0 transition-all duration-200 data-[state=open]:visible data-[state=open]:opacity-100" />
        <Dialog.Content
          className="fixed bottom-0 left-0 top-0 z-[999] flex w-[min(256px,90vw)] -translate-x-full flex-col overflow-y-auto bg-white shadow-lg transition-transform duration-300 data-[state=open]:translate-x-0 dark:bg-slate-800"
          aria-describedby={undefined}
        >
          <VisuallyHidden>
            <Dialog.Title>{common.openMenu}</Dialog.Title>
          </VisuallyHidden>

          <header className="flex items-center justify-end border-b border-slate-100 px-4 py-4 dark:border-slate-700">
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-150 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                aria-label={common.closeMenu}
              >
                <XMarkIcon className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </header>

          <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
            {visibleItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={handleNavClick}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive(item)
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Separator.Root className="mx-4 h-px bg-slate-100 dark:bg-slate-700" />

          <footer className="flex items-center justify-between px-4 py-4">
            <ThemeToggle
              labels={{ light: common.lightMode, dark: common.darkMode }}
            />
            <a
              href={alternatePath}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
              aria-label={`Switch to ${alternateLocale === "en" ? "English" : "Portuguese"}`}
            >
              <GlobeAltIcon className="h-4 w-4" aria-hidden />
              {alternateLocale.toUpperCase()}
            </a>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
