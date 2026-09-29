import { describe, expect, it } from "vitest";
import { SCENE_ITEMS, findVisual } from "./scene";
import type { ImageMetadata } from "astro";
import { nativeWidth, resolveSceneImage, sceneImageNames } from "./sceneImages";

describe("resolveSceneImage", () => {
  it("finds an image by its file name in src/assets/scene", () => {
    expect(resolveSceneImage("background.png")).toBeDefined();
  });

  it("fails loudly, naming what is there, when the image is missing", () => {
    expect(() => resolveSceneImage("nope.png")).toThrow(
      /"nope.png" is not in src\/assets\/scene. Found: .*background\.png/,
    );
  });
});

describe("the scene's artwork", () => {
  const referenced = SCENE_ITEMS.flatMap((item) => item.visuals ?? []).flatMap(
    (visual) => {
      if (visual.type === "image") return [visual.src];
      if (visual.type === "rig") return [visual.hotendSrc];
      return [];
    },
  );

  it("has a file for every image the config names", () => {
    expect(referenced.length).toBeGreaterThan(0);
    for (const name of referenced) {
      expect(sceneImageNames(), name).toContain(name);
    }
  });

  it("is all used: no artwork sits in src/assets/scene unreferenced", () => {
    // fish, leaf and petal are drawn by their own components, not the config
    const drawnByComponents = ["fish.png", "leaf.png", "petal.png"];
    const unused = sceneImageNames().filter(
      (name) => !referenced.includes(name) && !drawnByComponents.includes(name),
    );
    expect(unused).toEqual([]);
  });
});

describe("findVisual", () => {
  it("finds the monitor's screen and the printer rig", () => {
    expect(findVisual("screen")?.target).toBe("computer");
    expect(findVisual("rig")?.rig).toBe("printer");
  });

  it("finds nothing when the scene has no visual of that type", () => {
    expect(findVisual("nope" as unknown as "steam")).toBeUndefined();
  });
});

describe("nativeWidth", () => {
  const image = (width: number, clone?: ImageMetadata) =>
    ({
      src: "/a.png",
      width,
      height: 1,
      format: "png",
      clone,
    }) as ImageMetadata;

  it("reads the width off the plain copy, so the original file is not counted as used", () => {
    const proxy = image(999, image(1792));
    expect(nativeWidth(proxy)).toBe(1792);
  });

  it("reads it straight off an image that has no copy", () => {
    expect(nativeWidth(image(736))).toBe(736);
  });
});
