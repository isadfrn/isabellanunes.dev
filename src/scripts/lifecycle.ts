// Runs `setup` for the page that is showing now, and again for every page
// the Astro router swaps in afterwards. `setup` gets an AbortSignal that fires
// when that page is about to be replaced: pass it as `{ signal }` to
// addEventListener and register timers/observers with it (see `every`), so
// nothing outlives the page it was made for.
//
// Not built on `astro:page-load`: for the first page that one waits for the
// window's `load` event, i.e. for every image, and the scene's reveal would
// stall behind them. The first run happens as soon as the DOM is ready;
// `astro:after-swap` covers each navigation after that. A script that is
// first loaded *during* a swap runs immediately (readyState is already
// "complete"), so no page is ever set up twice.
export function onEachPage(setup: (signal: AbortSignal) => void): void {
  let controller: AbortController | undefined;

  const stop = () => {
    controller?.abort();
    controller = undefined;
  };
  const start = () => {
    stop();
    controller = new AbortController();
    setup(controller.signal);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
  document.addEventListener("astro:after-swap", start);
  document.addEventListener("astro:before-swap", stop);
}

/** Runs `callback` now and then every `ms`, until `signal` aborts. */
export function every(
  callback: () => void,
  ms: number,
  signal: AbortSignal,
): void {
  callback();
  const id = setInterval(callback, ms);
  signal.addEventListener("abort", () => clearInterval(id), { once: true });
}

// Safari has no requestIdleCallback, so wait a beat instead.
const IDLE_FALLBACK_MS = 200;

/** Runs `callback` once the browser has nothing better to do, unless `signal` aborts first. */
export function onIdle(callback: () => void, signal: AbortSignal): void {
  if (typeof requestIdleCallback === "function") {
    const id = requestIdleCallback(callback);
    signal.addEventListener("abort", () => cancelIdleCallback(id), {
      once: true,
    });
    return;
  }
  const id = setTimeout(callback, IDLE_FALLBACK_MS);
  signal.addEventListener("abort", () => clearTimeout(id), { once: true });
}
