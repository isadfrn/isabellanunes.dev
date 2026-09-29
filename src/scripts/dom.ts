// The contract between the scene's markup (src/components/scene/*.astro) and
// the scripts that drive it. Selectors live here and nowhere else, so a
// rename is one edit in one file — and dom.test.ts checks that every
// `data-action` the markup uses has a handler.

export const SCENE_ROOT = "[data-scene]";

export const SELECTORS = {
  action: "[data-action]",
  toggleTarget: (target: string) => `[data-toggle-target="${target}"]`,

  deskWindow: "[data-desk-window]",
  deskWindowById: (id: string) => `[data-desk-window="${id}"]`,
  openDeskWindow: "[data-desk-window][data-open]",
  closeWindowButton: '[data-action="close-window"]',

  printerRig: ".printer-rig",
  printerObject: "[data-printer-object]",
  printerModels: 'input[name="printer-model"]',
  checkedPrinterModel: 'input[name="printer-model"]:checked',

  desktop: ".computer-desktop",
  desktopMenu: ".desktop-ui__menu",
  desktopWindowTitle: "[data-desktop-window-title]",
  program: "[data-desktop-program]",
  programById: (id: string) => `[data-desktop-program="${id}"]`,
  closeProgramButton: '[data-action="close-programs"]',
  blogMore: "[data-blog-more]",

  clockTime: "[data-computer-clock-time]",
  clockDate: "[data-computer-clock-date]",

  lazyViewImage: "img[data-view-src]",
} as const;

export const ATTRS = {
  open: "data-open",
  printing: "data-printing",
  on: "data-on",
} as const;
