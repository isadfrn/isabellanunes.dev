// The vocabulary the scene is described in. scene.ts holds the data; this
// file only says what shapes that data may take, split by concern so a
// component (or script) depends on just the part it renders or handles:
//
//   geometry      StageBox, StagePoint
//   what's drawn  SceneVisual (image, weather, custom, beam, screen, steam, rig)
//   what it does  SceneInteraction -> SceneHotspot + SceneAction
//
// A SceneItem is nothing more than a box, plus optional visuals, plus an
// optional interaction — none of them know about the others.
import type { Translations } from "@/i18n";

export const WINDOW_VIEWS = [
  "sunny",
  "night",
  "winter",
  "spring",
  "autumn",
  "rain",
] as const;
export type WindowView = (typeof WINDOW_VIEWS)[number];
export const DEFAULT_WINDOW_VIEW: WindowView = "sunny";
// Also read by the inline script in ThemeProvider.astro, which applies the
// saved choice before the page paints.
export const WINDOW_VIEW_STORAGE_KEY = "window-view";

// --- Geometry (stage pixels) -------------------------------------------

export interface StagePoint {
  x: number;
  y: number;
}

export interface StageBox extends StagePoint {
  width: number;
  height: number;
}

// --- Interaction -------------------------------------------------------

/** Names a group of lights/screens that switch on and off together. */
export type ToggleTarget = "lamp" | "aquarium" | "computer";

/** The desk windows that can be opened over the scene. */
export type WindowId = "books" | "printer" | "computer-os";

export type SceneAction =
  /** Switches the beams/screens of `target` on and off. */
  | {
      type: "toggle";
      target: ToggleTarget;
      /** Once already on, clicking again opens this window instead of switching off. */
      openWhenOn?: WindowId;
    }
  | { type: "open-window"; windowId: WindowId }
  | { type: "open-link"; url: string; target?: "_blank" }
  /** Starts the printer; without `defaultModel` it prints the first model on offer. */
  | { type: "run-printer"; defaultModel?: string };

/** Glow marking the item as clickable, as fractions of the item's box. */
export interface SceneHotspot {
  x: number;
  y: number;
  /** Diameter, as a fraction of the item's width. */
  size: number;
}

/** Every text key the hotspots may use for their accessible name. */
export type SceneLabelKey = keyof Translations["home"];

export interface SceneInteraction {
  hotspot: SceneHotspot;
  labelKey: SceneLabelKey;
  action: SceneAction;
}

// --- Visuals -----------------------------------------------------------

export type SceneBeam =
  /** Cone from a point (a spot lamp), aimed at `angle` degrees clockwise from +x. */
  | {
      kind?: "cone";
      x: number;
      y: number;
      angle: number;
      length: number;
      spread: number;
      /** Size of the lit mouth of the lamp, in stage pixels (across the beam). */
      mouth: { width: number; height: number };
    }
  /** Rectangle falling straight down from a horizontal bar starting at x,y. */
  | { kind: "bar"; x: number; y: number; width: number; length: number };

export interface ImageVisual {
  type: "image";
  /** File name in src/assets/scene. Astro resizes it to the item's box and
   * converts it at build time, so drop the artwork there at any size. */
  src: string;
  cover?: boolean;
  /** Marks the image as one of the alternative views seen through the window. */
  view?: WindowView;
  /** Above the fold: fetched right away and ahead of the rest. Everything
   * else waits until the browser knows it is on screen — which, on a phone
   * where the scene is hidden, is never. */
  priority?: boolean;
}

/** A patch of window glass that gets rain/snow/stars/petals, per window view. */
export interface WeatherVisual {
  type: "weather";
}

/** Bespoke animated layers that fill the item's box. */
export interface CustomVisual {
  type: "custom";
  /** `leaves`: autumn leaves blown across the box. `fish`: a fish swimming back and forth. */
  component: "leaves" | "fish";
}

/** Light shown while `target` is switched on. */
export interface BeamVisual {
  type: "beam";
  target: ToggleTarget;
  beam: SceneBeam;
}

/** A fake desktop shown on the monitor's screen (`box`) while `target` is on. */
export interface ScreenVisual {
  type: "screen";
  target: ToggleTarget;
  box: StageBox;
}

/** Steam wisps rising from a point — the cup's coffee surface. */
export interface SteamVisual {
  type: "steam";
  point: StagePoint;
}

/** The 3D printer's moving parts: a hotend that rises while the model grows. */
export interface PrinterRigVisual {
  type: "rig";
  rig: "printer";
  /** File name in src/assets/scene. */
  hotendSrc: string;
  hotendHome: StageBox;
  hotendRisen: StageBox;
  /** Where the chosen model appears on the print bed. */
  objectBox: StageBox;
  /** How long a print takes. */
  durationMs: number;
}

export type SceneVisual =
  | ImageVisual
  | WeatherVisual
  | CustomVisual
  | BeamVisual
  | ScreenVisual
  | SteamVisual
  | PrinterRigVisual;

// --- The item ----------------------------------------------------------

export interface SceneItem extends StageBox {
  id: string;
  /** Drawn in order, later ones on top. Omit for an invisible clickable zone. */
  visuals?: readonly SceneVisual[];
  interaction?: SceneInteraction;
}
