import { describe, expect, it, vi } from "vitest";

vi.mock("node:fs", () => {
  const mocked = { existsSync: vi.fn(), readdirSync: vi.fn() };
  return { ...mocked, default: mocked };
});

const { existsSync, readdirSync } = await import("node:fs");
const { getPrinterModels } = await import("./printerModels");

describe("getPrinterModels", () => {
  it("returns an empty list when the folder doesn't exist", () => {
    vi.mocked(existsSync).mockReturnValue(false);
    expect(getPrinterModels()).toEqual([]);
  });

  it("lists only image files, sorted, with prettified names", () => {
    vi.mocked(existsSync).mockReturnValue(true);
    vi.mocked(readdirSync).mockReturnValue([
      "zelda-funko.png",
      "notes.txt",
      "low_poly_fox.webp",
    ] as unknown as ReturnType<typeof readdirSync>);

    expect(getPrinterModels()).toEqual([
      {
        id: "low_poly_fox",
        name: "Low Poly Fox",
        src: "/images/models-printer/low_poly_fox.webp",
      },
      {
        id: "zelda-funko",
        name: "Zelda Funko",
        src: "/images/models-printer/zelda-funko.png",
      },
    ]);
  });
});
