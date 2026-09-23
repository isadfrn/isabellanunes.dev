import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("defaults the reveal delay to 0ms", () => {
    render(<Card>content</Card>);
    const el = screen.getByText("content");
    expect(el.style.getPropertyValue("--reveal-delay")).toBe("0ms");
  });

  it("applies a custom reveal delay", () => {
    render(<Card revealDelay={240}>content</Card>);
    const el = screen.getByText("content");
    expect(el.style.getPropertyValue("--reveal-delay")).toBe("240ms");
  });
});
