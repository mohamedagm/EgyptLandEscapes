import { Categories } from "@/components/home/Categories";
import { CategoryTourRails } from "@/components/home/CategoryTourRails";
import { ComfortLevels } from "@/components/home/ComfortLevels";
import { DestinationsMap } from "@/components/destinations/DestinationsMap";
import { DestinationsStrip } from "@/components/home/DestinationsStrip";
import { EditorialIntro } from "@/components/home/EditorialIntro";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InclusionsPromise } from "@/components/home/InclusionsPromise";
import { JournalStrip } from "@/components/home/JournalStrip";
import { NileQuote } from "@/components/home/NileQuote";
import { SignatureMoments } from "@/components/home/SignatureMoments";
import { TourFinder } from "@/components/home/TourFinder";
import { SeasonDial } from "@/components/effects/SeasonDial";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { TravelerStories } from "@/components/home/TravelerStories";
import { TravelerTypes } from "@/components/home/TravelerTypes";
import { TripDurations } from "@/components/home/TripDurations";
import { TripMoodQuiz } from "@/components/home/TripMoodQuiz";
import { TripBuilderTeaser } from "@/components/home/TripBuilderTeaser";
import { TrustBand } from "@/components/home/TrustBand";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { WhyUs } from "@/components/home/WhyUs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function HomePage() {
  return (
    <>
      <CursorSpotlight />
      <Hero />
      <TrustMarquee />
      <Reveal>
        <TourFinder />
      </Reveal>
      <Reveal>
        <section className="section-pad py-10 md:py-16">
          <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Not sure where to start?"
                title="Read your trip mood in four taps"
                description="Temples, Nile nights, desert sky, beach recovery, family pace, or quiet luxury — then jump to matching routes."
              />
              <div className="mt-6">
                <ButtonLink href="/trip-mood" variant="ghost">
                  Open full-screen quiz
                </ButtonLink>
              </div>
            </div>
            <TripMoodQuiz compact />
          </div>
        </section>
      </Reveal>
      <Reveal>
        <TripBuilderTeaser />
      </Reveal>
      <Reveal>
        <EditorialIntro />
      </Reveal>
      <Reveal>
        <WhyUs />
      </Reveal>
      <Reveal>
        <TrustBand />
      </Reveal>
      <Reveal>
        <SignatureMoments />
      </Reveal>
      <Reveal>
        <FeaturedTours />
      </Reveal>
      <Reveal>
        <CategoryTourRails />
      </Reveal>
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <TravelerTypes />
      </Reveal>
      <Reveal>
        <TripDurations />
      </Reveal>
      <Reveal>
        <ComfortLevels />
      </Reveal>
      <Reveal>
        <DestinationsMap />
      </Reveal>
      <Reveal>
        <DestinationsStrip />
      </Reveal>
      <Reveal>
        <InclusionsPromise />
      </Reveal>
      <Reveal>
        <SeasonDial />
      </Reveal>
      <Reveal>
        <TravelerStories />
      </Reveal>
      <Reveal>
        <JournalStrip />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <HomeFaq />
      </Reveal>
      <Reveal>
        <NileQuote />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
