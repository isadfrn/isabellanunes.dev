import { describe, expect, it } from "vitest";
import { locales } from "./index";

describe("locales", () => {
  it("lists Portuguese and English", () => {
    expect(locales).toEqual(["pt", "en"]);
  });
});
