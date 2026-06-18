import type { TimelineEntry } from "@/types";

const careerTimeline: TimelineEntry[] = [
  {
    title: "Software Engineer",
    organization: "Grupo Boticário",
    period: "Jan 2023 - Jul 2025",
    location: "Curitiba, Paraná, Brazil",
    workMode: "Remote",
    description: [
      "Designed and developed a ground-up RFID tag management platform for distribution centers (DCs).",
      "Processed 50K+ tags/day per DC, serving 1,500+ direct/indirect users.",
      "Integrated industrial printing systems and IoT devices, enabling real-time monitoring.",
      "Ensured end-to-end traceability for all products in group’s traceability pilot program.",
      "Deployed across 2 DCs, reducing inventory errors by 35%; now scalable to all group DCs.",
      "Elastic architecture handled 3x average demand spikes during promotions.",
      "Analytics with New Relic dashboards, enabling teams to: Identify bugs/operational failures, drive data-driven decisions and optimize logistics processes.",
    ],
  },
  {
    title: "Programming Teacher",
    organization: "Cubos Academy",
    period: "Nov 2022 - Jan 2025",
    location: "Salvador, Bahia, Brazil",
    workMode: "Remote",
    description: [
      "Trained 800+ students across multiple cohorts, covering full-stack development and software engineering fundamentals.",
      "Conducted a cohort of 100 women as part of the iFood 1000 program, training women from scratch in technology with zero prior experience.",
      "Recorded a Java course, producing structured video content for asynchronous learning at scale.",
      "Mentored students through career transitions, helping them land their first roles in tech.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "iFood",
    period: "Jan 2022 - Jan 2023",
    location: "Osasco, São Paulo, Brazil",
    workMode: "Remote",
    description: [
      "Contributed to the development and evolution of high-availability financial systems, ensuring the reliability and transactional integrity of the payments ecosystem. My work directly impacted sales conversion rates and platform stability during high-traffic peaks.",
      "Payments Engine: Architected and engineered the transactional processing core, designed to handle high throughput while guaranteeing data consistency at scale.",
      "Smart Routing & Fallback: Designed and implemented a dynamic payment routing system. The mechanism detects failures in acquirers or payment methods in real time and instantly redirects traffic to a fallback route, maximizing authorization rates and minimizing end-user friction.",
      "Penalty & Rules Engine: Developed a transaction penalty system to mitigate risks by applying complex business rules to block or restrict undesirable payment attempts based on flow behavior patterns.",
    ],
  },
  {
    title: "Programming Teacher",
    organization: "Digital House Brasil",
    period: "Jun 2022 - Dec 2022",
    location: "São Paulo, São Paulo, Brazil",
    workMode: "Remote",
    description: [
      "Delivered programming courses to 200+ students, focusing on practical skills and industry-ready knowledge.",
      "Developed exercises and assessments to reinforce learning outcomes and track student progress.",
      "Supported students in building portfolios and preparing for technical interviews.",
    ],
  },
  {
    title: "Programming Teacher",
    organization: "Blue EdTech",
    period: "May 2021 - Jul 2022",
    location: "São Paulo, São Paulo, Brazil",
    workMode: "Remote",
    description: [
      "Delivered hands-on programming courses covering web development fundamentals, backend, and frontend technologies.",
      "Trained 400+ students, guiding them through real-world projects and best coding practices.",
      "Developed and structured course content, exercises, and assessments aligned with industry demands.",
      "Supported career transition students, helping them build portfolios and prepare for their first tech roles.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Dell Technologies",
    period: "Feb 2019 - Jan 2022",
    location: "Round Rock, Texas, United States",
    workMode: "Remote",
    description: [
      "Designed and developed an SRE platform for Dell’s internal teams to automate services, leveraging SQL scripts, Shell, Python, MongoDB, and other integrated technologies.",
      "Developed 30+ custom drivers to enhance platform functionality.",
      "Deployed the platform as a monitoring solution for Dell’s global warehouses and factories, featuring real-time dashboards and diagnostic diagrams.",
      "Collaborated with the Procurement team to automate processes, achieving 82% process automation and resolving ServiceNow incidents through workflow modernization.",
      "Collaborated with international teams (India, Malaysia, China, US) on the platform’s development and deployment, aligning requirements and ensuring global integration.",
      "Worked on IST timezone.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Philips",
    period: "Mar 2017 - Feb 2019",
    location: "Blumenau, Santa Catarina, Brazil",
    workMode: "Hybrid",
    description: [
      "Led the global migration of a critical microservice from MongoDB to PostgreSQL, impacting 1,000+ developers across Philips’ teams in the Netherlands, India, and other regions. The refactor improved data consistency, query performance, and long-term maintainability.",
      "Contributed to the platformization initiative, modularizing the oncology monolith (part of Philips Tasy, used in 30+ countries) into microservices while upgrading the stack from Java 8 to Java 11. Collaborated with cross-functional teams to ensure seamless adoption.",
      "Supported frontend modernization by assisting Tasy teams in migrating legacy Delphi components to Angular, enhancing UI scalability for a system serving 5,000+ healthcare institutions worldwide.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Senac",
    period: "May 2011 - Mar 2017",
    location: "Jataí, Goiás, Brazil",
    workMode: "On-site",
    description: [
      "Full Cycle development of SEI, a proprietary LMS (Learning Management System) inspired by Moodle, deployed across all SENAC units in Goiás to centralize academic operations.",
      "Engineered integration with TOTVS HR systems, automating data synchronization for 100,000+ students and instructors.",
      "Empowered statewide education programs (in-person, Pronatec, EAD, technical, and vocational courses) with digital classrooms (video lectures, interactive materials, and progress tracking), automated attendance and reporting with real-time dashboards, and custom academic tools for grading, feedback, and administrative workflows.",
      "Scaled the platform to support high-volume usage while maintaining performance and reliability.",
      "Became the core educational platform for SENAC Goiás, reducing administrative overhead by 40%.",
    ],
  },
];

export default careerTimeline;
