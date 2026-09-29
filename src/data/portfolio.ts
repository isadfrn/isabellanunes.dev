import type { Locale } from "@/types";
import aboutData from "./about";
import { getBlogPosts } from "./blog";
import booksData from "./books";
import careerData from "./career";
import coursesData from "./courses";
import educationData from "./education";
import homeData from "./home";
import projectsData from "./projects";
import publicationsData from "./publications";

// Everything the home page shows, in one locale. The page fetches it once and
// hands it to the desktop scene and the mobile feed, which are two views of
// the same content.
export async function getPortfolio(locale: Locale) {
  const posts = await getBlogPosts(locale);
  return {
    home: homeData[locale],
    about: aboutData[locale],
    career: careerData[locale],
    education: educationData[locale],
    courses: coursesData[locale],
    books: booksData[locale],
    projects: projectsData[locale],
    publications: publicationsData[locale],
    recentPosts: posts.slice(0, 3),
    morePosts: posts.slice(3),
  };
}

export type Portfolio = Awaited<ReturnType<typeof getPortfolio>>;
