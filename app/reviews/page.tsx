import type { Metadata } from "next";
import { Reviews } from "@/components/site/reviews";
import { Shell } from "@/components/site/shell";
import { getContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Google reviews",
  description: "Google rating and review lines for Dr. Shemina's DENTWELL in Tirur.",
};

export default async function ReviewsPage() {
  const content = await getContent();
  return (
    <Shell>
      <Reviews reviews={content.reviews} />
    </Shell>
  );
}
