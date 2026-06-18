import type { ProjectEntry } from "@/types";

const projects: ProjectEntry[] = [
  {
    title: "Pokémuu",
    description:
      "Veterinary Anatomical Atlas of Bovines in Pokémon-style card format, developed for the Morphophysiology of the Neurolocomotor System and Integument course at Unisociesc Blumenau's Veterinary Medicine program.",
    tags: ["Veterinary", "Next", "Atlas"],
    repo: "https://github.com/isadfrn/pokemuu",
  },
  {
    title: "YouTube Channel Text Extract",
    description:
      "Download all videos from a YouTube channel as audio only (no video), then transcribe them to text locally with OpenAI Whisper. The text is ready for Claude, NotebookLM, or any text-based tool.",
    tags: ["Python", "Youtube-dl", "OpenAI Whisper"],
    repo: "https://github.com/isadfrn/youtube-channel-text-extract",
  },
];

export default projects;
