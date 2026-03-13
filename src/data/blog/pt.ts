import type { BlogPost } from "@/types";

const blogPosts: BlogPost[] = [
  {
    slug: "primeiro-post",
    title: "Lorem Ipsum – Introdução ao Desenvolvimento Web Moderno",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    pubDate: new Date("2025-01-15"),
    tags: ["desenvolvimento", "web", "astronaut"],
    image: "/images/blog/primeiro-post.jpg",
    content: `# Apresentação

    Parece um pouco antiquado escrever um blog em tempos de Inteligência Artificial, não é? Mas talvez esses tempos sejam excelentes para refletir e voltar um pouco no tempo.`,
  },
];

export default blogPosts;
