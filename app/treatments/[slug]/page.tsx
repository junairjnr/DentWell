import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DriftFrame, Reveal } from "@/components/site/motion";
import { Shell } from "@/components/site/shell";
import { getContent } from "@/lib/db";

type Params = { slug: string };

export async function generateStaticParams() {
  const content = await getContent();
  return content.treatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const treatment = content.treatments.find((item) => item.slug === slug);
  if (!treatment) return { title: "Treatment" };
  return {
    title: treatment.name,
    description: `${treatment.summary} At Dr. Shemina's DENTWELL, Thalakkadathur, Tirur.`,
  };
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const content = await getContent();
  const treatment = content.treatments.find((item) => item.slug === slug);
  if (!treatment) notFound();
  return (
    <Shell>
      <article className="mx-auto grid max-w-page items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <DriftFrame className="min-h-[20rem] rounded-[2rem]">
          <Image src={treatment.image} alt={treatment.imageAlt} fill className="object-cover" priority sizes="(min-width: 1024px) 40vw, 100vw" />
        </DriftFrame>
        <Reveal delay={0.08}>
          <h1 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">{treatment.name}</h1>
          <p className="mt-5 text-[16px] leading-relaxed text-[#3f3832]">{treatment.detail}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/book?treatment=${encodeURIComponent(treatment.name)}`} className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink">
              Book treatment
            </Link>
            <Link href="/treatments" className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-sm">
              All treatments
            </Link>
          </div>
        </Reveal>
      </article>
    </Shell>
  );
}
