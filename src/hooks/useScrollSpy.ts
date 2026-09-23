import { useEffect, useState } from "react";
import { HOME_KEY } from "@/config/sections";
import { isScrollSectionKey } from "@/i18n/utils";
import type { NavItem } from "@/types";

export function useScrollSpy(
  navItems: NavItem[],
  enabled: boolean,
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const sections = navItems
      .filter((item) => item.key === HOME_KEY || isScrollSectionKey(item.key))
      .map((item) => document.getElementById(item.key))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled, navItems]);

  return activeId;
}
