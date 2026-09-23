import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CtaLink from "./CtaLink";

describe("CtaLink", () => {
  it("renders a link to the given href with default rel", () => {
    render(<CtaLink href="https://example.com">Visit</CtaLink>);
    const link = screen.getByRole("link", { name: /visit/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("applies the solid variant classes by default", () => {
    render(<CtaLink href="#">Go</CtaLink>);
    expect(screen.getByRole("link")).toHaveClass("bg-primary-500");
  });

  it("applies the outline variant classes when requested", () => {
    render(
      <CtaLink href="#" variant="outline">
        Go
      </CtaLink>,
    );
    expect(screen.getByRole("link")).toHaveClass("border-slate-200");
  });

  it("allows overriding rel and appending a custom className", () => {
    render(
      <CtaLink href="#" rel="sponsored" className="flex-1">
        Go
      </CtaLink>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("rel", "sponsored");
    expect(link).toHaveClass("flex-1");
  });
});
