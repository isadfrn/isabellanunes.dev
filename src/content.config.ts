import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
});

const blogPt = defineCollection({
  loader: glob({ pattern: "**/pt.md", base: "./src/data/blog/posts" }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: "**/en.md", base: "./src/data/blog/posts" }),
  schema: blogSchema,
});

export const collections = { blogPt, blogEn };
