import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SCENE_ITEMS } from "@/config/scene";
import { toHotspotElement } from "@/config/scene.actions";
import { SELECTORS } from "./dom";
import { ACTION_HANDLERS } from "./sceneController";

// The scripts find their elements by attribute and class; the markup sets
// them in .astro files the type checker can't see into. These tests keep the
// two in step, so renaming one side without the other fails here rather than
// silently breaking a click in the browser.

const SRC = path.resolve(import.meta.dirname, "..");

function filesUnder(dir: string, extension: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return filesUnder(full, extension);
    return full.endsWith(extension) ? [full] : [];
  });
}

const read = (file: string) => readFileSync(file, "utf8");
const astro = filesUnder(path.join(SRC, "components"), ".astro").map(read);
const css = filesUnder(path.join(SRC, "styles"), ".css").map(read);
const markupAndStyles = [...astro, ...css].join("\n");

describe("data-action", () => {
  const used = new Set(
    astro.flatMap((source) =>
      [...source.matchAll(/data-action="([^"]+)"/g)].map(([, name]) => name),
    ),
  );

  it("is used by the markup for every action it names, and each has a handler", () => {
    expect(used.size).toBeGreaterThan(0);
    for (const name of used) expect(ACTION_HANDLERS).toHaveProperty(name);
  });

  it("has a handler for every action a hotspot can carry", () => {
    for (const { interaction } of SCENE_ITEMS) {
      if (!interaction || interaction.action.type === "open-link") continue;
      const { attrs } = toHotspotElement(interaction.action);
      expect(ACTION_HANDLERS).toHaveProperty(attrs["data-action"] ?? "");
    }
  });

  it("is used in the markup for each action that has a handler and no hotspot", () => {
    // Every handler is reachable: from a hotspot the config can build, or
    // from markup that names it directly.
    const fromConfig = new Set(["toggle", "open-window", "run-printer"]);
    for (const name of Object.keys(ACTION_HANDLERS)) {
      expect(fromConfig.has(name) || used.has(name)).toBe(true);
    }
  });
});

describe("selectors", () => {
  const selectors = Object.values(SELECTORS).map((selector) =>
    typeof selector === "function" ? selector("x") : selector,
  );

  it("only look for attributes and classes some markup or style provides", () => {
    for (const selector of selectors) {
      const attributes = [...selector.matchAll(/\[(data-[\w-]+)/g)].map(
        (match) => match[1],
      );
      const classes = [...selector.matchAll(/\.([\w-]+)/g)].map(
        (match) => match[1],
      );
      for (const name of [...attributes, ...classes]) {
        expect(markupAndStyles, `${name} in ${selector}`).toContain(name);
      }
    }
  });
});

describe("desk windows", () => {
  it("has markup for every window the config can open", () => {
    const windows = astro.filter((source) => source.includes("<DesktopWindow"));
    const wired = new Set<string>();
    for (const { interaction } of SCENE_ITEMS) {
      const action = interaction?.action;
      if (action?.type === "open-window") wired.add(action.windowId);
      if (action?.type === "toggle" && action.openWhenOn) {
        wired.add(action.openWhenOn);
      }
    }
    expect(wired.size).toBeGreaterThan(0);
    for (const id of wired) {
      expect(windows.join("\n")).toContain(`id="${id}"`);
    }
  });
});
