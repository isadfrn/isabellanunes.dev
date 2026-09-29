import {
  ENABLED_SECTIONS,
  isSectionEnabled,
  type SectionKey,
} from "./sections";
import type { SceneAction, WindowId } from "./scene.types";

// Windows that show a whole section: switching the section off in
// sections.ts takes its window (and the hotspot that opens it) away too.
const WINDOW_SECTION: Partial<Record<WindowId, SectionKey>> = {
  books: "books",
};

/** Whether the action leads anywhere, given the sections that are switched on. */
export function isActionEnabled(
  action: SceneAction,
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): boolean {
  const windowId =
    action.type === "open-window"
      ? action.windowId
      : action.type === "toggle"
        ? action.openWhenOn
        : undefined;
  const section = windowId && WINDOW_SECTION[windowId];
  return !section || isSectionEnabled(section, enabled);
}

export function isWindowEnabled(
  windowId: WindowId,
  enabled: readonly SectionKey[] = ENABLED_SECTIONS,
): boolean {
  return isActionEnabled({ type: "open-window", windowId }, enabled);
}

export interface HotspotElement {
  tag: "a" | "button";
  attrs: Record<string, string | undefined>;
}

// What the hotspot renders as for an action. Links are plain anchors, so they
// work without any script; everything else is a button carrying `data-action`
// (plus its arguments), which the scene controller picks up by event
// delegation — see src/scripts/sceneController.ts.
export function toHotspotElement(action: SceneAction): HotspotElement {
  switch (action.type) {
    case "open-link":
      return {
        tag: "a",
        attrs: {
          href: action.url,
          target: action.target,
          rel: action.target === "_blank" ? "noopener noreferrer" : undefined,
        },
      };
    case "toggle":
      return {
        tag: "button",
        attrs: {
          "data-action": "toggle",
          "data-target": action.target,
          "data-open-when-on": action.openWhenOn,
          "aria-pressed": "false",
          ...(action.openWhenOn && {
            "aria-haspopup": "dialog",
            "aria-expanded": "false",
          }),
        },
      };
    case "open-window":
      return {
        tag: "button",
        attrs: {
          "data-action": "open-window",
          "data-window": action.windowId,
          "aria-haspopup": "dialog",
          "aria-expanded": "false",
        },
      };
    case "run-printer":
      return {
        tag: "button",
        attrs: {
          "data-action": "run-printer",
          "data-model": action.defaultModel,
        },
      };
  }
}
