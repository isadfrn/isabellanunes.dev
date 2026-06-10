import type { TimelineEntry } from "@/types";

const careerTimeline: TimelineEntry[] = [
  {
    title: "Software Engineer",
    organization: "Grupo Boticario",
    period: "Jan 2023 - Jul 2025",
    description: [
      "Designed and built a platform for RFID tag management in distribution centers.",
      "Integrated industrial printers, IoT devices, and real-time monitoring.",
      "Created an architecture prepared for demand peaks and end-to-end traceability.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Dell Technologies",
    period: "Feb 2020 - Jan 2023",
    description: [
      "Built an SRE platform to automate internal services with SQL, Shell, Python, and MongoDB.",
      "Created custom drivers and dashboards for global warehouses and factories.",
      "Collaborated with teams in India, Malaysia, China, and the United States.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Philips",
    period: "Mar 2018 - Feb 2020",
    description: [
      "Led a global migration from MongoDB to PostgreSQL in a critical microservice.",
      "Modernized Tasy components and helped decouple legacy modules.",
      "Supported global teams with performance improvements and development standards.",
    ],
  },
  {
    title: "Software Developer",
    organization: "Senac",
    period: "May 2012 - Mar 2018",
    description: [
      "Developed an internal learning management system used across SENAC Goias units.",
      "Integrated with TOTVS HR and centralized educational processes.",
      "Delivered digital classrooms, video lessons, and student progress tracking.",
    ],
  },
];

export default careerTimeline;
