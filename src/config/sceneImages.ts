import type { ImageMetadata } from "astro";

// The scene's artwork lives in src/assets/scene rather than public/, so Astro
// can resize, convert and fingerprint it at build time: each image ships at
// the size its item is drawn at (see toImageWidth), as WebP, under a content
// hash that makes a year of caching safe. `src` in scene.ts is a file name in
// that folder.
const FILES = import.meta.glob<ImageMetadata>(
  "/src/assets/scene/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
);
const FOLDER = "/src/assets/scene/";

export const IMAGE_FORMAT = "webp";
export const IMAGE_QUALITY = 82;

export function sceneImageNames(): string[] {
  return Object.keys(FILES).map((path) => path.slice(FOLDER.length));
}

export function resolveSceneImage(name: string): ImageMetadata {
  const image = FILES[`${FOLDER}${name}`];
  if (!image) {
    throw new Error(
      `Scene image "${name}" is not in src/assets/scene. Found: ${sceneImageNames().join(", ")}`,
    );
  }
  return image;
}

/**
 * An image's own width. Astro hands out imported images as proxies and keeps
 * the original file in the build whenever one of their properties is read, so
 * read it off the plain copy: only the optimized versions are meant to ship.
 */
export function nativeWidth(image: ImageMetadata): number {
  return ((image as WithCopy).clone ?? image).width;
}

// `clone` exists at runtime (Astro's own getImage uses it) but not in its types.
type WithCopy = ImageMetadata & { clone?: ImageMetadata };
