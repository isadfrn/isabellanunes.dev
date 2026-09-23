import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NavItem } from "@/types";
import { useScrollSpy } from "./useScrollSpy";

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
];

beforeEach(() => {
  document.body.innerHTML = "";
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

describe("useScrollSpy", () => {
  it("does nothing when disabled", () => {
    const { result } = renderHook(() => useScrollSpy(navItems, false));
    expect(result.current).toBeNull();
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("does not create an observer when no matching sections exist in the DOM", () => {
    const { result } = renderHook(() => useScrollSpy(navItems, true));
    expect(result.current).toBeNull();
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("observes matching sections and updates the active id on intersection", () => {
    const about = document.createElement("div");
    about.id = "about";
    document.body.appendChild(about);

    const { result, unmount } = renderHook(() =>
      useScrollSpy(navItems, true),
    );

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const observer = MockIntersectionObserver.instances[0];
    expect(observer.observed).toContain(about);

    act(() => {
      observer.callback([{ isIntersecting: true, target: about }]);
    });
    expect(result.current).toBe("about");

    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("ignores entries that are not intersecting", () => {
    const about = document.createElement("div");
    about.id = "about";
    document.body.appendChild(about);

    const { result } = renderHook(() => useScrollSpy(navItems, true));
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.callback([{ isIntersecting: false, target: about }]);
    });
    expect(result.current).toBeNull();
  });
});
