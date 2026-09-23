import { beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_FLAGS,
  FEATURE_KEYS,
  FEATURE_LABELS,
  getFlags,
  saveFlags,
  STORAGE_KEY,
} from "./features";

describe("feature flags (browser)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the defaults when nothing is stored", () => {
    expect(getFlags()).toEqual(DEFAULT_FLAGS);
  });

  it("merges stored overrides on top of the defaults", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ blog: false }));
    expect(getFlags()).toEqual({ ...DEFAULT_FLAGS, blog: false });
  });

  it("falls back to the defaults when stored JSON is invalid", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json");
    expect(getFlags()).toEqual(DEFAULT_FLAGS);
  });

  it("persists flags via saveFlags", () => {
    const next = { ...DEFAULT_FLAGS, projects: false };
    saveFlags(next);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("expected flags to be stored");
    expect(JSON.parse(raw)).toEqual(next);
    expect(getFlags()).toEqual(next);
  });
});

describe("feature flag metadata", () => {
  it("has a label for every feature key", () => {
    for (const key of FEATURE_KEYS) {
      expect(FEATURE_LABELS[key]).toBeTruthy();
    }
  });

  it("defaults every feature key to visible", () => {
    for (const key of FEATURE_KEYS) {
      expect(DEFAULT_FLAGS[key]).toBe(true);
    }
  });
});
