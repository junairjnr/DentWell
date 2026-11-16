import type { MetadataRoute } from "next";
import { getContent } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const paths = ["", "/about", "/treatments", "/doctors", "/gallery", "/reviews", "/contact", "/book", "/book/manage"];
  const treatments = content.treatments.map((treatment) => `/treatments/${treatment.slug}`);
  return [...paths, ...treatments].map((path) => ({
    url: `https://dentwell.local${path || "/"}`,
    lastModified: new Date(),
  }));
}
