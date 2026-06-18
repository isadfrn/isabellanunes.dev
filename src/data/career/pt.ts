import type { TimelineEntry } from "@/types";

const careerTimeline: TimelineEntry[] = [
  {
    title: "Desenvolvedora de Software",
    organization: "Grupo Boticário",
    period: "Jan 2023 - Jul 2025",
    location: "Curitiba, Paraná, Brasil",
    workMode: "Remoto",
    description: [
      "Projetei e desenvolvi do zero uma plataforma de gerenciamento de etiquetas RFID para centros de distribuição (CDs).",
      "Processei mais de 50 mil etiquetas/dia por CD, atendendo a mais de 1.500 usuários diretos/indiretos.",
      "Integrei sistemas de impressão industrial e dispositivos IoT, permitindo o monitoramento em tempo real.",
      "Garanti a rastreabilidade de ponta a ponta de todos os produtos no programa piloto de rastreabilidade do grupo.",
      "Implantada em 2 CDs, reduzindo erros de estoque em 35%; agora escalável para todos os CDs do grupo.",
      "Arquitetura elástica que suportou picos de demanda 3 vezes maiores que a média durante promoções.",
      "Analytics com dashboards do New Relic, permitindo às equipes: identificar bugs/falhas operacionais, impulsionar decisões baseadas em dados e otimizar processos logísticos.",
    ],
  },
  {
    title: "Instrutor de Programação",
    organization: "Cubos Academy",
    period: "Nov 2022 - Jan 2025",
    location: "Salvador, Bahia, Brasil",
    workMode: "Remoto",
    description: [
      "Treinei mais de 800 alunos em múltiplas turmas, cobrindo desenvolvimento full-stack e fundamentos de engenharia de software.",
      "Conduzi uma turma de 100 mulheres como parte do programa iFood 1000, formando mulheres em tecnologia do zero.",
      "Gravei um curso de Java, produzindo conteúdo em vídeo para aprendizado assíncrono em larga escala.",
      "Mentorei alunos em transição de carreira, apoiando-os na conquista do primeiro emprego em tech.",
    ],
  },
  {
    title: "Desenvolvedora de Software",
    organization: "iFood",
    period: "Jan 2022 - Jan 2023",
    location: "Osasco, São Paulo, Brasil",
    workMode: "Remoto",
    description: [
      "Atuei no desenvolvimento e evolução de sistemas financeiros e de alta disponibilidade, garantindo a transacionalidade e a resiliência do ecossistema de pagamentos. Minha atuação teve impacto direto na conversão de vendas e na estabilidade da plataforma em momentos de pico.",
      "Motor de Pagamentos: Engenharia e arquitetura do core de processamento transacional, desenhado para suportar alto throughput e garantir a consistência de dados em larga escala.",
      "Smart Routing & Fallback: Concepção e implementação de um sistema dinâmico de roteamento de pagamentos. O mecanismo detecta falhas em adquirentes ou métodos de pagamento em tempo real e alterna instantaneamente para uma rota de fallback, maximizando a taxa de aprovação (authorization rate) e reduzindo o atrito para o usuário final.",
      "Motor de Penalização/Regras: Desenvolvimento de um sistema de penalização de transações para mitigar riscos, aplicando regras complexas de negócio para bloquear ou restringir tentativas de pagamento indesejadas com base no comportamento do fluxo.",
    ],
  },
  {
    title: "Instrutor de Programação",
    organization: "Digital House Brasil",
    period: "Jun 2022 - Dec 2022",
    location: "São Paulo, São Paulo, Brasil",
    workMode: "Remoto",
    description: [
      "Ministrei cursos de programação para mais de 200 alunos, com foco em habilidades práticas e prontas para o mercado.",
      "Desenvolvi exercícios e avaliações para reforçar o aprendizado e acompanhar a evolução dos alunos.",
      "Apoiei alunos na construção de portfólios e na preparação para entrevistas técnicas.",
    ],
  },
  {
    title: "Instrutora de Programação",
    organization: "Blue EdTech",
    period: "May 2021 - Jul 2022",
    location: "São Paulo, São Paulo, Brasil",
    workMode: "Remoto",
    description: [
      "Ministrei cursos práticos de programação com foco em desenvolvimento web, back-end e front-end.",
      "Treinei mais de 400 alunos, conduzindo-os por projetos reais e boas práticas de desenvolvimento.",
      "Desenvolvi e estruturei conteúdos, exercícios e avaliações alinhados às demandas do mercado.",
      "Apoiei alunos em transição de carreira, ajudando-os a construir portfólios e se preparar para o primeiro emprego em tech.",
    ],
  },
  {
    title: "Desenvolvedora de Software",
    organization: "Dell Technologies",
    period: "Feb 2019 - Jan 2022",
    location: "Round Rock, Texas, Estados Unidos",
    workMode: "Remoto",
    description: [
      "Projeto e desenvolvimento de uma plataforma SRE para equipes internas da Dell, automatizando serviços com o uso de scripts SQL, Shell, Python, MongoDB e outras tecnologias integradas.",
      "Desenvolvimento de mais de 30 drivers personalizados para expandir as funcionalidades da plataforma.",
      "Implantação da plataforma como solução de monitoramento para os armazéns e fábricas globais da Dell, incluindo painéis em tempo real e diagramas de diagnóstico.",
      "Colaboração com a equipe de Procurement (Compras) para automatizar processos, atingindo 82% de automação e resolvendo incidentes no ServiceNow por meio da modernização de fluxos de trabalho.",
      "Cooperação com times internacionais (Índia, Malásia, China, EUA) no desenvolvimento e implantações, alinhando requisitos e garantindo a integração global.",
      "Atuação no fuso horário IST.",
    ],
  },
  {
    title: "Desenvolvedora de Software",
    organization: "Philips",
    period: "Mar 2017 - Feb 2019",
    location: "Blumenau, Santa Catarina, Brasil",
    workMode: "Híbrido",
    description: [
      "Liderança da migração global de um microsserviço crítico de MongoDB para PostgreSQL, impactando mais de mil desenvolvedores em equipes da Philips na Holanda, Índia e outras regiões. A refatoração garantiu maior consistência de dados e performance.",
      "Atuação na plataformização do módulo de oncologia (parte do Tasy, usado em mais de 30 países), desacoplando o monolito em microsserviços e atualizando para Java 11. Colaboração com times multinacionais para alinhar requisitos técnicos e de negócios.",
      "Auxílio na modernização do frontend, migrando componentes legados em Delphi para Angular no Tasy, sistema que atende cerca de 5 mil instituições de saúde globalmente.",
    ],
  },
  {
    title: "Desenvolvedora de Software",
    organization: "Senac",
    period: "May 2011 - Mar 2017",
    location: "Jataí, Goiás, Brasil",
    workMode: "Presencial",
    description: [
      "Desenvolvimento do SEI, um sistema interno de gestão de aprendizagem (similar ao Moodle), usado em todas as unidades do SENAC Goiás para centralizar processos educacionais.",
      "Integração com o TOTVS RH, garantindo sincronização automática de dados de alunos e instrutores.",
      "Atendimento a mais de 100 mil alunos em diferentes modalidades (presencial, Pronatec, EAD, cursos técnicos e livres) com salas de aula digitais (aulas em vídeo, materiais interativos e acompanhamento do progresso), atendimento e relatórios automatizados com painéis em tempo real, e ferramentas acadêmicas personalizadas para notas, feedback e fluxos administrativos.",
      "Dimensionamento da plataforma para suportar alto volume, mantendo o desempenho e a confiabilidade.",
      "Tornou-se a principal plataforma educacional do SENAC Goiás, reduzindo a sobrecarga administrativa em 40%.",
    ],
  },
];

export default careerTimeline;
