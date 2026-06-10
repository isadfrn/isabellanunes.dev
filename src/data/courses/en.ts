import type { CourseEntry } from "@/types";

const courses: CourseEntry[] = [
  {
    title: "Software Architecture and Distributed Systems",
    platform: "Alura",
    platformLogo: "/favicon.svg",
    courseUrl: "https://www.alura.com.br/",
    tags: ["Architecture", "Backend", "Scalability"],
  },
  {
    title: "React, Astro, and modern interfaces",
    platform: "Udemy",
    platformLogo: "/favicon.svg",
    courseUrl: "https://www.udemy.com/",
    tags: ["Frontend", "React", "Astro"],
  },
  {
    title: "Observability and SRE",
    platform: "Coursera",
    platformLogo: "/favicon.svg",
    courseUrl: "https://www.coursera.org/",
    tags: ["SRE", "Monitoring", "Automation"],
  },
];

export default courses;
