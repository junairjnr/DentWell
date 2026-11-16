import type { Metadata } from "next";
import { ContactBand } from "@/components/site/contact-band";
import { Shell } from "@/components/site/shell";
import { getSettings } from "@/lib/db";

export const metadata: Metadata = {
  title: "Contact",
  description: "Address, hours, phone, and WhatsApp for Dr. Shemina's DENTWELL, OPS Tower, Thalakkadathur.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <Shell>
      <ContactBand settings={settings} />
    </Shell>
  );
}
