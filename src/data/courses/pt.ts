import type { CourseEntry } from "@/types";

const courses: CourseEntry[] = [
  {
    title: "Arquitetura de Software e Sistemas Distribuidos",
    platform: "Alura",
    platformLogo: "/favicon.svg",
    courseUrl: "https://www.alura.com.br/",
    tags: ["Arquitetura", "Backend", "Escalabilidade"],
  },
  {
    title: "React, Astro e interfaces modernas",
    platform: "Udemy",
    platformLogo: "/favicon.svg",
    courseUrl: "https://www.udemy.com/",
    tags: ["Frontend", "React", "Astro"],
  },
  {
    title: "Observabilidade e SRE",
    platform: "Coursera",
    platformLogo: "/favicon.svg",
    courseUrl: "https://www.coursera.org/",
    tags: ["SRE", "Monitoracao", "Automacao"],
  },
];

export default courses;
