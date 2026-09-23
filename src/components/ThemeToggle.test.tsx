import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  it("reads light mode from the document by default", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Dark mode" }),
    ).toBeInTheDocument();
  });

  it("reads dark mode from the document when already set", () => {
    document.documentElement.dataset.theme = "dark";
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Light mode" }),
    ).toBeInTheDocument();
  });

  it("toggles the theme, updates the DOM and persists to localStorage", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Dark mode" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: "Light mode" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Light mode" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("accepts custom labels and className", () => {
    render(
      <ThemeToggle
        labels={{ light: "Claro", dark: "Escuro" }}
        className="custom"
      />,
    );
    const button = screen.getByRole("button", { name: "Escuro" });
    expect(button).toHaveClass("custom");
  });
});
