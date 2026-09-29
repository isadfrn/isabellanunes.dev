import type { ImageMetadata } from "astro";

const IMAGE_EXTENSION = /\.(png|jpe?g|webp|avif)$/i;

// Whatever image files sit in src/assets/printer-models are the models on
// offer to print — dropping a new one in makes it printable without
// touching any code.
const FILES = import.meta.glob<ImageMetadata>(
  "/src/assets/printer-models/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
);

export interface PrinterModel {
  id: string;
  name: string;
  image: ImageMetadata;
}

export function toPrinterModels(
  files: Record<string, ImageMetadata>,
): PrinterModel[] {
  return Object.keys(files)
    .sort()
    .map((path) => {
      const id = (path.split("/").pop() ?? path).replace(IMAGE_EXTENSION, "");
      return { id, name: prettifyModelName(id), image: files[path] };
    });
}

export function getPrinterModels(): PrinterModel[] {
  return toPrinterModels(FILES);
}

function prettifyModelName(id: string): string {
  return id
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
