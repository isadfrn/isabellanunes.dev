import type { BookEntry } from "@/types";

const books: BookEntry[] = [
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    affiliateUrl: "https://www.amazon.com/s?k=clean+architecture",
    tags: ["Architecture", "Design"],
  },
  {
    title: "Domain-Driven Design",
    author: "Eric Evans",
    affiliateUrl: "https://www.amazon.com/s?k=domain+driven+design",
    tags: ["DDD", "Modeling"],
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas and Andrew Hunt",
    affiliateUrl: "https://www.amazon.com/s?k=the+pragmatic+programmer",
    tags: ["Career", "Practices"],
  },
];

export default books;
