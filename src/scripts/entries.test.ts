import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The two entry points are only side effects — importing them is what wires
// a page — so each test loads a fresh copy of the module against its own DOM.
beforeEach(() => {
  vi.useFakeTimers();
  vi.resetModules();
});
afterEach(() => {
  document.dispatchEvent(new Event("astro:before-swap"));
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("scripts/scene", () => {
  it("wires the scene on the page it is loaded into", async () => {
    document.body.innerHTML = `
      <section data-scene>
        <span data-computer-clock-time></span>
        <button data-action="toggle" data-target="lamp" aria-pressed="false" id="lamp"></button>
        <i data-toggle-target="lamp" id="beam"></i>
      </section>`;
    await import("./scene");

    expect(
      document.querySelector("[data-computer-clock-time]")?.textContent,
    ).not.toBe("");
    document.getElementById("lamp")?.click();
    expect(document.getElementById("beam")).toHaveAttribute("data-on");
  });

  it("wires the scene again on a page swapped in later", async () => {
    document.body.innerHTML = "<main></main>";
    await import("./scene");

    document.body.innerHTML =
      '<section data-scene><span data-computer-clock-time id="clock"></span></section>';
    document.dispatchEvent(new Event("astro:after-swap"));
    expect(document.getElementById("clock")?.textContent).not.toBe("");
  });
});

describe("scripts/reveal", () => {
  it("reveals elements as they come into view", async () => {
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = vi.fn();
        unobserve = vi.fn();
      },
    );
    document.body.innerHTML = '<p data-reveal id="a"></p>';
    await import("./reveal");

    expect(observe).toHaveBeenCalledWith(document.getElementById("a"));
  });
});
