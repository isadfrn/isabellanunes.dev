import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CourseCard from "./CourseCard";

const labels = { certificate: "View certificate", viewCourse: "View course" };

describe("CourseCard", () => {
  it("renders the platform badge and title", () => {
    render(
      <CourseCard
        entry={{ title: "Algorithms 101", platform: "Coursera" }}
        labels={labels}
      />,
    );
    expect(screen.getByText("Coursera")).toBeInTheDocument();
    expect(screen.getByText("Algorithms 101")).toBeInTheDocument();
  });

  it("renders both links when both URLs are provided", () => {
    render(
      <CourseCard
        entry={{
          title: "Algorithms 101",
          platform: "Coursera",
          certificateUrl: "https://example.com/cert",
          courseUrl: "https://example.com/course",
        }}
        labels={labels}
      />,
    );
    expect(
      screen.getByRole("link", { name: /view certificate/i }),
    ).toHaveAttribute("href", "https://example.com/cert");
    expect(
      screen.getByRole("link", { name: /view course/i }),
    ).toHaveAttribute("href", "https://example.com/course");
  });

  it("renders no links when neither URL is provided", () => {
    render(
      <CourseCard
        entry={{ title: "Algorithms 101", platform: "Coursera" }}
        labels={labels}
      />,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders tags when provided", () => {
    render(
      <CourseCard
        entry={{
          title: "Algorithms 101",
          platform: "Coursera",
          tags: ["cs", "math"],
        }}
        labels={labels}
      />,
    );
    expect(screen.getByText("cs")).toBeInTheDocument();
    expect(screen.getByText("math")).toBeInTheDocument();
  });
});
