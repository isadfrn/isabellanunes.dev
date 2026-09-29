import { describe, expect, it } from "vitest";
import {
  isActionEnabled,
  isWindowEnabled,
  toHotspotElement,
} from "./scene.actions";
import { SECTION_KEYS } from "./sections";

describe("toHotspotElement", () => {
  it("renders a link as a plain anchor, safe to open in a new tab", () => {
    expect(
      toHotspotElement({
        type: "open-link",
        url: "https://example.com",
        target: "_blank",
      }),
    ).toEqual({
      tag: "a",
      attrs: {
        href: "https://example.com",
        target: "_blank",
        rel: "noopener noreferrer",
      },
    });
  });

  it("leaves target and rel off a link that opens in the same tab", () => {
    const { tag, attrs } = toHotspotElement({
      type: "open-link",
      url: "/focus",
    });
    expect(tag).toBe("a");
    expect(attrs).toEqual({
      href: "/focus",
      target: undefined,
      rel: undefined,
    });
  });

  it("renders a toggle as a pressable button", () => {
    expect(toHotspotElement({ type: "toggle", target: "lamp" })).toEqual({
      tag: "button",
      attrs: {
        "data-action": "toggle",
        "data-target": "lamp",
        "data-open-when-on": undefined,
        "aria-pressed": "false",
      },
    });
  });

  it("marks a toggle that opens a window as a dialog opener", () => {
    expect(
      toHotspotElement({
        type: "toggle",
        target: "computer",
        openWhenOn: "computer-os",
      }).attrs,
    ).toMatchObject({
      "data-open-when-on": "computer-os",
      "aria-haspopup": "dialog",
      "aria-expanded": "false",
    });
  });

  it("renders open-window as a dialog opener", () => {
    expect(
      toHotspotElement({ type: "open-window", windowId: "books" }),
    ).toEqual({
      tag: "button",
      attrs: {
        "data-action": "open-window",
        "data-window": "books",
        "aria-haspopup": "dialog",
        "aria-expanded": "false",
      },
    });
  });

  it("renders run-printer with its default model", () => {
    expect(
      toHotspotElement({ type: "run-printer", defaultModel: "/m.png" }),
    ).toEqual({
      tag: "button",
      attrs: { "data-action": "run-printer", "data-model": "/m.png" },
    });
  });
});

describe("isActionEnabled", () => {
  const withoutBooks = SECTION_KEYS.filter((key) => key !== "books");

  it("switches off the action that opens the books window along with the books section", () => {
    const action = { type: "open-window", windowId: "books" } as const;
    expect(isActionEnabled(action)).toBe(true);
    expect(isActionEnabled(action, withoutBooks)).toBe(false);
  });

  it("switches off a toggle whose window belongs to a disabled section", () => {
    const action = {
      type: "toggle",
      target: "computer",
      openWhenOn: "books",
    } as const;
    expect(isActionEnabled(action, withoutBooks)).toBe(false);
  });

  it("keeps actions that don't lead to a section", () => {
    const none: never[] = [];
    expect(
      isActionEnabled({ type: "open-window", windowId: "printer" }, none),
    ).toBe(true);
    expect(isActionEnabled({ type: "toggle", target: "lamp" }, none)).toBe(
      true,
    );
    expect(isActionEnabled({ type: "open-link", url: "/x" }, none)).toBe(true);
    expect(isActionEnabled({ type: "run-printer" }, none)).toBe(true);
  });
});

describe("isWindowEnabled", () => {
  it("follows the section for the books window and always shows the others", () => {
    expect(isWindowEnabled("books", [])).toBe(false);
    expect(isWindowEnabled("books", ["books"])).toBe(true);
    expect(isWindowEnabled("printer", [])).toBe(true);
    expect(isWindowEnabled("computer-os", [])).toBe(true);
  });
});
