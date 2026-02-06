import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prozilligaming.com";

  // Static pages
  const staticPages = [
    "",
    "/watch",
    "/schedule",
    "/shop",
    "/support",
    "/zo-syndicate",
    "/news",
    "/contact",
    "/terms",
    "/privacy",
  ];

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/schedule" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/watch" ? 0.9 : 0.8,
  }));
}
