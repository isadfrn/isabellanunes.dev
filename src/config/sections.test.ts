import { describe, expect, it } from "vitest";
import {
  ENABLED_SECTIONS,
  HOME_KEY,
  OS_PROGRAM_KEYS,
  SECTION_KEYS,
  getNavKeys,
  getOsPrograms,
  isSectionEnabled,
} from "./sections";

describe("ENABLED_SECTIONS", () => {
  it("keeps every section enabled by default", () => {
    expect(ENABLED_SECTIONS).toEqual(SECTION_KEYS);
  });
});

describe("isSectionEnabled", () => {
  it("checks the given list, defaulting to ENABLED_SECTIONS", () => {
    expect(isSectionEnabled("blog")).toBe(true);
    expect(isSectionEnabled("blog", ["about"])).toBe(false);
    expect(isSectionEnabled("about", ["about"])).toBe(true);
  });
});

describe("getNavKeys", () => {
  it("lists home followed by the enabled sections only", () => {
    expect(getNavKeys(["about", "blog"])).toEqual([HOME_KEY, "about", "blog"]);
    expect(getNavKeys()).toEqual([HOME_KEY, ...ENABLED_SECTIONS]);
  });
});

describe("getOsPrograms", () => {
  it("only offers programs for sections the site has", () => {
    for (const key of OS_PROGRAM_KEYS) expect(SECTION_KEYS).toContain(key);
  });

  it("lists every program, in menu order, while all sections are enabled", () => {
    expect(getOsPrograms()).toEqual(OS_PROGRAM_KEYS);
  });

  it("drops the program of a disabled section", () => {
    const enabled = SECTION_KEYS.filter((key) => key !== "projects");
    expect(getOsPrograms(enabled)).toEqual([
      "about",
      "career",
      "education",
      "courses",
      "blog",
    ]);
  });

  it("ignores enabled sections that have no program", () => {
    expect(getOsPrograms(["books", "publications"])).toEqual([]);
  });
});
