import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { observeReveals } from "./revealObserver";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observers: FakeObserver[] = [];

class FakeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(
    public callback: Callback,
    public options: IntersectionObserverInit,
  ) {
    observers.push(this);
  }
}

beforeEach(() => {
  observers = [];
  vi.stubGlobal("IntersectionObserver", FakeObserver);
});
afterEach(() => vi.unstubAllGlobals());

describe("observeReveals", () => {
  it("watches every element that has not been revealed yet", () => {
    document.body.innerHTML = `
      <p data-reveal id="a"></p>
      <p data-reveal class="is-revealed" id="done"></p>
      <p data-reveal id="b"></p>`;
    observeReveals(document, new AbortController().signal);

    const [observer] = observers;
    expect(observer.observe.mock.calls.map(([el]) => el.id)).toEqual([
      "a",
      "b",
    ]);
  });

  it("reveals an element as it scrolls into view, and stops watching it", () => {
    document.body.innerHTML =
      '<p data-reveal id="a"></p><p data-reveal id="b"></p>';
    observeReveals(document, new AbortController().signal);
    const [observer] = observers;
    const a = document.getElementById("a") as HTMLElement;
    const b = document.getElementById("b") as HTMLElement;

    observer.callback([
      { target: a, isIntersecting: true },
      { target: b, isIntersecting: false },
    ]);

    expect(a).toHaveClass("is-revealed");
    expect(b).not.toHaveClass("is-revealed");
    expect(observer.unobserve).toHaveBeenCalledWith(a);
    expect(observer.unobserve).not.toHaveBeenCalledWith(b);
  });

  it("does not build an observer for a page with nothing to reveal", () => {
    document.body.innerHTML = '<p data-reveal class="is-revealed"></p>';
    observeReveals(document, new AbortController().signal);
    expect(observers).toHaveLength(0);
  });

  it("disconnects once the signal aborts", () => {
    document.body.innerHTML = "<p data-reveal></p>";
    const controller = new AbortController();
    observeReveals(document, controller.signal);
    const [observer] = observers;
    expect(observer.disconnect).not.toHaveBeenCalled();

    controller.abort();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });
});
