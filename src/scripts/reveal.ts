import { onEachPage } from "./lifecycle";
import { observeReveals } from "./revealObserver";

// Loaded by components/RevealAnimations.astro, on every page.
onEachPage((signal) => observeReveals(document, signal));
