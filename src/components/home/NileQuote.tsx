"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function NileQuote() {
  return (
    <section className="relative min-h-[58vh] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=2000&q=80"
        alt="Quiet Nile landscape"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-shade/55" />
      <div className="section-pad relative flex min-h-[58vh] items-center py-20">
        <div className="container-page max-w-3xl text-center text-paper">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-[0.24em] text-sand uppercase"
          >
            The Egypt Land Escapes idea
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="display mt-5 text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
          >
            “Fewer transfers. More atmosphere. A route that feels written for
            the people traveling.”
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-9 flex justify-center"
          >
            <ButtonLink
              href={buildWhatsAppUrl(generalEnquiryMessage())}
              external
              variant="ghost"
              className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
            >
              Start a private brief
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
