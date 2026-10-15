import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { tours } from "@/data/tours";
import { journalPosts } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/tours",
    "/trip-builder",
    "/trip-mood",
    "/nile-cruises",
    "/tailor-made",
    "/customize",
    "/destinations",
    "/journal",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/tours" ? ("weekly" as const) : ("monthly" as const),
    priority:
      path === ""
        ? 1
        : path === "/tours" || path === "/customize" || path === "/trip-builder"
          ? 0.9
          : 0.7,
  }));

  const tourRoutes = tours.map((tour) => ({
    url: `${siteConfig.url}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const journalRoutes = journalPosts.map((post) => ({
    url: `${siteConfig.url}/journal/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...tourRoutes, ...journalRoutes];
}
