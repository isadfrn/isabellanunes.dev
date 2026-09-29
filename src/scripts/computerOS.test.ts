import { beforeEach, describe, expect, it } from "vitest";
import {
  closePrograms,
  expandBlog,
  openProgram,
  toggleDesktopMenu,
} from "./computerOS";

function render(withTaskbar = true) {
  document.body.innerHTML = `
    <div class="computer-desktop">
      <ul class="desktop-ui__menu"></ul>
      ${withTaskbar ? "<span data-desktop-window-title></span>" : ""}
      <section data-desktop-program="about" data-program-title="About me">
        <button id="about-close" data-action="close-programs"></button>
      </section>
      <section data-desktop-program="career" data-program-title="Career"></section>
      <section data-desktop-program="bare"></section>
    </div>
    <div data-blog-more hidden></div>
    <button id="view-all"></button>`;
  const desktop = document.querySelector(".computer-desktop") as HTMLElement;
  const program = (id: string) =>
    desktop.querySelector(`[data-desktop-program="${id}"]`) as HTMLElement;
  const title = () =>
    desktop.querySelector("[data-desktop-window-title]")?.textContent;
  return { desktop, program, title };
}

describe("openProgram", () => {
  let ctx: ReturnType<typeof render>;
  beforeEach(() => {
    ctx = render();
  });

  it("opens the program, titles the taskbar and focuses the close button", () => {
    openProgram(ctx.desktop, "about");

    expect(ctx.program("about")).toHaveAttribute("data-open");
    expect(ctx.title()).toBe("About me");
    expect(document.getElementById("about-close")).toHaveFocus();
  });

  it("closes the program that was open first", () => {
    openProgram(ctx.desktop, "about");
    openProgram(ctx.desktop, "career");

    expect(ctx.program("about")).not.toHaveAttribute("data-open");
    expect(ctx.program("career")).toHaveAttribute("data-open");
    expect(ctx.title()).toBe("Career");
  });

  it("leaves the taskbar title empty for a program without one", () => {
    openProgram(ctx.desktop, "bare");
    expect(ctx.program("bare")).toHaveAttribute("data-open");
    expect(ctx.title()).toBe("");
  });

  it("ignores a program that does not exist", () => {
    openProgram(ctx.desktop, "about");
    openProgram(ctx.desktop, "nope");
    expect(ctx.program("about")).toHaveAttribute("data-open");
  });

  it("works on a desktop without a taskbar", () => {
    ctx = render(false);
    openProgram(ctx.desktop, "about");
    expect(ctx.program("about")).toHaveAttribute("data-open");
  });
});

describe("closePrograms", () => {
  it("closes every program and clears the taskbar title", () => {
    const ctx = render();
    openProgram(ctx.desktop, "about");
    closePrograms(ctx.desktop);

    expect(ctx.program("about")).not.toHaveAttribute("data-open");
    expect(ctx.title()).toBe("");
  });
});

describe("toggleDesktopMenu", () => {
  const rightClick = (x = 0, y = 0) =>
    new MouseEvent("contextmenu", {
      clientX: x,
      clientY: y,
      cancelable: true,
    });

  function measure(desktop: HTMLElement, menuWidth = 50) {
    const menu = desktop.querySelector<HTMLElement>(".desktop-ui__menu");
    if (!menu) throw new Error("no menu");
    desktop.getBoundingClientRect = () =>
      ({ left: 10, top: 20, width: 200, height: 100 }) as DOMRect;
    Object.defineProperty(menu, "offsetWidth", { value: menuWidth });
    Object.defineProperty(menu, "offsetHeight", { value: 30 });
    return menu;
  }

  it("hides the menu that starts open, and swallows the browser's own menu", () => {
    const { desktop } = render();
    const menu = measure(desktop);
    const event = rightClick(60, 50);

    toggleDesktopMenu(desktop, event);
    expect(event.defaultPrevented).toBe(true);
    expect(menu).toHaveClass("is-hidden");
    expect(menu.style.left).toBe("");
  });

  it("brings it back at the click, relative to the desktop", () => {
    const { desktop } = render();
    const menu = measure(desktop);
    toggleDesktopMenu(desktop, rightClick());

    toggleDesktopMenu(desktop, rightClick(60, 50));
    expect(menu).not.toHaveClass("is-hidden");
    expect(menu.style.left).toBe("50px");
    expect(menu.style.top).toBe("30px");
  });

  it("keeps the menu inside the desktop", () => {
    const { desktop } = render();
    const menu = measure(desktop);
    toggleDesktopMenu(desktop, rightClick());

    // far past the right/bottom edge: clamped to desktop size minus the menu's
    toggleDesktopMenu(desktop, rightClick(900, 900));
    toggleDesktopMenu(desktop, rightClick(900, 900));
    expect(menu.style.left).toBe("150px");
    expect(menu.style.top).toBe("70px");

    // left of / above the desktop: clamped to its top-left corner
    toggleDesktopMenu(desktop, rightClick(0, 0));
    toggleDesktopMenu(desktop, rightClick(0, 0));
    expect(menu.style.left).toBe("0px");
    expect(menu.style.top).toBe("0px");
  });

  it("does not let a menu wider than the desktop push out of the top-left", () => {
    const { desktop } = render();
    const menu = measure(desktop, 500);
    toggleDesktopMenu(desktop, rightClick());

    toggleDesktopMenu(desktop, rightClick(100, 40));
    expect(menu.style.left).toBe("0px");
  });

  it("still swallows the click on a desktop without a menu", () => {
    document.body.innerHTML = '<div class="computer-desktop"></div>';
    const desktop = document.querySelector(".computer-desktop") as HTMLElement;
    const event = rightClick();
    toggleDesktopMenu(desktop, event);
    expect(event.defaultPrevented).toBe(true);
  });
});

describe("expandBlog", () => {
  it("reveals the held-back posts and hides the button that asked", () => {
    render();
    const button = document.getElementById("view-all") as HTMLElement;
    expandBlog(document, button);

    expect(document.querySelector("[data-blog-more]")).not.toHaveAttribute(
      "hidden",
    );
    expect(button).toHaveAttribute("hidden");
  });
});
