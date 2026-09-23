import { useEffect, useState } from "react";
import { HOME_KEY } from "@/config/sections";
import { getFlags } from "@/lib/features";
import type { FeatureKey } from "@/lib/features";
import type { NavItem } from "@/types";

export function useVisibleNavItems(navItems: NavItem[]): NavItem[] {
  const [visibleItems, setVisibleItems] = useState<NavItem[]>(navItems);

  useEffect(() => {
    const flags = getFlags();
    setVisibleItems(
      navItems.filter(
        (item) =>
          item.key === HOME_KEY || flags[item.key as FeatureKey] !== false,
      ),
    );
  }, [navItems]);

  return visibleItems;
}
