import { useState } from "react";
import { Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Separator from "@radix-ui/react-separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { key: "home", path: "" },
  { key: "about", path: "about" },
  { key: "career", path: "career" },
  { key: "education", path: "education" },
  { key: "projects", path: "projects" },
  { key: "blog", path: "blog" },
] as const;

export interface HamburgerMenuProps {
  locale: string;
  currentPath: string;
  translations: {
    nav?: Record<string, string>;
    common?: Record<string, string>;
  };
}

export default function HamburgerMenu({
  locale,
  currentPath,
  translations,
}: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const nav = translations?.nav ?? {};
  const common = translations?.common ?? {};
  const alternateLocale = locale === "en" ? "pt" : "en";
  const localePattern = new RegExp(`^/(${locale}|${alternateLocale})(/|$)`);
  const alternatePath = localePattern.test(currentPath)
    ? currentPath.replace(localePattern, `/${alternateLocale}$2`)
    : `/${alternateLocale}`;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="menu-toggle"
          aria-label={common.openMenu ?? "Open menu"}
        >
          <Menu size={20} aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="menu-overlay"
          {...(open ? { "data-open": "true" } : {})}
        />
        <Dialog.Content
          className="menu-sidebar"
          aria-describedby={undefined}
          {...(open ? { "data-open": "true" } : {})}
        >
          <VisuallyHidden>
            <Dialog.Title>{common.openMenu ?? "Navigation menu"}</Dialog.Title>
          </VisuallyHidden>
          <header
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "var(--space-4)",
            }}
          >
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={common.closeMenu ?? "Close menu"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  padding: 0,
                  background: "transparent",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "var(--color-text)",
                  cursor: "pointer",
                }}
              >
                <X size={20} aria-hidden />
              </button>
            </Dialog.Close>
          </header>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              padding: "0 var(--space-4) var(--space-4)",
            }}
          >
            {NAV_ITEMS.map(({ key, path }) => {
              const href = `/${locale}${path ? `/${path}` : ""}`;
              const label = nav[key] ?? key;
              return (
                <a
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "0.5rem",
                    color: "var(--color-text)",
                    fontWeight: "var(--font-weight-medium)",
                    transition: "background-color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>
          <Separator.Root
            style={{
              margin: "var(--space-4) 0",
              height: "1px",
              backgroundColor: "var(--color-border)",
              width: "100%",
            }}
          />
          <footer
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "var(--space-4)",
              padding: "0 var(--space-4) var(--space-8)",
            }}
          >
            <ThemeToggle
              labels={{
                light: common.lightMode ?? "Light mode",
                dark: common.darkMode ?? "Dark mode",
              }}
              className=""
            />
            <a
              href={alternatePath}
              onClick={() => setOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                color: "var(--color-text-muted)",
                fontSize: "var(--font-size-sm)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              {alternateLocale.toUpperCase()}
            </a>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
