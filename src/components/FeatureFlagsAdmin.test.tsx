import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEY } from "@/lib/features";
import FeatureFlagsAdmin from "./FeatureFlagsAdmin";

describe("FeatureFlagsAdmin", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a visibility switch for every section, defaulting to visible", () => {
    render(<FeatureFlagsAdmin />);
    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBeGreaterThan(0);
    for (const el of switches) {
      expect(el).toHaveAttribute("aria-checked", "true");
    }
    expect(screen.getAllByText("Visible").length).toBe(switches.length);
  });

  it("toggling a switch flips it, shows Saved, persists, then reverts", () => {
    vi.useFakeTimers();
    try {
      render(<FeatureFlagsAdmin />);
      const [firstSwitch] = screen.getAllByRole("switch");

      fireEvent.click(firstSwitch);

      expect(firstSwitch).toHaveAttribute("aria-checked", "false");
      expect(screen.getByText("Saved")).toBeInTheDocument();

      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) throw new Error("expected flags to be stored");
      expect(Object.values(JSON.parse(raw))).toContain(false);

      act(() => {
        vi.advanceTimersByTime(1200);
      });

      expect(screen.queryByText("Saved")).not.toBeInTheDocument();
      expect(screen.getByText("Hidden")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
