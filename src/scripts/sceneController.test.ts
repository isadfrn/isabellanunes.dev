import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ACTION_HANDLERS, initScene, mountScene } from "./sceneController";

// A scene in miniature, with the same attributes the real markup carries.
const SCENE = `
  <section data-scene id="root">
    <div class="scene-stage">
      <span class="scene-beam" data-toggle-target="lamp" id="beam"></span>
      <div class="computer-screen" data-toggle-target="computer" id="screen"></div>
      <button id="lamp" data-action="toggle" data-target="lamp" aria-pressed="false"><i id="lamp-ring"></i></button>
      <button id="computer" data-action="toggle" data-target="computer"
        data-open-when-on="computer-os" aria-pressed="false" aria-expanded="false"></button>
      <button id="untargeted" data-action="toggle" aria-pressed="false"></button>
      <button id="books-hotspot" data-action="open-window" data-window="books" aria-expanded="false"></button>
      <button id="windowless" data-action="open-window"></button>
      <button id="print-default" data-action="run-printer"></button>
      <button id="print-preset" data-action="run-printer" data-model="/models/preset.png"></button>
      <button id="mystery" data-action="levitate"></button>
      <a id="plain-link" href="https://example.com"></a>
      <div class="printer-rig" data-printing="off"><img data-printer-object alt="" /></div>
    </div>
    <section data-desk-window="books">
      <button id="books-close" data-action="close-window"></button>
    </section>
    <section data-desk-window="printer">
      <button id="printer-close" data-action="close-window"></button>
      <form id="printer-form" data-action="run-printer">
        <input type="radio" name="printer-model" value="/models/a.png" />
        <input type="radio" name="printer-model" value="/models/b.png" />
        <button id="print" type="submit"></button>
      </form>
    </section>
    <section data-desk-window="computer-os">
      <button id="os-close" data-action="close-window"></button>
      <div class="computer-desktop" id="desktop">
        <ul class="desktop-ui__menu" id="menu"></ul>
        <span data-computer-clock-time id="clock"></span>
        <span data-desktop-window-title id="taskbar"></span>
        <button id="open-about" data-action="open-program" data-program="about"></button>
        <button id="open-nothing" data-action="open-program"></button>
        <section data-desktop-program="about" data-program-title="About me" id="about">
          <button id="about-close" data-action="close-programs"></button>
        </section>
        <div data-blog-more hidden id="more"></div>
        <button id="expand" data-action="expand-blog"></button>
      </div>
    </section>
    <button id="stray-close" data-action="close-window"></button>
    <button id="stray-close-programs" data-action="close-programs"></button>
    <button id="stray-open-program" data-action="open-program" data-program="about"></button>
  </section>`;

const $ = <T extends HTMLElement = HTMLElement>(id: string) =>
  document.getElementById(id) as T;
const click = (id: string) => $(id).click();
const isOn = (id: string) => $(id).hasAttribute("data-on");
const isOpen = (id: string) =>
  document
    .querySelector(`[data-desk-window="${id}"]`)
    ?.hasAttribute("data-open");
const printing = () =>
  document.querySelector(".printer-rig")?.getAttribute("data-printing");
const printed = () =>
  document.querySelector("[data-printer-object]")?.getAttribute("src");

let controller: AbortController;

function mount() {
  document.body.innerHTML = SCENE;
  controller = new AbortController();
  initScene($("root"), controller.signal);
}

beforeEach(() => {
  vi.useFakeTimers();
  mount();
});
afterEach(() => {
  controller.abort();
  vi.useRealTimers();
  document.body.innerHTML = "";
  delete document.documentElement.dataset.windowView;
});

describe("toggle", () => {
  it("switches the lights of its target on and off", () => {
    click("lamp");
    expect(isOn("beam")).toBe(true);
    expect($("lamp")).toHaveAttribute("aria-pressed", "true");
    expect(isOn("screen")).toBe(false);

    click("lamp");
    expect(isOn("beam")).toBe(false);
    expect($("lamp")).toHaveAttribute("aria-pressed", "false");
  });

  it("works when the click lands on something inside the button", () => {
    click("lamp-ring");
    expect(isOn("beam")).toBe(true);
  });

  it("opens the window instead of switching off, once on", () => {
    click("computer");
    expect(isOn("screen")).toBe(true);
    expect(isOpen("computer-os")).toBe(false);

    click("computer");
    expect(isOn("screen")).toBe(true);
    expect(isOpen("computer-os")).toBe(true);
    expect($("computer")).toHaveAttribute("aria-expanded", "true");
    expect($("os-close")).toHaveFocus();
  });

  it("ignores a toggle that names no target", () => {
    click("untargeted");
    expect($("untargeted")).toHaveAttribute("aria-pressed", "false");
  });
});

describe("desk windows", () => {
  it("opens from its hotspot and closes from its own button, returning focus", () => {
    click("books-hotspot");
    expect(isOpen("books")).toBe(true);
    expect($("books-hotspot")).toHaveAttribute("aria-expanded", "true");
    expect($("books-close")).toHaveFocus();

    click("books-close");
    expect(isOpen("books")).toBe(false);
    expect($("books-hotspot")).toHaveFocus();
  });

  it("closes on Escape, and only on Escape", () => {
    click("books-hotspot");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(isOpen("books")).toBe(true);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(isOpen("books")).toBe(false);
  });

  it("copes with an opener that names no window, and a close button outside one", () => {
    click("windowless");
    click("stray-close");
    expect(isOpen("books")).toBe(false);
  });
});

describe("run-printer", () => {
  it("prints the model chosen in the picker when the form is submitted", () => {
    click("books-hotspot");
    document
      .querySelectorAll<HTMLInputElement>('input[name="printer-model"]')[1]
      .click();
    $("books-hotspot").focus();
    // open the printer window first so we can see it close
    document
      .querySelector('[data-desk-window="printer"]')
      ?.setAttribute("data-open", "");

    click("print");

    expect(printed()).toBe("/models/b.png");
    expect(printing()).toBe("on");
    expect(isOpen("printer")).toBe(false);
  });

  it("stops the browser from submitting the form", () => {
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    $("printer-form").dispatchEvent(submit);
    expect(submit.defaultPrevented).toBe(true);
  });

  it("does nothing when no model is chosen", () => {
    click("print");
    expect(printing()).toBe("off");
  });

  it("prints its own preset model from a hotspot", () => {
    click("print-preset");
    expect(printed()).toBe("/models/preset.png");
    expect(printing()).toBe("on");
  });

  it("prints the first model on offer when the hotspot names none", () => {
    click("print-default");
    expect(printed()).toBe("/models/a.png");
  });

  it("ignores a click on the form itself, which acts on submit", () => {
    $("printer-form").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(printing()).toBe("off");
  });

  it("ignores a submit that does not come from a form", () => {
    $("print-preset").dispatchEvent(new Event("submit", { bubbles: true }));
    expect(printing()).toBe("off");
  });
});

describe("the computer's desktop", () => {
  it("opens a program from its menu and closes it again", () => {
    click("open-about");
    expect($("about")).toHaveAttribute("data-open");
    expect($("taskbar").textContent).toBe("About me");

    click("about-close");
    expect($("about")).not.toHaveAttribute("data-open");
    expect($("taskbar").textContent).toBe("");
  });

  it("ignores a menu item that names no program, or sits outside the desktop", () => {
    click("open-nothing");
    click("stray-open-program");
    click("stray-close-programs");
    expect($("about")).not.toHaveAttribute("data-open");
  });

  it("expands the blog in place", () => {
    click("expand");
    expect($("more")).not.toHaveAttribute("hidden");
    expect($("expand")).toHaveAttribute("hidden");
  });

  it("toggles the Openbox menu on right-click", () => {
    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
    });
    $("about").dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect($("menu")).toHaveClass("is-hidden");
  });

  it("leaves right-click alone everywhere else, even on a bare text node", () => {
    const outside = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
    });
    $("lamp").dispatchEvent(outside);
    expect(outside.defaultPrevented).toBe(false);

    const text = document.createTextNode("hi");
    $("root").append(text);
    const onText = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
    });
    text.dispatchEvent(onText);
    expect(onText.defaultPrevented).toBe(false);
    expect($("menu")).not.toHaveClass("is-hidden");
  });

  it("ticks the clock", () => {
    expect($("clock").textContent).not.toBe("");
  });
});

describe("dispatch", () => {
  it("ignores clicks on things with no action, unknown actions and plain links", () => {
    click("mystery");
    click("plain-link");
    click("root");
    expect(document.querySelectorAll("[data-on]")).toHaveLength(0);
    expect(document.querySelectorAll("[data-open]")).toHaveLength(0);
  });

  it("ignores a click whose target is not an element", () => {
    const text = document.createTextNode("hi");
    $("root").append(text);
    text.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(document.querySelectorAll("[data-on]")).toHaveLength(0);
  });

  it("does not act on an action element outside the scene", () => {
    document.body.innerHTML = `
      <div data-action="toggle" data-target="lamp" aria-pressed="false" id="outer">
        <section data-scene id="root"><span class="scene-beam" data-toggle-target="lamp" id="beam"></span></section>
      </div>`;
    const inner = new AbortController();
    initScene($("root"), inner.signal);

    click("root");
    expect(isOn("beam")).toBe(false);
    expect($("outer")).toHaveAttribute("aria-pressed", "false");
    inner.abort();
  });

  it("does not act on inherited names such as toString", () => {
    document.body.innerHTML =
      '<section data-scene id="root"><button id="odd" data-action="toString"></button></section>';
    const inner = new AbortController();
    initScene($("root"), inner.signal);
    expect(() => click("odd")).not.toThrow();
    inner.abort();
  });
});

describe("teardown", () => {
  it("stops listening, ticking and watching once the signal aborts", () => {
    controller.abort();

    click("lamp");
    click("books-hotspot");
    expect(isOn("beam")).toBe(false);
    expect(isOpen("books")).toBe(false);

    document
      .querySelector('[data-desk-window="books"]')
      ?.setAttribute("data-open", "");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(isOpen("books")).toBe(true);

    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("mountScene", () => {
  it("wires the scene the page has", () => {
    controller.abort();
    document.body.innerHTML = SCENE;
    const signal = new AbortController().signal;
    mountScene(signal);
    click("lamp");
    expect(isOn("beam")).toBe(true);
  });

  it("does nothing on a page with no scene", () => {
    document.body.innerHTML = "<main></main>";
    expect(() => mountScene(new AbortController().signal)).not.toThrow();
  });
});

describe("ACTION_HANDLERS", () => {
  it("has a handler for each action the scene's markup can name", () => {
    expect(Object.keys(ACTION_HANDLERS).sort()).toEqual([
      "close-programs",
      "close-window",
      "expand-blog",
      "open-program",
      "open-window",
      "run-printer",
      "toggle",
    ]);
  });
});
