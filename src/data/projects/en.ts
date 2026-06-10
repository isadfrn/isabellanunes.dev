import type { ProjectEntry } from "@/types";

const projects: ProjectEntry[] = [
  {
    slug: "rfid-platform",
    title: "RFID platform for distribution centers",
    description:
      "System for printing, traceability, and monitoring of RFID tags in high-volume logistics environments.",
    tags: ["RFID", "IoT", "Observability", "Full Stack"],
  },
  {
    slug: "sre-automation",
    title: "SRE automation for global operations",
    description:
      "Automation platform with custom drivers, dashboards, and integrations for distributed teams.",
    tags: ["SRE", "Python", "MongoDB", "Automation"],
  },
  {
    slug: "healthcare-modernization",
    title: "Healthcare platform modernization",
    description:
      "Service migration, performance improvements, and frontend modernization for a globally used product.",
    tags: ["PostgreSQL", "Java", "Angular", "Microservices"],
  },
];

export default projects;
