import { beforeEach, describe, expect, it } from "vitest";
import { pickPrinterModel, startPrint } from "./printer";

function render(rig = true) {
  document.body.innerHTML = `
    <form id="picker">
      <input type="radio" name="printer-model" value="/models/a.png" />
      <input type="radio" name="printer-model" value="/models/b.png" />
    </form>
    <button id="hotspot"></button>
    <button id="preset" data-model="/models/preset.png"></button>
    ${rig ? '<div class="printer-rig" data-printing="off"><img data-printer-object alt="" /></div>' : ""}`;
  const $ = <T extends HTMLElement>(id: string) =>
    document.getElementById(id) as T;
  return { $ };
}

describe("pickPrinterModel", () => {
  let ctx: ReturnType<typeof render>;
  beforeEach(() => {
    ctx = render();
  });

  it("takes the checked model from the picker form", () => {
    const form = ctx.$<HTMLFormElement>("picker");
    form.querySelectorAll("input")[1].checked = true;
    expect(pickPrinterModel(document, form)).toBe("/models/b.png");
  });

  it("finds nothing when the picker has no choice made", () => {
    expect(pickPrinterModel(document, ctx.$("picker"))).toBeUndefined();
  });

  it("uses the model the element itself names", () => {
    expect(pickPrinterModel(document, ctx.$("preset"))).toBe(
      "/models/preset.png",
    );
  });

  it("falls back to the first model on offer", () => {
    expect(pickPrinterModel(document, ctx.$("hotspot"))).toBe("/models/a.png");
  });

  it("finds nothing when there are no models at all", () => {
    document.body.innerHTML = '<button id="hotspot"></button>';
    expect(pickPrinterModel(document, ctx.$("hotspot"))).toBeUndefined();
  });
});

describe("startPrint", () => {
  it("shows the model and starts the animation", () => {
    render();
    startPrint(document, "/models/a.png");

    const rig = document.querySelector(".printer-rig");
    const image = document.querySelector<HTMLImageElement>(
      "[data-printer-object]",
    );
    expect(rig).toHaveAttribute("data-printing", "on");
    expect(image?.getAttribute("src")).toBe("/models/a.png");
  });

  it("restarts the animation when a print is already running", () => {
    render();
    startPrint(document, "/models/a.png");
    startPrint(document, "/models/b.png");

    expect(document.querySelector(".printer-rig")).toHaveAttribute(
      "data-printing",
      "on",
    );
    expect(
      document
        .querySelector<HTMLImageElement>("[data-printer-object]")
        ?.getAttribute("src"),
    ).toBe("/models/b.png");
  });

  it("does nothing on a page without the printer", () => {
    render(false);
    expect(() => startPrint(document, "/models/a.png")).not.toThrow();
  });

  it("does nothing when the rig has no model image", () => {
    document.body.innerHTML =
      '<div class="printer-rig" data-printing="off"></div>';
    startPrint(document, "/models/a.png");
    expect(document.querySelector(".printer-rig")).toHaveAttribute(
      "data-printing",
      "off",
    );
  });
});
