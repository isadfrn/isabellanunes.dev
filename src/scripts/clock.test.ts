import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { startClock, tickClock } from "./clock";

function render() {
  document.body.innerHTML = `
    <span data-computer-clock-time id="t1"></span>
    <span data-computer-clock-date id="d1"></span>
    <span data-computer-clock-time id="t2"></span>
    <span data-computer-clock-date id="d2"></span>`;
  const text = (id: string) => document.getElementById(id)?.textContent;
  return { text };
}

// Tuesday, 29 September 2026, 09:05 (local time, so the zone doesn't matter)
const now = new Date(2026, 8, 29, 9, 5, 30);

describe("tickClock", () => {
  it("writes an English time and date into every clock face", () => {
    const { text } = render();
    tickClock(document, now, "en-US");

    expect(text("t1")).toBe("09:05");
    expect(text("t2")).toBe("09:05");
    expect(text("d1")).toBe("Tuesday, September 29");
    expect(text("d2")).toBe("Tuesday, September 29");
  });

  it("writes them in the page's language", () => {
    const { text } = render();
    tickClock(document, now, "pt-BR");
    expect(text("d1")).toBe("terça-feira, 29 de setembro");
  });

  it("reads the language off the document by default", () => {
    const { text } = render();
    document.documentElement.lang = "pt-BR";
    vi.useFakeTimers();
    vi.setSystemTime(now);
    try {
      tickClock(document);
      expect(text("t1")).toBe("09:05");
      expect(text("d1")).toBe("terça-feira, 29 de setembro");
    } finally {
      vi.useRealTimers();
      document.documentElement.lang = "";
    }
  });

  it("falls back to the browser's language when the document has none", () => {
    const { text } = render();
    tickClock(document, now);
    expect(text("t1")).toBe("09:05");
  });

  it("leaves a page without clocks alone", () => {
    document.body.innerHTML = "";
    expect(() => tickClock(document, now, "en-US")).not.toThrow();
  });
});

describe("startClock", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("ticks now and every second, until told to stop", () => {
    const { text } = render();
    vi.setSystemTime(new Date(2026, 8, 29, 9, 5, 0));
    const controller = new AbortController();
    startClock(document, controller.signal);
    expect(text("t1")).toBe("09:05");

    vi.advanceTimersByTime(60_000);
    expect(text("t1")).toBe("09:06");

    controller.abort();
    vi.advanceTimersByTime(60_000);
    expect(text("t1")).toBe("09:06");
    expect(vi.getTimerCount()).toBe(0);
  });
});
