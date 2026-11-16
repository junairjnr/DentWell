import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/lib/types";
import { DriftFrame, Reveal } from "./motion";

export function Treatments({ treatments }: { treatments: Treatment[] }) {
  const [lead, ...rest] = treatments;
  if (!lead) return null;
  return (
    <section className="bg-wall" id="treatments">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">Root canal, and the care around it.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#3f3832]">
            Thirteen treatments are listed. Each one starts with an examination. Learn more, or book
            that treatment and the clinic will confirm the time.
          </p>
        </Reveal>

        <Reveal
          as="article"
          y={32}
          className="photo-frame mt-10 grid overflow-hidden rounded-[1.5rem] bg-slate text-wall sm:mt-12 sm:rounded-[2rem] lg:grid-cols-2"
        >
          <DriftFrame className="aspect-[4/3] sm:aspect-auto sm:min-h-[20rem] lg:min-h-[22rem]">
            <Image
              src={lead.image}
              alt={lead.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </DriftFrame>
          <div className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10">
            <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-[2rem]">{lead.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-wall/85 sm:mt-4">
              {lead.summary}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href={`/treatments/${lead.slug}`}
                className="btn-press inline-flex h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
              >
                Learn more
              </Link>
              <Link
                href={`/book?treatment=${encodeURIComponent(lead.name)}`}
                className="btn-press inline-flex h-11 items-center justify-center rounded-full border border-wall/30 px-5 text-sm hover:bg-wall/10"
              >
                Book treatment
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-3">
          {rest.map((treatment, index) => (
            <Reveal
              key={treatment.slug}
              as="article"
              lift
              delay={(index % 3) * 0.06}
              className="group overflow-hidden rounded-[1.15rem] bg-paper shadow-lift sm:rounded-[1.5rem]"
            >
              <div className="relative h-28 overflow-hidden sm:h-44">
                <Image
                  src={treatment.image}
                  alt={treatment.imageAlt}
                  fill
                  className="object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="p-3 sm:p-6">
                <h3 className="text-sm font-medium leading-snug tracking-[-0.02em] sm:text-lg">
                  {treatment.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#3f3832] sm:mt-2 sm:line-clamp-none">
                  {treatment.summary}
                </p>
                <div className="mt-3 flex flex-col gap-1.5 text-sm sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link href={`/treatments/${treatment.slug}`} className="font-medium text-gold-deep">
                    Learn more
                  </Link>
                  <Link
                    href={`/book?treatment=${encodeURIComponent(treatment.name)}`}
                    className="font-medium text-ink"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
