import { SELECTORS } from "./dom";

// Only the default view is in the page's HTML; the others are big images,
// so their src is filled in the first time they are chosen.
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

/** Loads the chosen view now, and whichever one is chosen next, until `signal` aborts. */
export function watchWindowViews(root: ParentNode, signal: AbortSignal): void {
  loadCurrentWindowView(root);
  const observer = new MutationObserver(() => loadCurrentWindowView(root));
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-window-view"],
  });
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
}
