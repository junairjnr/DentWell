import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { clinic } from "@/lib/clinic";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const title = "Dr. Shemina's DENTWELL | Dental Clinic in Thalakkadathur, Tirur";
const description =
  "Root canal centre and dental clinic on the first floor of OPS Tower, Thalakkadathur, Tirur. Book a time at Dr. Shemina's DENTWELL.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dentwell.local"),
  title: {
    default: title,
    template: "%s | DENTWELL",
  },
  description,
  keywords: [
    "Dental clinic in Thalakkadathur",
    "Dental clinic in Tirur",
    "Root canal treatment in Tirur",
    "Dental implants in Malappuram",
    "Dr. Shemina Dentwell",
    "Dentist near Thalakkadathur",
  ],
  openGraph: {
    title,
    description,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/clinic/operatory.jpg", width: 1400, height: 788, alt: "Treatment room at DENTWELL" }],
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalClinic"],
  name: clinic.full,
  image: "/clinic/logo-desk.jpg",
  telephone: clinic.phones.map((phone) => phone.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: "First Floor, OPS Tower, Parapputhadam",
    addressLocality: "Thalakkadathur, Tirur",
    addressRegion: "Kerala",
    postalCode: "676103",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinic.coordinates.lat,
    longitude: clinic.coordinates.lng,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: clinic.rating,
    reviewCount: clinic.reviewCount,
    bestRating: 5,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "13:00",
    },
  ],
};

const contract = `THESIS: The visit is read under the operatory lamp: a full-bleed photograph of the real room, with the words set inside an ivory disc, refusing a darkened video hero and a generic blue dental template. OWN-WORLD: Wall white #F4F1EC, pale oak, antique gold of the wall mark, slate #2C3A44 from the uniforms, days and the reading surface as circles. STORY: A person in Thalakkadathur sees the actual clinic, the verified 4.9 from 84 Google reviews, and books a time the server will not give to anyone else. FIRST VIEWPORT: Full-bleed operatory photograph; an ivory gold-ringed disc on the left holds the headline, two actions, and the Google rating; slide controls sit in the open photo. FORM: Operatory light, fifth grounded direction, seed b800063f. The roll ran degraded, with no challengers. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!-- ${contract} -->` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
