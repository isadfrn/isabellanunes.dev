import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const MODELS_DIR = path.join(process.cwd(), "public/images/models-printer");
const IMAGE_EXTENSION = /\.(png|jpe?g|webp|svg)$/i;

export interface PrinterModel {
  id: string;
  name: string;
  src: string;
}

// Whatever image files sit in public/images/models-printer are the models on
// offer to print — dropping a new one in makes it printable without
// touching any code.
export function getPrinterModels(): PrinterModel[] {
  if (!existsSync(MODELS_DIR)) return [];
  return readdirSync(MODELS_DIR)
    .filter((file) => IMAGE_EXTENSION.test(file))
    .sort()
    .map((file) => {
      const id = file.replace(IMAGE_EXTENSION, "");
      return {
        id,
        name: prettifyModelName(id),
        src: `/images/models-printer/${file}`,
      };
    });
}

function prettifyModelName(id: string): string {
  return id
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
