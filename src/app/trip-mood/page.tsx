import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TripMoodQuiz } from "@/components/home/TripMoodQuiz";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Trip Mood Quiz",
  description:
    "A short quiz to match your Egypt journey mood — temples, Nile nights, desert sky, Red Sea recovery, family pacing, or quiet luxury.",
};

export default function TripMoodPage() {
  return (
    <>
      <PageHero
        eyebrow="Trip mood"
        title={
          <>
            Four questions.
            <span className="mt-1 block italic text-sand">
              One clearer starting feel.
            </span>
          </>
        }
        description="Not a locked package — a mood. We use it to point you toward the right published routes or a custom brief."
        image="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Find your Egypt trip mood"
        height="sm"
        actions={
          <ButtonLink
            href="/customize"
            variant="ghost"
            className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
          >
            Skip to customize
          </ButtonLink>
        }
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <TripMoodQuiz />
          </Reveal>
        </div>
      </div>
    </>
  );
}
