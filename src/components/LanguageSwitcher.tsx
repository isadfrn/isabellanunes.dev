import { Globe } from "lucide-react";

export interface LanguageSwitcherProps {
  currentLocale: string;
  currentPath: string;
}

export default function LanguageSwitcher({
  currentLocale,
  currentPath,
}: LanguageSwitcherProps) {
  const alternateLocale = currentLocale === "en" ? "pt" : "en";
  const localePattern = new RegExp(`^/(${currentLocale}|${alternateLocale})(/|$)`);
  const alternatePath = localePattern.test(currentPath)
    ? currentPath.replace(localePattern, `/${alternateLocale}$2`)
    : `/${alternateLocale}`;

  return (
    <a
      href={alternatePath}
      className="breadcrumb-link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
      }}
      aria-label={`Switch to ${alternateLocale === "en" ? "English" : "Português"}`}
    >
      <Globe size={18} aria-hidden />
      {alternateLocale.toUpperCase()}
    </a>
  );
}
