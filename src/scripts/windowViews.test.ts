import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadCurrentWindowView, watchWindowViews } from "./windowViews";

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
    watchWindowViews(document, controller.signal);
    expect(src("rain")).toBe("/rain.png");

    setView("night");
    await settle();
    expect(src("night")).toBe("/night.png");
    controller.abort();
  });

  it("stops watching once the signal aborts", async () => {
    const { src } = render();
    const controller = new AbortController();
    watchWindowViews(document, controller.signal);
    controller.abort();

    setView("night");
    await settle();
    expect(src("night")).toBeNull();
  });
});
