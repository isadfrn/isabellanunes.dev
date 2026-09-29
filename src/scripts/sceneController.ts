import { startClock } from "./clock";
import {
  closePrograms,
  expandBlog,
  openProgram,
  toggleDesktopMenu,
} from "./computerOS";
import { ATTRS, SCENE_ROOT, SELECTORS } from "./dom";
import { pickPrinterModel, startPrint } from "./printer";
import { createWindowManager, type WindowManager } from "./windowManager";
import { watchWindowViews } from "./windowViews";

interface SceneContext {
  root: HTMLElement;
  windows: WindowManager;
}

type ActionHandler = (context: SceneContext, element: HTMLElement) => void;

// Every clickable thing in the scene says what it does with a `data-action`
// (plus arguments in `data-*`), and one listener on the scene root routes the
// event here — nothing is bound per element, so nothing needs re-binding or
// un-binding when the page is swapped. Which actions a hotspot can carry is
// decided by the config (config/scene.actions.ts); the rest are used by the
// markup of the desk windows and the computer's desktop.
export const ACTION_HANDLERS = {
  toggle({ root, windows }, button) {
    const target = button.dataset.target;
    if (!target) return;
    const isOn = button.getAttribute("aria-pressed") === "true";

    // Once already on, a toggle that has a window to open (the monitor) opens
    // it instead of switching back off.
    const windowId = button.dataset.openWhenOn;
    if (isOn && windowId) {
      windows.open(windowId, button);
      return;
    }

    for (const lit of root.querySelectorAll(SELECTORS.toggleTarget(target))) {
      lit.toggleAttribute(ATTRS.on, !isOn);
    }
    button.setAttribute("aria-pressed", String(!isOn));
  },

  "open-window"({ windows }, button) {
    windows.open(button.dataset.window ?? "", button);
  },

  "close-window"({ windows }, button) {
    const id = button.closest<HTMLElement>(SELECTORS.deskWindow)?.dataset
      .deskWindow;
    if (id) windows.close(id);
  },

  "run-printer"({ root, windows }, source) {
    const model = pickPrinterModel(root, source);
    if (!model) return;
    windows.close("printer");
    startPrint(root, model);
  },

  "open-program"(_context, button) {
    const desktop = button.closest<HTMLElement>(SELECTORS.desktop);
    if (desktop) openProgram(desktop, button.dataset.program ?? "");
  },

  "close-programs"(_context, button) {
    const desktop = button.closest<HTMLElement>(SELECTORS.desktop);
    if (desktop) closePrograms(desktop);
  },

  "expand-blog"({ root }, button) {
    expandBlog(root, button);
  },
} satisfies Record<string, ActionHandler>;

type ActionName = keyof typeof ACTION_HANDLERS;

const isActionName = (name: string | undefined): name is ActionName =>
  name !== undefined && Object.hasOwn(ACTION_HANDLERS, name);

/** Wires the scene under `root` until `signal` aborts. */
export function initScene(root: HTMLElement, signal: AbortSignal): void {
  const context: SceneContext = { root, windows: createWindowManager(root) };

  // Buttons act on click; forms (the printer's model picker) on submit.
  const dispatch = (event: Event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest<HTMLElement>(SELECTORS.action);
    if (!element || !root.contains(element)) return;

    const name = element.dataset.action;
    const expectedEvent =
      element instanceof HTMLFormElement ? "submit" : "click";
    if (!isActionName(name) || event.type !== expectedEvent) return;

    if (event.type === "submit") event.preventDefault();
    ACTION_HANDLERS[name](context, element);
  };

  root.addEventListener("click", dispatch, { signal });
  root.addEventListener("submit", dispatch, { signal });
  root.addEventListener(
    "contextmenu",
    (event) => {
      const desktop =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(SELECTORS.desktop)
          : null;
      if (desktop) toggleDesktopMenu(desktop, event);
    },
    { signal },
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") context.windows.closeTop();
    },
    { signal },
  );

  startClock(root, signal);
  watchWindowViews(root, signal);
}

/** Finds the scene on the current page, if it has one, and wires it. */
export function mountScene(signal: AbortSignal): void {
  const root = document.querySelector<HTMLElement>(SCENE_ROOT);
  if (root) initScene(root, signal);
}
