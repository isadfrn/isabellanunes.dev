import type { ProjectEntry } from "@/types";

const projects: ProjectEntry[] = [
  {
    title: "Pokémuu",
    description:
      "Atlas Anatômico Veterinário de Bovinos em formato de cartas estilo Pokémon, desenvolvido para a disciplina de Morfofisiologia do Sistema Neurolocomotor e Tegumento do programa de Medicina Veterinária da Unisociesc Blumenau.",
    tags: ["Veterinária", "Next", "Atlas"],
    repo: "https://github.com/isadfrn/pokemuu",
  },
  {
    title: "YouTube Channel Text Extract",
    description:
      "Baixe todos os vídeos de um canal do YouTube apenas em áudio (sem vídeo) e, em seguida, transcreva-os para texto localmente com o OpenAI Whisper. O texto estará pronto para uso com Claude, NotebookLM ou qualquer outra ferramenta de transcrição de texto.",
    tags: ["Python", "Youtube-dl", "OpenAI Whisper"],
    repo: "https://github.com/isadfrn/youtube-channel-text-extract",
  },
];

export default projects;
