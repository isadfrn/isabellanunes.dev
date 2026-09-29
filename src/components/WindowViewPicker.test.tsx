import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import WindowViewPicker from "./WindowViewPicker";

const labels = {
  title: "Window view",
  sunny: "Sunny day",
  night: "Night",
  winter: "Winter",
  spring: "Spring",
  autumn: "Autumn",
  rain: "Rain",
};

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.windowView;
});

describe("WindowViewPicker", () => {
  it("starts on the sunny view", () => {
    render(<WindowViewPicker labels={labels} />);
    expect(screen.getByRole("radio", { name: "Sunny day" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Night" })).not.toBeChecked();
  });

  it("starts on the saved view applied to the page", () => {
    document.documentElement.dataset.windowView = "night";
    render(<WindowViewPicker labels={labels} />);
    expect(screen.getByRole("radio", { name: "Night" })).toBeChecked();
  });

  it("switches the page's view and remembers it", () => {
    render(<WindowViewPicker labels={labels} />);
    fireEvent.click(screen.getByRole("radio", { name: "Night" }));

    expect(document.documentElement.dataset.windowView).toBe("night");
    expect(localStorage.getItem("window-view")).toBe("night");
    expect(screen.getByRole("radio", { name: "Night" })).toBeChecked();

    fireEvent.click(screen.getByRole("radio", { name: "Sunny day" }));
    expect(document.documentElement.dataset.windowView).toBe("sunny");
    expect(localStorage.getItem("window-view")).toBe("sunny");
  });

  it("offers every view the scene has", () => {
    render(<WindowViewPicker labels={labels} />);
    expect(
      screen.getAllByRole("radio").map((radio) => radio.textContent),
    ).toEqual(["Sunny day", "Night", "Winter", "Spring", "Autumn", "Rain"]);
  });

  it("falls back to the default when the page has an unknown view", () => {
    document.documentElement.dataset.windowView = "volcano";
    render(<WindowViewPicker labels={labels} />);
    expect(screen.getByRole("radio", { name: "Sunny day" })).toBeChecked();
  });
});
