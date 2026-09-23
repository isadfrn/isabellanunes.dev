import { describe, expect, it } from "vitest";
import {
  getAlternateLocale,
  getLocalizedPath,
  getTranslations,
} from "./index";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

describe("getTranslations", () => {
  it("returns English translations for 'en'", () => {
    expect(getTranslations("en")).toEqual(en);
  });

  it("returns Portuguese translations for 'pt'", () => {
    expect(getTranslations("pt")).toEqual(pt);
  });

  it("falls back to Portuguese for an unknown locale", () => {
    expect(getTranslations("fr")).toEqual(pt);
  });
});

describe("getLocalizedPath", () => {
  it("prefixes the root path with the locale", () => {
    expect(getLocalizedPath("/", "en")).toBe("/en/");
  });

  it("prefixes a nested path with the locale", () => {
    expect(getLocalizedPath("/blog", "en")).toBe("/en/blog");
  });

  it("strips a trailing slash before prefixing", () => {
    expect(getLocalizedPath("/blog/", "pt")).toBe("/pt/blog");
  });
});

describe("getAlternateLocale", () => {
  it("returns 'en' when given 'pt'", () => {
    expect(getAlternateLocale("pt")).toBe("en");
  });

  it("returns 'pt' when given anything else", () => {
    expect(getAlternateLocale("en")).toBe("pt");
  });
});
