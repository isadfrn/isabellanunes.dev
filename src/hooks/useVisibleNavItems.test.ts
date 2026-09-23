import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEY } from "@/lib/features";
import type { NavItem } from "@/types";
import { useVisibleNavItems } from "./useVisibleNavItems";

const navItems: NavItem[] = [
  { key: "home", href: "/en", label: "Home" },
  { key: "about", href: "/en#about", label: "About" },
  { key: "blog", href: "/en#blog", label: "Blog" },
];

describe("useVisibleNavItems", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns every item when no flags are stored", () => {
    const { result } = renderHook(() => useVisibleNavItems(navItems));
    expect(result.current).toEqual(navItems);
  });

  it("filters out sections hidden by a stored flag, but always keeps home", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ blog: false }));
    const { result } = renderHook(() => useVisibleNavItems(navItems));
    expect(result.current.map((item) => item.key)).toEqual(["home", "about"]);
  });
});
