import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";
import { getPrinterModels, toPrinterModels } from "./printerModels";

const image = (width: number) =>
  ({ src: `/${width}.png`, width, height: width }) as ImageMetadata;

describe("toPrinterModels", () => {
  it("lists the images sorted by path, with prettified names", () => {
    const fox = image(1);
    const zelda = image(2);

    expect(
      toPrinterModels({
        "/src/assets/printer-models/zelda-funko.png": zelda,
        "/src/assets/printer-models/low_poly_fox.webp": fox,
      }),
    ).toEqual([
      { id: "low_poly_fox", name: "Low Poly Fox", image: fox },
      { id: "zelda-funko", name: "Zelda Funko", image: zelda },
    ]);
  });

  it("returns nothing for an empty folder", () => {
    expect(toPrinterModels({})).toEqual([]);
  });
});

describe("getPrinterModels", () => {
  it("offers whatever is in src/assets/printer-models", () => {
    const models = getPrinterModels();
    expect(models.length).toBeGreaterThan(0);
    for (const model of models) {
      expect(model.id).toBeTruthy();
      expect(model.name).toBeTruthy();
      expect(model.image).toBeDefined();
    }
  });
});
