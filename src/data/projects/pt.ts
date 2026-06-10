import type { ProjectEntry } from "@/types";

const projects: ProjectEntry[] = [
  {
    slug: "rfid-platform",
    title: "Plataforma RFID para centros de distribuicao",
    description:
      "Sistema para impressao, rastreabilidade e monitoracao de etiquetas RFID em ambientes logisticos de alto volume.",
    tags: ["RFID", "IoT", "Observabilidade", "Full Stack"],
  },
  {
    slug: "sre-automation",
    title: "Automacao SRE para operacoes globais",
    description:
      "Plataforma de automacao com drivers customizados, dashboards e integracoes para times distribuidos.",
    tags: ["SRE", "Python", "MongoDB", "Automacao"],
  },
  {
    slug: "healthcare-modernization",
    title: "Modernizacao em plataforma de saude",
    description:
      "Migracao de servicos, melhoria de performance e modernizacao frontend para produto usado globalmente.",
    tags: ["PostgreSQL", "Java", "Angular", "Microsservicos"],
  },
];

export default projects;
