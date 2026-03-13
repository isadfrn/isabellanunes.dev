import type { BlogPost } from "@/types";

const blogPosts: BlogPost[] = [
  {
    slug: "first-post",
    title: "Lorem Ipsum – Introduction to Modern Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    pubDate: new Date("2025-01-15"),
    tags: ["development", "web", "astronaut"],
    image: "/images/blog/first-post.jpg",
    content: `
      # Presentation
    `,
  },
];

export default blogPosts;
