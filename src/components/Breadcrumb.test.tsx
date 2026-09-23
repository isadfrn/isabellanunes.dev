import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Breadcrumb from "./Breadcrumb";

const items = [
  { href: "/en", label: "Home" },
  { href: "/en/blog", label: "Blog" },
  { href: "/en/blog/post", label: "My Post" },
];

describe("Breadcrumb", () => {
  it("renders every item's label", () => {
    render(<Breadcrumb items={items} />);
    for (const item of items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it("renders the last item as the current page, not a link", () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText("My Post");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.closest("a")).toBeNull();
  });

  it("renders earlier items as links", () => {
    render(<Breadcrumb items={items} />);
    expect(
      screen.getByRole("link", { name: "Home" }),
    ).toHaveAttribute("href", "/en");
    expect(
      screen.getByRole("link", { name: "Blog" }),
    ).toHaveAttribute("href", "/en/blog");
  });

  it("does not render a separator before the first item", () => {
    render(<Breadcrumb items={[items[0]]} />);
    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });

  it("renders a separator between items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getAllByText("/")).toHaveLength(items.length - 1);
  });
});
