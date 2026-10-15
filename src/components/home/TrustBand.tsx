import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function TrustBand() {
  const { trust } = siteConfig;

  const items = [
    { label: "Established", value: trust.established },
    { label: "License", value: trust.license },
    { label: "Industry", value: trust.iata },
    {
      label: "Traveler score",
      value: `${trust.rating} / 5 · ${trust.reviewCount} reviews`,
    },
    { label: "Support", value: trust.support },
  ];

  return (
    <section className="section-pad py-14 md:py-20">
      <div className="container-page soft-panel overflow-hidden rounded-[2rem] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Trust & credentials</p>
            <h2 className="display mt-3 text-3xl text-ink md:text-4xl">
              Local planning with clear credentials
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
              Demo trust signals for MVP — replace with your real tourism
              license, review widgets, and partner badges before launch.
            </p>
          </div>
          <ButtonLink href={siteConfig.social.tripadvisor} external variant="ghost">
            Read demo reviews
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.label}
              className="surface-muted rounded-[1.25rem] px-4 py-5"
            >
              <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-ink">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
