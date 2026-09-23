// @vitest-environment node
import { describe, expect, it } from "vitest";
import { DEFAULT_FLAGS, getFlags } from "./features";

describe("getFlags on the server", () => {
  it("returns the defaults when there is no window", () => {
    expect(typeof window).toBe("undefined");
    expect(getFlags()).toEqual(DEFAULT_FLAGS);
  });
});
