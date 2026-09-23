import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookCard from "./BookCard";

const labels = { buyBook: "Buy book" };

describe("BookCard", () => {
  it("renders title, author and the buy link", () => {
    render(
      <BookCard
        entry={{
          title: "Clean Code",
          author: "Robert C. Martin",
          affiliateUrl: "https://example.com/book",
        }}
        labels={labels}
      />,
    );
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /buy book/i })).toHaveAttribute(
      "href",
      "https://example.com/book",
    );
  });

  it("renders a cover image when provided", () => {
    render(
      <BookCard
        entry={{
          title: "Clean Code",
          author: "Robert C. Martin",
          affiliateUrl: "https://example.com/book",
          cover: "/cover.jpg",
        }}
        labels={labels}
      />,
    );
    expect(screen.getByRole("img", { name: "Clean Code" })).toHaveAttribute(
      "src",
      "/cover.jpg",
    );
  });

  it("omits the cover image when not provided", () => {
    render(
      <BookCard
        entry={{
          title: "Clean Code",
          author: "Robert C. Martin",
          affiliateUrl: "https://example.com/book",
        }}
        labels={labels}
      />,
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders tags when provided", () => {
    render(
      <BookCard
        entry={{
          title: "Clean Code",
          author: "Robert C. Martin",
          affiliateUrl: "https://example.com/book",
          tags: ["engineering", "craft"],
        }}
        labels={labels}
      />,
    );
    expect(screen.getByText("engineering")).toBeInTheDocument();
    expect(screen.getByText("craft")).toBeInTheDocument();
  });

  it("renders no tags when the list is empty", () => {
    render(
      <BookCard
        entry={{
          title: "Clean Code",
          author: "Robert C. Martin",
          affiliateUrl: "https://example.com/book",
          tags: [],
        }}
        labels={labels}
      />,
    );
    expect(screen.queryByText("engineering")).not.toBeInTheDocument();
  });
});
