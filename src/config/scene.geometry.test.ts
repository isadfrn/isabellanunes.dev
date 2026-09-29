import { describe, expect, it } from "vitest";
import {
  SCENE_SIZE,
  toAspectRatio,
  toImageWidth,
  toBeamStyle,
  toHotspotBox,
  toPointStyle,
  toRisePercent,
  toStageStyle,
} from "./scene.geometry";

describe("toStageStyle", () => {
  it("converts stage pixels to percentages of the stage", () => {
    const style = toStageStyle({
      x: SCENE_SIZE.width / 2,
      y: SCENE_SIZE.height / 4,
      width: SCENE_SIZE.width / 10,
      height: SCENE_SIZE.height,
    });
    expect(style).toBe(
      "left:50.0000%;top:25.0000%;width:10.0000%;height:100.0000%",
    );
  });
});

describe("toPointStyle", () => {
  it("converts a stage point to a left/top percentage pair", () => {
    expect(
      toPointStyle({ x: SCENE_SIZE.width / 4, y: SCENE_SIZE.height / 2 }),
    ).toBe("left:25.0000%;top:50.0000%");
  });
});

describe("toHotspotBox", () => {
  it("centers a square click target on the hotspot point, sized off the item's width", () => {
    const box = toHotspotBox(
      { x: 100, y: 200, width: 300, height: 150 },
      { x: 0.5, y: 0.5, size: 0.4 },
    );
    // size = 0.4 * 300 = 120, centered on (100+150, 200+75) = (250, 275)
    expect(box).toEqual({ x: 190, y: 215, width: 120, height: 120 });
  });
});

describe("toBeamStyle", () => {
  it("sizes the cone box from its length and spread, centered on the origin", () => {
    const style = toBeamStyle({
      x: 1376,
      y: 768,
      angle: 60,
      length: 100,
      spread: 90,
      mouth: { width: 10, height: 50 },
    });
    expect(style).toContain("left:50.0000%");
    expect(style).toContain("width:3.6337%");
    expect(style).toContain("--beam-angle:60deg");
    expect(style).toContain("--beam-spread:90deg");
    expect(style).toContain("--mouth-w:10.0000%");
    expect(style).toContain("--mouth-h:25.0000%");
    // a 90deg cone is as tall as it is long, twice: 2 * 100 * tan(45deg)
    expect(style).toContain(`height:${((200 / 1536) * 100).toFixed(4)}%`);
    expect(style).toContain(`top:${(((768 - 100) / 1536) * 100).toFixed(4)}%`);
  });

  it("places a straight-down bar of light at its own box", () => {
    const style = toBeamStyle({
      kind: "bar",
      x: 1376,
      y: 768,
      width: 275.2,
      length: 153.6,
    });
    expect(style).toBe(
      "left:50.0000%;top:50.0000%;width:10.0000%;height:10.0000%",
    );
  });
});

describe("toAspectRatio", () => {
  it("writes the box's proportions as a CSS aspect-ratio", () => {
    expect(toAspectRatio({ x: 5, y: 5, width: 353, height: 227 })).toBe(
      "353 / 227",
    );
  });
});

describe("toRisePercent", () => {
  it("expresses how far the hotend travels as a percentage of its own height", () => {
    const home = { x: 0, y: 200, width: 100, height: 80 };
    const risen = { ...home, y: 120 };
    expect(toRisePercent(home, risen)).toBe("100.00");
    expect(toRisePercent(home, { ...home, y: 160 })).toBe("50.00");
  });
});

describe("toImageWidth", () => {
  it("ships an image at two device pixels per stage pixel", () => {
    expect(toImageWidth(130, 736)).toBe(260);
    expect(toImageWidth(85.4, 2265)).toBe(171);
  });

  it("never upscales past the artwork's own width", () => {
    expect(toImageWidth(1025, 1792)).toBe(1792);
    expect(toImageWidth(100, 150)).toBe(150);
  });
});
