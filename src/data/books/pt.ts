import type { BookEntry } from "@/types";

const books: BookEntry[] = [
  {
    title:
      "Arquitetura Limpa: O guia do artesão para estrutura e design de software",
    author: "Robert C. Martin",
    affiliateUrl: "https://a.co/d/06j5uohd",
    tags: ["Arquitetura", "Design"],
  },
  {
    title:
      "Domain-Driven Design: atacando as complexidades no coração do software",
    author: "Eric Evans",
    affiliateUrl: "https://a.co/d/0e6H4YRw",
    tags: ["DDD", "Modelagem"],
  },
  {
    title: "O Programador Pragmático: sua jornada até a maestria",
    author: "David Thomas e Andrew Hunt",
    affiliateUrl: "https://a.co/d/00usKfuT",
    tags: ["Carreira", "Boas praticas"],
  },
];

export default books;
