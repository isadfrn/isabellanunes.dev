import matter from "gray-matter";
import type { BlogPost, Locale } from "@/types";

const ptModules = import.meta.glob("./posts/**/pt.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const enModules = import.meta.glob("./posts/**/en.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

interface Frontmatter {
  slug?: string;
  title?: string;
  description?: string;
  pubDate?: string | Date;
  image?: string;
}

function parseBlogMarkdown(path: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;

  if (!frontmatter.slug) throw new Error(`Missing slug in ${path}`);
  if (!frontmatter.title) throw new Error(`Missing title in ${path}`);
  if (!frontmatter.description) throw new Error(`Missing description in ${path}`);
  if (!frontmatter.pubDate) throw new Error(`Missing pubDate in ${path}`);

  const pubDate = new Date(frontmatter.pubDate);
  if (Number.isNaN(pubDate.getTime())) throw new Error(`Invalid pubDate in ${path}`);

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    pubDate,
    image: frontmatter.image,
    content,
  };
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}

function modulesToPosts(modules: Record<string, string>): BlogPost[] {
  return sortByDateDesc(
    Object.entries(modules).map(([path, raw]) => parseBlogMarkdown(path, raw)),
  );
}

const blogData: Record<Locale, BlogPost[]> = {
  pt: modulesToPosts(ptModules),
  en: modulesToPosts(enModules),
};

export default blogData;
