import Link from "next/link";
import { getFeaturedJournal } from "@/data/journal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalCard } from "@/components/journal/JournalCard";

export function JournalStrip() {
  const posts = getFeaturedJournal(3);

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Travel journal"
            title="Quiet notes for better Egypt planning"
            description="Practical essays on pacing, Nile direction, seasons, and private touring — written in the same calm voice as our proposals."
          />
          <Link
            href="/journal"
            className="text-sm font-semibold text-nile hover:text-nile-deep"
          >
            All journal entries →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
