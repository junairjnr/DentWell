import { About } from "@/components/site/about";
import { ContactBand } from "@/components/site/contact-band";
import { Doctors } from "@/components/site/doctors";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Reviews } from "@/components/site/reviews";
import { SectionRule } from "@/components/site/section-rule";
import { StackedStories } from "@/components/site/stacked-stories";
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
        <Trust />
        <SectionRule />
        <About />
        <Treatments treatments={content.treatments} />
        <StackedStories />
        <SectionRule />
        <Doctors doctors={content.doctors} />
        <Gallery items={content.gallery} />
        <Reviews reviews={content.reviews} />
        <Why />
        <ContactBand settings={settings} />
      </main>
      <Footer settings={settings} treatments={content.treatments} />
    </>
  );
}
