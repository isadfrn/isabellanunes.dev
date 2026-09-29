import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  loadCurrentWindowView,
  prefetchWindowViews,
  watchWindowViews,
} from "./windowViews";

function render() {
  document.body.innerHTML = `
    <img id="sunny" data-view="sunny" data-view-src="/sunny.png" src="/sunny.png" />
    <img id="night" data-view="night" data-view-src="/night.png" />
    <img id="rain" data-view="rain" data-view-src="/rain.png" />
    <img id="empty" data-view="winter" data-view-src="" />
    <img id="plain" src="/background.png" />`;
  const src = (id: string) => document.getElementById(id)?.getAttribute("src");
  return { src };
}

const setView = (view: string) => {
  document.documentElement.dataset.windowView = view;
};

describe("loadCurrentWindowView", () => {
  beforeEach(() => setView("sunny"));
  afterEach(() => delete document.documentElement.dataset.windowView);

  it("leaves the other views unloaded", () => {
    const { src } = render();
    loadCurrentWindowView(document);
    expect(src("night")).toBeNull();
    expect(src("rain")).toBeNull();
  });

  it("loads the chosen view's image", () => {
    const { src } = render();
    setView("night");
    loadCurrentWindowView(document);
    expect(src("night")).toBe("/night.png");
    expect(src("rain")).toBeNull();
  });

  it("does not touch an image that already has its src", () => {
    const { src } = render();
    document.getElementById("sunny")?.setAttribute("src", "/custom.png");
    loadCurrentWindowView(document);
    expect(src("sunny")).toBe("/custom.png");
  });

  it("skips an image with no source to load", () => {
    const { src } = render();
    setView("winter");
    loadCurrentWindowView(document);
    expect(src("empty")).toBeNull();
  });

  it("does nothing for a view no image is for", () => {
    const { src } = render();
    setView("volcano");
    loadCurrentWindowView(document);
    expect(src("night")).toBeNull();
  });

  it("does nothing when the page has no view chosen yet", () => {
    const { src } = render();
    delete document.documentElement.dataset.windowView;
    loadCurrentWindowView(document);
    expect(src("night")).toBeNull();
  });
});

describe("watchWindowViews", () => {
  beforeEach(() => setView("sunny"));
  afterEach(() => delete document.documentElement.dataset.windowView);

  const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

  it("loads the current view at once and each view chosen afterwards", async () => {
    const { src } = render();
    setView("rain");
    const controller = new AbortController();
    watchWindowViews(document.body, controller.signal);
    expect(src("rain")).toBe("/rain.png");

    setView("night");
    await settle();
    expect(src("night")).toBe("/night.png");
    controller.abort();
  });

  it("stops watching once the signal aborts", async () => {
    const { src } = render();
    const controller = new AbortController();
    watchWindowViews(document.body, controller.signal);
    controller.abort();

    setView("night");
    await settle();
    expect(src("night")).toBeNull();
  });
});

describe("prefetchWindowViews", () => {
  // jsdom has no layout: say the scene is on screen unless a test says otherwise
  const rendered = (yes: boolean) =>
    vi
      .spyOn(Element.prototype, "getClientRects")
      .mockReturnValue((yes ? [{}] : []) as unknown as DOMRectList);
  const idle = () => vi.advanceTimersByTime(200);
  const finish = (id: string, event: "load" | "error" = "load") =>
    document.getElementById(id)?.dispatchEvent(new Event(event));
  const src = (id: string) => document.getElementById(id)?.getAttribute("src");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("requestIdleCallback", undefined);
    document.body.innerHTML = `
      <img id="sunny" data-view="sunny" data-view-src="/sunny.webp" src="/sunny.webp" />
      <img id="night" data-view="night" data-view-src="/night.webp" />
      <img id="rain" data-view="rain" data-view-src="/rain.webp" />
      <img id="winter" data-view="winter" data-view-src="/winter.webp" />
      <img id="empty" data-view="spring" data-view-src="" />`;
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads the other views one at a time, each after the last has arrived", () => {
    rendered(true);
    prefetchWindowViews(document.body, new AbortController().signal);
    expect(src("night")).toBeNull();

    idle();
    expect(src("night")).toBe("/night.webp");
    expect(src("rain")).toBeNull();

    idle();
    expect(src("rain")).toBeNull(); // night still on its way

    finish("night");
    idle();
    expect(src("rain")).toBe("/rain.webp");
    expect(src("winter")).toBeNull();
  });

  it("carries on past a view that fails to load, and past one with nothing to load", () => {
    rendered(true);
    prefetchWindowViews(document.body, new AbortController().signal);
    idle();
    finish("night", "error");
    idle();
    finish("rain");
    idle();
    expect(src("winter")).toBe("/winter.webp");
    finish("winter");
    idle();
    expect(src("empty")).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("skips a view the visitor asked for before its turn came", () => {
    rendered(true);
    prefetchWindowViews(document.body, new AbortController().signal);
    document.getElementById("rain")?.setAttribute("src", "/rain.webp");
    idle();
    finish("night");
    idle();
    expect(src("winter")).toBe("/winter.webp");
  });

  it("waits for the page to finish loading first", () => {
    rendered(true);
    Object.defineProperty(document, "readyState", {
      value: "loading",
      configurable: true,
    });
    try {
      prefetchWindowViews(document.body, new AbortController().signal);
      idle();
      expect(src("night")).toBeNull();

      window.dispatchEvent(new Event("load"));
      idle();
      expect(src("night")).toBe("/night.webp");
    } finally {
      Reflect.deleteProperty(document, "readyState");
    }
  });

  it("leaves everything alone where the scene is hidden, as on a phone", () => {
    rendered(false);
    prefetchWindowViews(document.body, new AbortController().signal);
    idle();
    expect(src("night")).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops once the page is gone", () => {
    rendered(true);
    const controller = new AbortController();
    prefetchWindowViews(document.body, controller.signal);
    idle();
    controller.abort();
    finish("night");
    idle();
    expect(src("rain")).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });
});
