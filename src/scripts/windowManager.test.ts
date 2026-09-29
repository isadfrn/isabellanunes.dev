import { beforeEach, describe, expect, it } from "vitest";
import { createWindowManager } from "./windowManager";

function setup() {
  document.body.innerHTML = `
    <button id="books-opener" aria-expanded="false"></button>
    <button id="printer-opener" aria-expanded="false"></button>
    <section data-desk-window="books">
      <button id="books-close" data-action="close-window"></button>
    </section>
    <section data-desk-window="printer"></section>`;
  const $ = (id: string) => document.getElementById(id) as HTMLElement;
  const win = (id: string) =>
    document.querySelector(`[data-desk-window="${id}"]`) as HTMLElement;
  return { manager: createWindowManager(document), $, win };
}

describe("createWindowManager", () => {
  let ctx: ReturnType<typeof setup>;
  beforeEach(() => {
    ctx = setup();
  });

  it("opens a window, marks its opener expanded and focuses its close button", () => {
    ctx.manager.open("books", ctx.$("books-opener"));

    expect(ctx.win("books")).toHaveAttribute("data-open");
    expect(ctx.$("books-opener")).toHaveAttribute("aria-expanded", "true");
    expect(ctx.$("books-close")).toHaveFocus();
  });

  it("closes it again and hands focus back to the opener", () => {
    ctx.manager.open("books", ctx.$("books-opener"));
    ctx.manager.close("books");

    expect(ctx.win("books")).not.toHaveAttribute("data-open");
    expect(ctx.$("books-opener")).toHaveAttribute("aria-expanded", "false");
    expect(ctx.$("books-opener")).toHaveFocus();
  });

  it("copes with a window that has no close button or opener", () => {
    ctx.manager.open("printer");
    expect(ctx.win("printer")).toHaveAttribute("data-open");

    ctx.manager.close("printer");
    expect(ctx.win("printer")).not.toHaveAttribute("data-open");
  });

  it("ignores windows that do not exist", () => {
    ctx.manager.open("nope", ctx.$("books-opener"));
    ctx.manager.close("nope");
    expect(ctx.$("books-opener")).toHaveAttribute("aria-expanded", "false");
  });

  it("closes whichever window is open on closeTop", () => {
    ctx.manager.open("printer", ctx.$("printer-opener"));
    ctx.manager.closeTop();

    expect(ctx.win("printer")).not.toHaveAttribute("data-open");
    expect(ctx.$("printer-opener")).toHaveFocus();
  });

  it("does nothing on closeTop when no window is open", () => {
    expect(() => ctx.manager.closeTop()).not.toThrow();
  });
});
