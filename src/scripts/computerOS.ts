import { ATTRS, SELECTORS } from "./dom";

// The simulated Openbox desktop inside the computer's window. Every function
// takes that desktop's root element (`.computer-desktop`).

export function closePrograms(desktop: ParentNode): void {
  for (const program of desktop.querySelectorAll(SELECTORS.program)) {
    program.removeAttribute(ATTRS.open);
  }
  setTaskbarTitle(desktop, "");
}

export function openProgram(desktop: ParentNode, id: string): void {
  const program = desktop.querySelector<HTMLElement>(SELECTORS.programById(id));
  if (!program) return;
  closePrograms(desktop);
  program.setAttribute(ATTRS.open, "");
  setTaskbarTitle(desktop, program.dataset.programTitle ?? "");
  program.querySelector<HTMLElement>(SELECTORS.closeProgramButton)?.focus();
}

function setTaskbarTitle(desktop: ParentNode, title: string): void {
  const el = desktop.querySelector(SELECTORS.desktopWindowTitle);
  if (el) el.textContent = title;
}

// Right-click toggles the open Openbox menu, like the real thing: closed on
// the first right-click (it starts open), open again on the next one — and
// when it opens, it appears at the click, not wherever it happened to be
// left last.
export function toggleDesktopMenu(
  desktop: HTMLElement,
  event: MouseEvent,
): void {
  event.preventDefault();
  const menu = desktop.querySelector<HTMLElement>(SELECTORS.desktopMenu);
  if (!menu) return;
  const willOpen = menu.classList.contains("is-hidden");
  menu.classList.toggle("is-hidden");
  if (!willOpen) return;

  const rect = desktop.getBoundingClientRect();
  const clamp = (value: number, max: number) =>
    Math.min(Math.max(value, 0), Math.max(0, max));
  menu.style.left = `${clamp(event.clientX - rect.left, rect.width - menu.offsetWidth)}px`;
  menu.style.top = `${clamp(event.clientY - rect.top, rect.height - menu.offsetHeight)}px`;
}

/** Reveals the posts kept back behind "view all" and hides the button that asked. */
export function expandBlog(root: ParentNode, button: HTMLElement): void {
  for (const more of root.querySelectorAll<HTMLElement>(SELECTORS.blogMore)) {
    more.hidden = false;
  }
  button.hidden = true;
}
