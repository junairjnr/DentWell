import type { Metadata } from "next";
import { Gallery } from "@/components/site/gallery";
import { Shell } from "@/components/site/shell";
import { getContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of Dr. Shemina's DENTWELL in Thalakkadathur: reception, treatment room, and waiting area.",
};

export default async function GalleryPage() {
  const content = await getContent();
  return (
    <Shell>
      <Gallery items={content.gallery} />
    </Shell>
  );
}
