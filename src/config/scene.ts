// The home scene, as data. Every position below is in pixels on the
// 2752x1536 stage that background.png is drawn on (see SCENE_SIZE in
// scene.geometry.ts). To move, scale or re-wire an object, change its entry
// in SCENE_ITEMS — no component or script needs to know:
//
//   position / size   x, y, width, height
//   what's drawn      visuals: [{ type: "image" | "beam" | "screen" | ... }]
//   what a click does interaction: { hotspot, labelKey, action }
//
// The types are in scene.types.ts.
import type {
  PrinterRigVisual,
  SceneItem,
  StageBox,
  WindowView,
} from "./scene.types";
import { WINDOW_VIEWS } from "./scene.types";

const WINDOW_VIEW_BOX: StageBox = {
  x: 895,
  y: 104,
  width: 1025,
  height: 1066,
};

// The visible glass, split into three patches instead of one rectangle
// because the lamp, the monitor and the aquarium each block part of it —
// every patch stops right before the desk object that would otherwise show
// through it. Weather effects (rain, snow, stars, blown leaves) are clipped
// to these same patches so they never appear to fall in front of those
// objects.
// The intro choreography, in ms after the page loads: the scene fades in,
// then the greeting, then the hotspots' glow — and the menu button with it,
// so the button doesn't show up before the things it sits beside.
export const SCENE_REVEAL = {
  sceneFadeMs: 2000,
  heroDelayMs: 2000,
  heroFadeMs: 2000,
  hotspotsDelayMs: 4200,
} as const;

export const WINDOW_GLASS_PATCHES: readonly StageBox[] = [
  { x: 935, y: 200, width: 120, height: 729 }, // left of the monitor, above the lamp
  { x: 1055, y: 200, width: 660, height: 642 }, // above the monitor
  { x: 1715, y: 200, width: 170, height: 753 }, // right of the monitor, above the aquarium
];

// How deep the clear sky reads before rooftops start, at the top of the
// glass patches above — used to keep stars out of the skyline.
export const WINDOW_SKY_DEPTH = 130;

// A single lane spanning the whole window, for leaves blowing across it in
// the autumn view. One wide lane (instead of one per glass patch above)
// so a leaf crosses the entire window in one continuous motion and is only
// clipped once it's past the window's own edge, not at each patch's edge.
// Capped at the height shared by every patch (up to the monitor) so a leaf
// never seems to cross in front of the monitor, the lamp or the aquarium.
const WINDOW_LEAF_LANE: StageBox = {
  x: 935,
  y: 200,
  width: 950,
  height: 642,
};

// Open water in the aquarium tank — inset from the glass walls, the
// substrate at the bottom and the lid at the top, so the fish reads as
// swimming inside the tank rather than through its glass or gravel.
const AQUARIUM_SWIM_LANE: StageBox = {
  x: 1697,
  y: 1022,
  width: 243,
  height: 87,
};

// The scenery seen through the window: one full-size layer per view, tucked
// under the window frame. Only the chosen view is visible.
function windowViewItem(view: WindowView): SceneItem {
  return {
    id: `window-view-${view}`,
    ...WINDOW_VIEW_BOX,
    visuals: [{ type: "image", src: `/images/${view}.png`, cover: true, view }],
  };
}

interface PrinterRigOptions {
  hotendSrc: string;
  /** The hotend's resting x, measured off 3dprinter-complete.png. */
  hotendX: number;
  hotendWidth: number;
  hotendHeight: number;
  /** Where the chosen model appears on the print bed, revealed bottom-up in
   * step with the hotend rising above it. Sized modestly so the model
   * doesn't dwarf the bed. */
  objectBox: StageBox;
  /** How far above the model's growing top edge the nozzle stays parked, so
   * the two never visually drift apart. */
  nozzleGap: number;
  durationMs: number;
}

// The hotend rests with its bottom (the nozzle) just above the model's top
// edge before anything is printed, and rises exactly as far as the model is
// tall — so the nozzle stays glued to the model's top edge as it's revealed,
// instead of racing ahead of it. Both follow from `objectBox`, so moving or
// resizing it moves the hotend with it.
function createPrinterRig(options: PrinterRigOptions): PrinterRigVisual {
  const { objectBox, hotendX, hotendWidth, hotendHeight } = options;
  const homeY =
    objectBox.y + objectBox.height - options.nozzleGap - hotendHeight;
  const hotend = { x: hotendX, width: hotendWidth, height: hotendHeight };
  return {
    type: "rig",
    rig: "printer",
    hotendSrc: options.hotendSrc,
    hotendHome: { ...hotend, y: homeY },
    hotendRisen: { ...hotend, y: homeY - objectBox.height },
    objectBox,
    durationMs: options.durationMs,
  };
}

// The scenery images for every window view, for preloading.
export const WINDOW_VIEW_IMAGES: readonly string[] = WINDOW_VIEWS.map(
  (view) => `/images/${view}.png`,
);

// Ordered back to front: later items are drawn on top of earlier ones.
export const SCENE_ITEMS: readonly SceneItem[] = [
  {
    id: "background",
    x: 0,
    y: 0,
    width: 2752,
    height: 1536,
    visuals: [{ type: "image", src: "/images/background.png" }],
  },
  {
    id: "books",
    // The books on the shelf are part of background.png, so this is just a
    // clickable zone over them.
    x: 260,
    y: 1265,
    width: 440,
    height: 135,
    interaction: {
      labelKey: "booksWindowLabel",
      hotspot: { x: 0.5, y: 0.5, size: 0.2 },
      action: { type: "open-window", windowId: "books" },
    },
  },
  ...WINDOW_VIEWS.map(windowViewItem),
  ...WINDOW_GLASS_PATCHES.map(
    (patch, index): SceneItem => ({
      id: `weather-${index}`,
      ...patch,
      visuals: [{ type: "weather" }],
    }),
  ),
  {
    id: "weather-leaves",
    ...WINDOW_LEAF_LANE,
    visuals: [{ type: "custom", component: "leaves" }],
  },
  {
    id: "window",
    x: 875,
    y: 63,
    width: 1058,
    height: 1105,
    visuals: [{ type: "image", src: "/images/window.png" }],
  },
  {
    id: "blind",
    x: 898,
    y: 87,
    width: 1014,
    height: 410,
    visuals: [{ type: "image", src: "/images/blind.png" }],
  },
  {
    id: "lamp",
    x: 963,
    y: 929,
    width: 162,
    height: 271,
    visuals: [
      { type: "image", src: "/images/light.png" },
      {
        type: "beam",
        target: "lamp",
        // Starts at the center of the shade opening and points the way the
        // shade faces (down and a little to the right).
        beam: {
          x: 1083,
          y: 1021,
          angle: 62,
          length: 420,
          spread: 60,
          mouth: { width: 30, height: 80 },
        },
      },
    ],
    interaction: {
      labelKey: "lampToggleLabel",
      hotspot: { x: 0.72, y: 0.23, size: 0.5 },
      action: { type: "toggle", target: "lamp" },
    },
  },
  {
    id: "pomodoro",
    x: 980,
    y: 1098,
    width: 112,
    height: 107,
    visuals: [{ type: "image", src: "/images/pomodor.png" }],
    interaction: {
      labelKey: "focusHotspotLabel",
      // Centered on the round dial of the timer, which sits right of the
      // image's middle.
      hotspot: { x: 0.606, y: 0.497, size: 0.52 },
      action: {
        type: "open-link",
        url: "https://isabellanunes.dev/focus/login",
      },
    },
  },
  {
    // Drawn after (so in front of) the pomodoro timer, since their boxes
    // overlap and the plant should read as sitting in front of it.
    id: "plant",
    x: 860,
    y: 900,
    width: 150,
    height: 320,
    visuals: [{ type: "image", src: "/images/plant.png" }],
  },
  {
    // A little clock/gadget next to the plant, further back from the desk's
    // front lip (~1278 in this area, measured off background.png) than it
    // used to sit. No hotspot yet — purely decorative for now.
    id: "nerdminer",
    x: 980,
    y: 1200,
    width: 85,
    height: 59,
    visuals: [{ type: "image", src: "/images/nerdminer.png" }],
  },
  {
    id: "computer",
    // Sized (and anchored near the monitor's stand foot, not the image's
    // full height) so the base sits on the desk instead of poking up into
    // the window.
    x: 1102,
    y: 842,
    width: 567,
    height: 415,
    visuals: [
      { type: "image", src: "/images/pc.png" },
      {
        type: "screen",
        target: "computer",
        // The monitor's screen, measured from pc.png (85,20)-(390,216) out of
        // its 490x358 native size and scaled into this item's box.
        box: { x: 1200, y: 865, width: 353, height: 227 },
      },
    ],
    interaction: {
      labelKey: "computerToggleLabel",
      // On the screen itself, near its bottom-right corner rather than its
      // center, so the glow reads as "click the screen" and not "click here".
      hotspot: { x: 0.764, y: 0.63, size: 0.09 },
      // Clicking again once the screen is already on opens the bigger,
      // interactive version of it instead of turning it off.
      action: { type: "toggle", target: "computer", openWhenOn: "computer-os" },
    },
  },
  {
    id: "aquarium",
    x: 1667,
    y: 953,
    width: 290,
    height: 235,
    visuals: [
      { type: "image", src: "/images/aquarium.png" },
      {
        type: "beam",
        target: "aquarium",
        // The light is a horizontal bar, so it shines down across its whole
        // width, into the tank and a little past it onto the desk.
        beam: { kind: "bar", x: 1670, y: 966, width: 286, length: 270 },
      },
    ],
    interaction: {
      labelKey: "aquariumToggleLabel",
      // On the light bar that sits over the tank.
      hotspot: { x: 0.5, y: 0.03, size: 0.14 },
      action: { type: "toggle", target: "aquarium" },
    },
  },
  {
    id: "fish",
    ...AQUARIUM_SWIM_LANE,
    visuals: [{ type: "custom", component: "fish" }],
  },
  {
    // Sits on the desk in front of the tank — right of the keyboards, left
    // of the cat.
    id: "coffee",
    x: 1782,
    y: 1152,
    width: 107,
    height: 102,
    visuals: [
      { type: "image", src: "/images/coffee.png" },
      // The coffee's surface, where the steam wisps rise from.
      { type: "steam", point: { x: 1819, y: 1165 } },
    ],
  },
  {
    id: "printer",
    x: 2067,
    y: 663,
    width: 465,
    height: 567,
    visuals: [
      { type: "image", src: "/images/3dprinter.png" },
      createPrinterRig({
        hotendSrc: "/images/3dprinter-hotend.png",
        hotendX: 2073,
        hotendWidth: 375,
        hotendHeight: 87,
        objectBox: { x: 2217, y: 1026, width: 130, height: 100 },
        nozzleGap: 10,
        durationMs: 20_000,
      }),
    ],
    interaction: {
      labelKey: "printerWindowLabel",
      // Near the control panel, in the printer's own bottom-right corner.
      hotspot: { x: 0.85, y: 0.88, size: 0.14 },
      action: { type: "open-window", windowId: "printer" },
    },
  },
  {
    id: "cat",
    x: 1951,
    y: 976,
    width: 243,
    height: 373,
    visuals: [{ type: "image", src: "/images/cat.png" }],
  },
];
