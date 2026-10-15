import Link from "next/link";
import { travelerTypes } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TravelerTypes() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Plan by traveler"
          title="Tailor the holiday to the people traveling"
          description="Age alone does not define the route — but it helps set walking level, daily pace, room arrangement, transfer length, and how much beach or desert you should weave in."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {travelerTypes.map((type) => (
            <Link
              key={type.title}
              href={type.href}
              className="group rounded-[1.6rem] soft-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-nile/30"
            >
              <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                {type.ages}
              </p>
              <h3 className="display mt-3 text-2xl text-ink transition group-hover:text-nile-deep">
                {type.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {type.text}
              </p>
              <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-nile uppercase">
                Explore routes →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
