import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { every, onEachPage } from "./lifecycle";

const fire = (name: string) => document.dispatchEvent(new Event(name));

describe("onEachPage", () => {
  afterEach(() => {
    // Own property set by the "still loading" test; drop it to fall back to
    // jsdom's real readyState.
    Reflect.deleteProperty(document, "readyState");
  });

  it("sets the current page up straight away", () => {
    const setup = vi.fn();
    onEachPage(setup);
    expect(setup).toHaveBeenCalledTimes(1);
    expect(setup.mock.calls[0][0]).toBeInstanceOf(AbortSignal);
  });

  it("waits for the DOM when the page is still loading", () => {
    Object.defineProperty(document, "readyState", {
      value: "loading",
      configurable: true,
    });
    const setup = vi.fn();
    onEachPage(setup);
    expect(setup).not.toHaveBeenCalled();

    fire("DOMContentLoaded");
    expect(setup).toHaveBeenCalledTimes(1);
  });

  it("sets each swapped-in page up with a fresh signal and aborts the old one", () => {
    const setup = vi.fn();
    onEachPage(setup);
    const [first] = setup.mock.calls[0] as [AbortSignal];

    fire("astro:after-swap");
    expect(setup).toHaveBeenCalledTimes(2);
    const [second] = setup.mock.calls[1] as [AbortSignal];
    expect(first.aborted).toBe(true);
    expect(second.aborted).toBe(false);
    expect(second).not.toBe(first);
  });

  it("aborts the page's signal as it is about to be replaced", () => {
    const setup = vi.fn();
    onEachPage(setup);
    const [signal] = setup.mock.calls[0] as [AbortSignal];

    fire("astro:before-swap");
    expect(signal.aborted).toBe(true);
  });

  it("lets a listener registered with the signal go when the page does", () => {
    const listener = vi.fn();
    onEachPage((signal) =>
      document.addEventListener("ping", listener, { signal }),
    );
    fire("ping");
    expect(listener).toHaveBeenCalledTimes(1);

    fire("astro:before-swap");
    fire("ping");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe("every", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("runs the callback now, then on every interval", () => {
    const callback = vi.fn();
    every(callback, 1000, new AbortController().signal);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it("stops once the signal aborts", () => {
    const controller = new AbortController();
    const callback = vi.fn();
    every(callback, 1000, controller.signal);
    vi.advanceTimersByTime(1000);

    controller.abort();
    vi.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
  });
});
