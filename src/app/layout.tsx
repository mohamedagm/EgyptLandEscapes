import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NightAtmosphere } from "@/components/layout/NightAtmosphere";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { StickyTripBrief } from "@/components/premium/StickyTripBrief";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ShortlistDrawer } from "@/components/shortlist/ShortlistDrawer";
import { ShortlistProvider } from "@/components/shortlist/ShortlistProvider";
import { ShortlistBurstLayer } from "@/components/effects/ShortlistBurst";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { heroMedia } from "@/data/media";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('ele-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Private Egypt Tours`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Egypt tours",
    "private Egypt tours",
    "Nile cruise",
    "Giza pyramids tour",
    "Luxor Aswan",
    "tailor-made Egypt",
    "Egypt Land Escapes",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Private Egypt Tours`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: heroMedia.poster,
        width: 2000,
        height: 1333,
        alt: "Pyramids of Giza — Egypt Land Escapes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Private Egypt Tours`,
    description: siteConfig.description,
    images: [heroMedia.poster],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="atmosphere flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <NightAtmosphere />
          <ShortlistProvider>
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <JsonLd />
              <SkipToContent />
              <ScrollProgress />
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <CommandPalette />
              <ShortlistDrawer />
              <ShortlistBurstLayer />
              <StickyTripBrief />
              <StickyWhatsApp />
            </div>
          </ShortlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
