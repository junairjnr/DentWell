import type { Metadata } from "next";
import { Doctors } from "@/components/site/doctors";
import { Shell } from "@/components/site/shell";
import { getContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our doctors",
  description: "Clinicians named in public Google reviews of Dr. Shemina's DENTWELL. Degrees are shown only when the clinic publishes them.",
};

export default async function DoctorsPage() {
  const content = await getContent();
  return (
    <Shell>
      <Doctors doctors={content.doctors} />
    </Shell>
  );
}
