import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/i18n/locales/en.json";
import type { NavItem } from "@/types";
import HamburgerMenu from "./HamburgerMenu";

type ObserveCallback = (
  entries: Pick<IntersectionObserverEntry, "isIntersecting" | "target">[],
) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observed: Element[] = [];
  disconnect = vi.fn();
  callback: ObserveCallback;

  constructor(callback: ObserveCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.push(el);
  }

  unobserve() {}
}

const navItems: NavItem[] = [
  { key: "home", href: "/en", label: "Home" },
  { key: "about", href: "/en#about", label: "About" },
  { key: "blog", href: "/en/blog", label: "Blog" },
];

const translations = { common: en.common };

beforeEach(() => {
  document.body.innerHTML = "";
  localStorage.clear();
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

describe("HamburgerMenu", () => {
  it("renders a closed trigger with no dialog content", () => {
    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en"
        navItems={navItems}
        translations={translations}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens to show nav items, theme toggle and language switch", () => {
    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/en#about",
    );
    expect(
      screen.getByRole("button", { name: "Dark mode" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Switch to Portuguese" }),
    ).toHaveAttribute("href", "/pt/");
  });

  it("closes when the close button is clicked", () => {
    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("marks the blog link active whenever the path is under /blog, regardless of scroll position", () => {
    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en/blog/my-post"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("link", { name: "Blog" })).toHaveClass(
      "bg-primary-50",
    );
  });

  it("does not mark section links active when off the home page", () => {
    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en/blog/my-post"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("link", { name: "About" })).not.toHaveClass(
      "bg-primary-50",
    );
  });

  it("offers to switch to English when browsing in Portuguese", () => {
    render(
      <HamburgerMenu
        locale="pt"
        currentPath="/pt"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(
      screen.getByRole("link", { name: "Switch to English" }),
    ).toHaveAttribute("href", "/en/");
  });

  it("closes when a nav link is clicked", () => {
    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("marks the scrolled-to section active on the home page", () => {
    const about = document.createElement("div");
    about.id = "about";
    document.body.appendChild(about);

    render(
      <HamburgerMenu
        locale="en"
        currentPath="/en"
        navItems={navItems}
        translations={translations}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const observer = MockIntersectionObserver.instances[0];
    act(() => {
      observer.callback([{ isIntersecting: true, target: about }]);
    });

    expect(screen.getByRole("link", { name: "About" })).toHaveClass(
      "bg-primary-50",
    );
  });
});
