import { describe, expect, it } from "vitest";
import { getTranslations } from "@/i18n";
import { locales } from "@/types";
import {
  SCENE_ITEMS,
  SCENE_REVEAL,
  WINDOW_GLASS_PATCHES,
  WINDOW_VIEW_IMAGES,
} from "./scene";
import { SCENE_SIZE, toHotspotBox } from "./scene.geometry";
import { WINDOW_VIEWS, type SceneItem, type SceneVisual } from "./scene.types";

const visualsOf = (item: SceneItem) => item.visuals ?? [];
const allVisuals = SCENE_ITEMS.flatMap(visualsOf);
const ofType = <T extends SceneVisual["type"]>(type: T) =>
  allVisuals.filter(
    (visual): visual is Extract<SceneVisual, { type: T }> =>
      visual.type === type,
  );

describe("SCENE_ITEMS", () => {
  it("has unique ids and stays inside the stage", () => {
    const ids = SCENE_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of SCENE_ITEMS) {
      expect(item.x).toBeGreaterThanOrEqual(0);
      expect(item.y).toBeGreaterThanOrEqual(0);
      expect(item.x + item.width).toBeLessThanOrEqual(SCENE_SIZE.width);
      expect(item.y + item.height).toBeLessThanOrEqual(SCENE_SIZE.height);
    }
  });

  it("draws the plant after (in front of) the pomodoro timer", () => {
    const ids = SCENE_ITEMS.map((item) => item.id);
    expect(ids.indexOf("plant")).toBeGreaterThan(ids.indexOf("pomodoro"));
  });

  it("has a window view image for every view, and only the first one is the default", () => {
    const views = ofType("image").flatMap((image) =>
      image.view ? [image.view] : [],
    );
    expect(views).toEqual([...WINDOW_VIEWS]);
    expect(WINDOW_VIEW_IMAGES).toEqual(
      ofType("image").flatMap((image) => (image.view ? [image.src] : [])),
    );
  });

  it("lays weather over each patch of glass", () => {
    const weather = SCENE_ITEMS.filter((item) =>
      visualsOf(item).some((visual) => visual.type === "weather"),
    );
    expect(
      weather.map(({ x, y, width, height }) => ({ x, y, width, height })),
    ).toEqual(WINDOW_GLASS_PATCHES);
  });
});

describe("interactions", () => {
  const interactive = SCENE_ITEMS.flatMap(({ interaction, ...box }) =>
    interaction ? [{ box, interaction }] : [],
  );

  it("centers every hotspot on its own item", () => {
    // Only the center: a ring may overhang the item's edge on purpose (the
    // aquarium's sits on the light bar along its top).
    for (const { box, interaction } of interactive) {
      const spot = toHotspotBox(box, interaction.hotspot);
      const centerX = spot.x + spot.width / 2;
      const centerY = spot.y + spot.height / 2;
      expect(centerX).toBeGreaterThan(box.x);
      expect(centerX).toBeLessThan(box.x + box.width);
      expect(centerY).toBeGreaterThan(box.y);
      expect(centerY).toBeLessThan(box.y + box.height);
    }
  });

  it.each(locales)("has a %s label for every hotspot", (locale) => {
    const labels = getTranslations(locale).home;
    for (const { interaction } of interactive) {
      expect(labels[interaction.labelKey]).toBeTruthy();
    }
  });

  it("lights up something for every toggle", () => {
    const lit = new Set(
      [...ofType("beam"), ...ofType("screen")].map((visual) => visual.target),
    );
    for (const { interaction } of interactive) {
      if (interaction.action.type === "toggle") {
        expect(lit.has(interaction.action.target)).toBe(true);
      }
    }
  });

  it("keeps the computer's screen inside its own box", () => {
    const computer = SCENE_ITEMS.find((item) => item.id === "computer");
    const screen =
      computer && visualsOf(computer).find((v) => v.type === "screen");
    expect(computer).toBeDefined();
    expect(screen).toBeDefined();
    if (!computer || screen?.type !== "screen") return;
    expect(screen.box.x).toBeGreaterThanOrEqual(computer.x);
    expect(screen.box.y).toBeGreaterThanOrEqual(computer.y);
    expect(screen.box.x + screen.box.width).toBeLessThanOrEqual(
      computer.x + computer.width,
    );
    expect(screen.box.y + screen.box.height).toBeLessThanOrEqual(
      computer.y + computer.height,
    );
  });

  it("opens the desktop window when the computer is clicked while it is on", () => {
    const computer = SCENE_ITEMS.find((item) => item.id === "computer");
    expect(computer?.interaction?.action).toEqual({
      type: "toggle",
      target: "computer",
      openWhenOn: "computer-os",
    });
  });
});

describe("the printer rig", () => {
  const [rig] = ofType("rig");

  it("rests with its nozzle just above the empty bed and rises as far as the model is tall", () => {
    expect(rig.hotendHome.y + rig.hotendHome.height + 10).toBe(
      rig.objectBox.y + rig.objectBox.height,
    );
    expect(rig.hotendHome.y - rig.hotendRisen.y).toBe(rig.objectBox.height);
    expect(rig.hotendRisen).toEqual({
      ...rig.hotendHome,
      y: rig.hotendHome.y - rig.objectBox.height,
    });
  });

  it("takes a configured time to print", () => {
    expect(rig.durationMs).toBe(20_000);
  });
});

describe("SCENE_REVEAL", () => {
  it("shows the hotspots after the scene and the greeting have faded in", () => {
    expect(SCENE_REVEAL.hotspotsDelayMs).toBeGreaterThanOrEqual(
      SCENE_REVEAL.heroDelayMs + SCENE_REVEAL.heroFadeMs,
    );
  });
});
