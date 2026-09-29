/** Adds `is-revealed` to each `[data-reveal]` element as it scrolls into view. */
export function observeReveals(root: ParentNode, signal: AbortSignal): void {
  const elements = root.querySelectorAll<HTMLElement>(
    "[data-reveal]:not(.is-revealed)",
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  elements.forEach((element) => observer.observe(element));
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
}
