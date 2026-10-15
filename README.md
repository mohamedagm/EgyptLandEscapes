# Egypt Land Escapes

Private Egypt tourism website MVP built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- Home with Tour Finder, trust band, journal, and rich planning sections
- Tours catalog with filters: category, destination, duration, price
- Tour detail with gallery + lightbox
- Destinations, Journal, About, Contact
- Sticky WhatsApp button site-wide
- Contact form via **Resend** (optional env) + WhatsApp CTAs

## Real email (contact form)

1. Copy `.env.example` to `.env.local`
2. Create an API key at [resend.com](https://resend.com)
3. Fill:

```bash
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=your@email.com
CONTACT_FROM_EMAIL=Egypt Land Escapes <onboarding@resend.dev>
```

Without the key, enquiries still succeed in demo mode and log to the server console.

## Edit content

| What | Where |
|------|--------|
| Contact / trust / WhatsApp | `src/data/site.ts` |
| Tours | `src/data/tours.ts` |
| Destinations | `src/data/destinations.ts` |
| Journal posts | `src/data/journal.ts` |

## Languages

English only for now.

## Tour detail upgrades

- Visual day-by-day timeline
- Per-tour FAQ accordion
- Related tours
- Gallery + lightbox

## Deploy

Push to GitHub and deploy on [Vercel](https://vercel.com). Add the same env vars in the Vercel project settings.
