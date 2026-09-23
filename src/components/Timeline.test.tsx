import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Timeline from "./Timeline";

describe("Timeline", () => {
  it("renders the organization inline with the formatted period by default", () => {
    render(
      <Timeline
        locale="en"
        granularity="month"
        presentLabel="Present"
        entries={[
          {
            title: "Senior Engineer",
            organization: "Acme",
            startDate: "2023-01-01",
            endDate: "2023-06-15",
          },
        ]}
      />,
    );
    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
    expect(screen.getByText(/Acme.*Jan 2023 - Jun 2023/)).toBeInTheDocument();
  });

  it("uses the present label when there is no end date", () => {
    render(
      <Timeline
        locale="en"
        granularity="month"
        presentLabel="Present"
        entries={[
          {
            title: "Senior Engineer",
            organization: "Acme",
            startDate: "2023-01-01",
          },
        ]}
      />,
    );
    expect(screen.getByText(/Jan 2023 - Present/)).toBeInTheDocument();
  });

  it("formats by year when granularity is 'year'", () => {
    render(
      <Timeline
        locale="en"
        granularity="year"
        presentLabel="Present"
        entries={[
          {
            title: "Senior Engineer",
            organization: "Acme",
            startDate: "2023-01-01",
            endDate: "2024-06-15",
          },
        ]}
      />,
    );
    expect(screen.getByText(/2023 - 2024/)).toBeInTheDocument();
  });

  it("renders the organization as a badge and omits it from the period line when orgAsBadge is set", () => {
    render(
      <Timeline
        locale="en"
        granularity="month"
        presentLabel="Present"
        orgAsBadge
        entries={[
          {
            title: "Algorithms 101",
            organization: "Coursera",
            startDate: "2023-01-01",
            endDate: "2023-02-01",
          },
        ]}
      />,
    );
    expect(screen.getByText("Coursera")).toBeInTheDocument();
    expect(screen.getByText("Jan 2023 - Feb 2023")).toBeInTheDocument();
  });

  it("renders workMode, location and description when provided", () => {
    render(
      <Timeline
        locale="en"
        granularity="month"
        presentLabel="Present"
        entries={[
          {
            title: "Senior Engineer",
            organization: "Acme",
            startDate: "2023-01-01",
            workMode: "Remote",
            location: "Fully remote",
            description: ["Led the platform team", "Shipped v2"],
          },
        ]}
      />,
    );
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText(/Fully remote/)).toBeInTheDocument();
    expect(screen.getByText("Led the platform team")).toBeInTheDocument();
    expect(screen.getByText("Shipped v2")).toBeInTheDocument();
  });

  it("omits workMode, location and description when absent", () => {
    render(
      <Timeline
        locale="en"
        granularity="month"
        presentLabel="Present"
        entries={[
          {
            title: "Senior Engineer",
            organization: "Acme",
            startDate: "2023-01-01",
          },
        ]}
      />,
    );
    expect(screen.queryByRole("list", { hidden: true })).not.toBeNull();
    expect(screen.queryByText("Led the platform team")).not.toBeInTheDocument();
  });

  it("renders one entry per item, keyed by organization and start date", () => {
    render(
      <Timeline
        locale="en"
        granularity="month"
        presentLabel="Present"
        entries={[
          { title: "Role A", organization: "Acme", startDate: "2022-01-01" },
          { title: "Role B", organization: "Globex", startDate: "2023-01-01" },
        ]}
      />,
    );
    expect(screen.getByText("Role A")).toBeInTheDocument();
    expect(screen.getByText("Role B")).toBeInTheDocument();
  });
});
