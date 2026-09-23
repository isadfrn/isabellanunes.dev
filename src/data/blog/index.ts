import { getCollection } from "astro:content";
import type { BlogPost, Locale } from "@/types";

const COLLECTION_BY_LOCALE = { pt: "blogPt", en: "blogEn" } as const;

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const entries = await getCollection(COLLECTION_BY_LOCALE[locale]);

  return entries
    .map((entry) => ({
      slug: entry.data.slug,
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      content: entry.body ?? "",
    }))
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}
