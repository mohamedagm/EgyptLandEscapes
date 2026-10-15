"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { signatureMoments } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SignatureMoments() {
  const [lead, ...rest] = signatureMoments;

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Signature moments"
          title="Not a checklist. A paced Egypt."
          description="Three atmospheres we return to again and again — plateau light, river quiet, and desert night."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Link
              href={lead.href}
              className="group relative block min-h-[420px] overflow-hidden rounded-[2rem] md:min-h-[520px]"
            >
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shade/80 via-shade/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <p className="text-[11px] tracking-[0.2em] text-sand uppercase">
                  Moment 01
                </p>
                <h3 className="display mt-2 text-3xl text-white md:text-5xl">
                  {lead.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/80 md:text-base">
                  {lead.text}
                </p>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-5 lg:col-span-5">
            {rest.map((moment, index) => (
              <motion.div
                key={moment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={moment.href}
                  className="group relative block min-h-[240px] overflow-hidden rounded-[1.75rem]"
                >
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-shade/80 via-shade/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] tracking-[0.2em] text-sand uppercase">
                      Moment 0{index + 2}
                    </p>
                    <h3 className="display mt-2 text-2xl text-white md:text-3xl">
                      {moment.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper/80">
                      {moment.text}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
