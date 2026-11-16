import type { Metadata } from "next";
import { Treatments } from "@/components/site/treatments";
import { Shell } from "@/components/site/shell";
import { getContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Root canal treatment, implants, aligners, whitening, and other care at DENTWELL in Tirur.",
};

export default async function TreatmentsPage() {
  const content = await getContent();
  return (
    <Shell>
      <Treatments treatments={content.treatments} />
    </Shell>
  );
}
