import type {
  SceneBeam,
  SceneHotspot,
  StageBox,
  StagePoint,
} from "./scene.types";

// The artwork's own size: every position in scene.ts is in pixels on a stage
// of this size (background.png is drawn on it). The home page scales the
// whole stage to cover the viewport, so items keep their relative positions
// at any size.
export const SCENE_SIZE = { width: 2752, height: 1536 } as const;

const pct = (value: number, total: number) =>
  `${((value / total) * 100).toFixed(4)}%`;

export function toStageStyle(box: StageBox): string {
  return [
    `left:${pct(box.x, SCENE_SIZE.width)}`,
    `top:${pct(box.y, SCENE_SIZE.height)}`,
    `width:${pct(box.width, SCENE_SIZE.width)}`,
    `height:${pct(box.height, SCENE_SIZE.height)}`,
  ].join(";");
}

export function toPointStyle(point: StagePoint): string {
  return `left:${pct(point.x, SCENE_SIZE.width)};top:${pct(point.y, SCENE_SIZE.height)}`;
}

// The hotspot's own clickable box (stage px): a square centered on the
// hotspot point, sized as a fraction of the item's width. Used so the
// click/tap target is exactly the ring, not the whole item.
export function toHotspotBox(box: StageBox, hotspot: SceneHotspot): StageBox {
  const size = hotspot.size * box.width;
  return {
    x: box.x + hotspot.x * box.width - size / 2,
    y: box.y + hotspot.y * box.height - size / 2,
    width: size,
    height: size,
  };
}

export function toBeamStyle(beam: SceneBeam): string {
  if (beam.kind === "bar") {
    return [
      `left:${pct(beam.x, SCENE_SIZE.width)}`,
      `top:${pct(beam.y, SCENE_SIZE.height)}`,
      `width:${pct(beam.width, SCENE_SIZE.width)}`,
      `height:${pct(beam.length, SCENE_SIZE.height)}`,
    ].join(";");
  }
  const height = 2 * beam.length * Math.tan((beam.spread * Math.PI) / 360);
  return [
    `left:${pct(beam.x, SCENE_SIZE.width)}`,
    `top:${pct(beam.y - height / 2, SCENE_SIZE.height)}`,
    `width:${pct(beam.length, SCENE_SIZE.width)}`,
    `height:${pct(height, SCENE_SIZE.height)}`,
    `--beam-angle:${beam.angle}deg`,
    `--beam-spread:${beam.spread}deg`,
    `--mouth-w:${pct(beam.mouth.width, beam.length)}`,
    `--mouth-h:${pct(beam.mouth.height, height)}`,
  ].join(";");
}

/** A CSS `aspect-ratio` value with the box's proportions, e.g. "353 / 227". */
export function toAspectRatio(box: StageBox): string {
  return `${box.width} / ${box.height}`;
}

// How far the printer's hotend travels, as a percentage of its own height —
// so the motion stays in proportion at any viewport size.
export function toRisePercent(home: StageBox, risen: StageBox): string {
  return (((home.y - risen.y) / home.height) * 100).toFixed(2);
}
