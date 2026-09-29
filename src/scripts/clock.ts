import { SELECTORS } from "./dom";
import { every } from "./lifecycle";

/** Writes the current time and date into every clock face under `root`. */
export function tickClock(
  root: ParentNode,
  now = new Date(),
  lang = document.documentElement.lang || undefined,
): void {
  const time = now.toLocaleTimeString(lang, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = now.toLocaleDateString(lang, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  for (const el of root.querySelectorAll(SELECTORS.clockTime)) {
    el.textContent = time;
  }
  for (const el of root.querySelectorAll(SELECTORS.clockDate)) {
    el.textContent = date;
  }
}

/** Keeps the clocks ticking until `signal` aborts. */
export function startClock(root: ParentNode, signal: AbortSignal): void {
  every(() => tickClock(root), 1000, signal);
}
