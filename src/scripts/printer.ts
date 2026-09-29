import { ATTRS, SELECTORS } from "./dom";

/**
 * Which model to print for the element that asked: the checked one when it is
 * the model picker (a form), else the element's own `data-model`, else the
 * first model on offer.
 */
export function pickPrinterModel(
  root: ParentNode,
  source: HTMLElement,
): string | undefined {
  if (source instanceof HTMLFormElement) {
    return source.querySelector<HTMLInputElement>(SELECTORS.checkedPrinterModel)
      ?.value;
  }
  return (
    source.dataset.model ||
    root.querySelector<HTMLInputElement>(SELECTORS.printerModels)?.value
  );
}

/** Runs the print animation for the model image at `src`. */
export function startPrint(root: ParentNode, src: string): void {
  const rig = root.querySelector<HTMLElement>(SELECTORS.printerRig);
  const image = rig?.querySelector<HTMLImageElement>(SELECTORS.printerObject);
  if (!rig || !image) return;
  image.src = src;
  // Drop the attribute and force a reflow before re-adding it, so the
  // animation restarts from the beginning even if one just finished.
  rig.removeAttribute(ATTRS.printing);
  void rig.offsetWidth;
  rig.setAttribute(ATTRS.printing, "on");
}
