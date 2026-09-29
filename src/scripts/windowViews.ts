import { SELECTORS } from "./dom";
import { onIdle } from "./lifecycle";

// Only the default view is in the page's HTML; the others are big images,
// so their src is filled in the first time they are chosen — or, before
// that, when the browser is idle (see prefetchWindowViews).
export function loadCurrentWindowView(root: ParentNode): void {
  const current = document.documentElement.dataset.windowView;
  for (const image of root.querySelectorAll<HTMLImageElement>(
    SELECTORS.lazyViewImage,
  )) {
    const { view, viewSrc } = image.dataset;
    if (viewSrc && view === current && !image.getAttribute("src")) {
      image.src = viewSrc;
    }
  }
}

// A phone hides the scene (display: none), so there is nothing to warm up.
const isRendered = (element: Element) => element.getClientRects().length > 0;

function afterPageLoad(callback: () => void, signal: AbortSignal): void {
  if (document.readyState === "complete") callback();
  else window.addEventListener("load", callback, { once: true, signal });
}

/**
 * Loads the views nobody has asked for yet, so that switching to one is
 * instant. It waits until the page has loaded and the browser is idle, then
 * fetches one view at a time: a view the visitor picks meanwhile is never
 * queued behind — or sharing bandwidth with — the others.
 */
export function prefetchWindowViews(root: Element, signal: AbortSignal): void {
  if (!isRendered(root)) return;

  const queue = [
    ...root.querySelectorAll<HTMLImageElement>(SELECTORS.lazyViewImage),
  ];
  const loadNext = () => {
    const image = queue.shift();
    if (!image) return;
    const { viewSrc } = image.dataset;
    // Already loading: the visitor chose it before its turn came.
    if (!viewSrc || image.getAttribute("src")) return loadNext();

    const scheduleNext = () => onIdle(loadNext, signal);
    image.addEventListener("load", scheduleNext, { once: true, signal });
    image.addEventListener("error", scheduleNext, { once: true, signal });
    image.src = viewSrc;
  };
  afterPageLoad(() => onIdle(loadNext, signal), signal);
}

/** Loads the chosen view now, and whichever one is chosen next, until `signal` aborts. */
export function watchWindowViews(root: Element, signal: AbortSignal): void {
  loadCurrentWindowView(root);
  const observer = new MutationObserver(() => loadCurrentWindowView(root));
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-window-view"],
  });
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  prefetchWindowViews(root, signal);
}
