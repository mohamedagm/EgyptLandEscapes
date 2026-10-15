import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalPost, journalPosts } from "@/data/journal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JournalCard } from "@/components/journal/JournalCard";
import { TourDetailHero } from "@/components/tours/TourDetailHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { JournalLightboxFigure } from "@/components/journal/JournalLightboxFigure";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const related = journalPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article>
      <TourDetailHero
        image={post.image}
        title={post.title}
        eyebrow={`${post.category} · ${post.readTime} · ${post.date}`}
        description={post.excerpt}
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.75fr]">
          <Reveal>
            <div className="max-w-2xl space-y-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              {post.content.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              <JournalLightboxFigure
                src={post.image}
                title={post.title}
                caption={post.excerpt}
              />
              <div className="relative overflow-hidden rounded-[1.5rem] bg-nile-deep p-6 text-paper">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sand/20 blur-3xl" />
                <p className="display relative text-2xl text-white">
                  Want this turned into a private itinerary?
                </p>
                <p className="relative mt-3 text-sm text-paper/75">
                  Send your month and traveler count — we reply with a written
                  proposal, not a generic package dump.
                </p>
                <div className="relative mt-5 flex flex-wrap gap-3">
                  <ButtonLink
                    href="/customize"
                    variant="secondary"
                    className="btn-on-light"
                  >
                    Customize a route
                  </ButtonLink>
                  <ButtonLink
                    href="/contact"
                    variant="ghost"
                    className="!border-white/25 !text-paper"
                  >
                    Contact form
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[1.5rem] soft-panel p-5">
                <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                  Keep exploring
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <Link href="/tours" className="text-ink hover:text-nile">
                      Browse private tours
                    </Link>
                  </li>
                  <li>
                    <Link href="/destinations" className="text-ink hover:text-nile">
                      Destinations
                    </Link>
                  </li>
                  <li>
                    <Link href="/nile-cruises" className="text-ink hover:text-nile">
                      Nile cruises
                    </Link>
                  </li>
                  <li>
                    <Link href="/journal" className="text-ink hover:text-nile">
                      All journal entries
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="container-page mt-20">
          <Reveal>
            <h2 className="display text-3xl text-ink">More from the journal</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.slug}>
                <JournalCard post={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </article>
  );
}
