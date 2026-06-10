import type { BookEntry } from "@/types";

const books: BookEntry[] = [
  {
    title: "Arquitetura Limpa",
    author: "Robert C. Martin",
    affiliateUrl: "https://www.amazon.com.br/s?k=arquitetura+limpa",
    tags: ["Arquitetura", "Design"],
  },
  {
    title: "Projeto Orientado pelo Dominio",
    author: "Eric Evans",
    affiliateUrl: "https://www.amazon.com.br/s?k=domain+driven+design",
    tags: ["DDD", "Modelagem"],
  },
  {
    title: "O Programador Pragmatico",
    author: "David Thomas e Andrew Hunt",
    affiliateUrl: "https://www.amazon.com.br/s?k=o+programador+pragmatico",
    tags: ["Carreira", "Boas praticas"],
  },
];

export default books;
