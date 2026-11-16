import { About } from "@/components/site/about";
import { ContactBand } from "@/components/site/contact-band";
import { Doctors } from "@/components/site/doctors";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Reviews } from "@/components/site/reviews";
import { Treatments } from "@/components/site/treatments";
import { Trust } from "@/components/site/trust";
import { Why } from "@/components/site/why";
import { getContent, getSettings } from "@/lib/db";

export default async function HomePage() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust settings={settings} />
        <About />
        <Treatments treatments={content.treatments} />
        <Doctors doctors={content.doctors} />
        <Reviews reviews={content.reviews} />
        <Gallery items={content.gallery} />
        <Why />
        <ContactBand settings={settings} />
      </main>
      <Footer settings={settings} treatments={content.treatments} />
    </>
  );
}
