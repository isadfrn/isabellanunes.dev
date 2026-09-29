import { ATTRS, SELECTORS } from "./dom";

export interface WindowManager {
  /** Opens the desk window `id`, remembering `opener` so closing can hand focus back to it. */
  open(id: string, opener?: HTMLElement): void;
  close(id: string): void;
  /** Closes whichever desk window is open, if any (Escape). */
  closeTop(): void;
}

export function createWindowManager(root: ParentNode): WindowManager {
  const openers = new Map<string, HTMLElement>();
  const find = (id: string) =>
    root.querySelector<HTMLElement>(SELECTORS.deskWindowById(id));

  const manager: WindowManager = {
    open(id, opener) {
      const win = find(id);
      if (!win) return;
      win.setAttribute(ATTRS.open, "");
      if (opener) {
        opener.setAttribute("aria-expanded", "true");
        openers.set(id, opener);
      }
      win.querySelector<HTMLElement>(SELECTORS.closeWindowButton)?.focus();
    },

    close(id) {
      const win = find(id);
      if (!win) return;
      win.removeAttribute(ATTRS.open);
      const opener = openers.get(id);
      if (opener) {
        opener.setAttribute("aria-expanded", "false");
        opener.focus();
        openers.delete(id);
      }
    },

    closeTop() {
      const open = root.querySelector<HTMLElement>(SELECTORS.openDeskWindow);
      if (open?.dataset.deskWindow) manager.close(open.dataset.deskWindow);
    },
  };
  return manager;
}
