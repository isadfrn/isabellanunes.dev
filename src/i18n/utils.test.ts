import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatMonthYear,
  formatYear,
  getAlternatePath,
  getNavItems,
  isScrollSectionKey,
} from "./utils";

describe("isScrollSectionKey", () => {
  it("returns true for a known section key", () => {
    expect(isScrollSectionKey("about")).toBe(true);
  });

  it("returns false for 'home'", () => {
    expect(isScrollSectionKey("home")).toBe(false);
  });

  it("returns false for an unknown key", () => {
    expect(isScrollSectionKey("nope")).toBe(false);
  });
});

describe("getNavItems", () => {
  it("builds an item for the home key with no anchor", () => {
    const items = getNavItems("en");
    const home = items.find((item) => item.key === "home");
    expect(home).toEqual({ key: "home", href: "/en/", label: "Home" });
  });

  it("builds anchored items for section keys", () => {
    const items = getNavItems("en");
    const about = items.find((item) => item.key === "about");
    expect(about).toEqual({
      key: "about",
      href: "/en/#about",
      label: "About",
    });
  });

  it("localizes hrefs for the given locale", () => {
    const items = getNavItems("pt");
    expect(items.every((item) => item.href.startsWith("/pt"))).toBe(true);
  });
});

describe("date formatting", () => {
  const date = new Date("2023-06-15T00:00:00.000Z");

  it("formatDate renders a full English date", () => {
    expect(formatDate(date, "en")).toBe("June 15, 2023");
  });

  it("formatDate renders a full Portuguese date", () => {
    expect(formatDate(date, "pt")).toBe("15 de junho de 2023");
  });

  it("formatMonthYear renders an abbreviated English month and year", () => {
    expect(formatMonthYear(date, "en")).toBe("Jun 2023");
  });

  it("formatYear renders just the year", () => {
    expect(formatYear(date, "en")).toBe("2023");
  });

  it("formatMonthYear uses Portuguese formatting for locale 'pt'", () => {
    const expected = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "short",
      timeZone: "UTC",
    }).format(date);
    expect(formatMonthYear(date, "pt")).toBe(expected);
  });

  it("formatYear uses Portuguese formatting for locale 'pt'", () => {
    const expected = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
    expect(formatYear(date, "pt")).toBe(expected);
  });
});

describe("getAlternatePath", () => {
  it("swaps the locale prefix on a nested path", () => {
    expect(getAlternatePath("/en/blog", "en")).toBe("/pt/blog");
  });

  it("swaps the locale prefix on the root path", () => {
    expect(getAlternatePath("/en", "en")).toBe("/pt/");
  });

  it("swaps from Portuguese back to English", () => {
    expect(getAlternatePath("/pt/projects", "pt")).toBe("/en/projects");
  });
});
