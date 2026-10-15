import type { Tour } from "@/data/tours";
import { siteConfig } from "@/data/site";

export function TourJsonLd({ tour }: { tour: Tour }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    url: `${siteConfig.url}/tours/${tour.slug}`,
    image: tour.image,
    touristType: "Private travelers",
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers:
      tour.priceFrom > 0
        ? {
            "@type": "Offer",
            priceCurrency: "USD",
            price: tour.priceFrom,
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}/tours/${tour.slug}`,
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
