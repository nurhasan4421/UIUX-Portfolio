import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nurhasan.dev"),
  title: {
    default: "Nur Hasan — Senior UI/UX & Product Designer | Fintech, Mobile Apps & SaaS",
    template: "%s | Nur Hasan — UI/UX Product Designer",
  },
  description:
    "Portfolio of Nur Hasan, Senior UI/UX & Product Designer with a BSc in Computer Science. Crafting high-converting mobile apps (iOS & Android), fintech interfaces, B2B SaaS dashboards & design systems for startups and enterprises across the USA, Europe, Middle East, and worldwide.",
  keywords: [
    // Core Roles
    "Nur Hasan",
    "UI/UX Designer",
    "Product Designer",
    "Senior Product Designer",
    "Lead UI/UX Designer",
    "App Designer",
    "Mobile App Designer",
    "iOS App Designer",
    "Android App Designer",
    "Web Designer",
    "Web App Designer",
    "SaaS Designer",
    "B2B SaaS Designer",
    "SaaS Dashboard Designer",
    // Industry Specializations
    "Fintech App Designer",
    "Fintech UI Designer",
    "Fintech UX",
    "Digital Banking UI",
    "Crypto Wallet UX",
    "Neobank App Design",
    "Payment Gateway UI",
    "Design Systems Architect",
    "Figma Design Systems",
    "Token Architecture",
    // Global & Regional Intent (USA, Europe, Middle East, Africa, Turkey)
    "Product Designer USA",
    "UI UX Designer Europe",
    "Product Designer UK",
    "UI UX Designer Germany",
    "UI Designer France",
    "UI UX Designer Dubai",
    "Product Designer UAE",
    "Product Designer Middle East",
    "UI UX Designer Saudi Arabia",
    "UI UX Designer Turkey",
    "UI UX Designer Africa",
    "Worldwide Remote UI UX Designer",
    // Commercial Hiring Intent
    "Hire UI UX Designer",
    "Hire Senior Product Designer",
    "Hire Fintech App Designer",
    "Freelance Product Designer",
    "Contract UI UX Designer",
    "White Desk",
    "AmiBachelor",
    "Cellfin Redesign",
  ],
  authors: [{ name: "Nur Hasan", url: "https://nurhasan.dev" }],
  creator: "Nur Hasan",
  publisher: "Nur Hasan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://nurhasan.dev",
  },
  openGraph: {
    title: "Nur Hasan — Senior UI/UX Product Designer | Mobile, Fintech & SaaS",
    description:
      "Crafting high-converting digital products, fintech platforms, B2B SaaS applications & scalable design systems for startups & global brands across USA, Europe, Middle East, and worldwide.",
    url: "https://nurhasan.dev",
    siteName: "Nur Hasan — UI/UX Product Designer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/nurhasan-portrait.jpg",
        width: 946,
        height: 1024,
        alt: "Nur Hasan — Senior UI/UX Product Designer & CS Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nur Hasan — Senior UI/UX Product Designer | Fintech & SaaS",
    description:
      "Crafting intuitive digital products, fintech apps, and scalable design systems for startups and enterprises worldwide.",
    images: ["/images/nurhasan-portrait.jpg"],
    creator: "@nurhasan4421",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "design",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Geo / International Targeting Tags */}
        <meta name="geo.region" content="US, GB, DE, FR, AE, SA, TR, BD" />
        <meta name="geo.placename" content="Global / Remote (USA, Europe, Middle East, Worldwide)" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* JSON-LD Rich Structured Data for Google Knowledge Graph & AI Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://nurhasan.dev/#person",
                  "name": "Nur Hasan",
                  "alternateName": "Nur Hasan Foysal",
                  "jobTitle": "Senior UI/UX & Product Designer",
                  "description": "Senior UI/UX & Product Designer with a BSc in Computer Science, specialized in Mobile Apps, Fintech UI, B2B SaaS Platforms, and Design Systems.",
                  "url": "https://nurhasan.dev",
                  "image": "https://nurhasan.dev/images/nurhasan-portrait.jpg",
                  "sameAs": [
                    "https://dribbble.com/nurhasan4421",
                    "https://github.com/nurhasan4421",
                    "https://linkedin.com"
                  ],
                  "knowsAbout": [
                    "UI/UX Design",
                    "Product Design",
                    "Mobile App Design (iOS & Android)",
                    "Fintech UI/UX",
                    "Digital Banking UI",
                    "B2B SaaS Dashboard Design",
                    "Design Systems",
                    "Figma Tokens & Auto-Layout",
                    "User Experience Research",
                    "Computer Science & Engineering"
                  ],
                  "worksFor": {
                    "@type": "Organization",
                    "name": "White Desk",
                    "url": "https://nurhasan.dev"
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://nurhasan.dev/#service",
                  "name": "Nur Hasan — UI/UX Product Design & Design Systems",
                  "url": "https://nurhasan.dev",
                  "logo": "https://nurhasan.dev/images/whitedesk-white.png",
                  "image": "https://nurhasan.dev/images/nurhasan-portrait.jpg",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dhaka",
                    "addressCountry": "BD"
                  },
                  "areaServed": [
                    { "@type": "Place", "name": "Worldwide" },
                    { "@type": "Country", "name": "United States" },
                    { "@type": "Country", "name": "United Kingdom" },
                    { "@type": "Country", "name": "Germany" },
                    { "@type": "Country", "name": "France" },
                    { "@type": "Country", "name": "European Union" },
                    { "@type": "Country", "name": "United Arab Emirates" },
                    { "@type": "Country", "name": "Saudi Arabia" },
                    { "@type": "Country", "name": "Turkey" },
                    { "@type": "Place", "name": "Middle East" },
                    { "@type": "Place", "name": "Africa" },
                    { "@type": "Country", "name": "Canada" },
                    { "@type": "Country", "name": "Australia" }
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Product Design & UI/UX Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Mobile App UI/UX Design (iOS & Android)",
                          "description": "End-to-end native iOS and Android mobile app interfaces, micro-interactions, and developer-ready Figma specifications."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Fintech & Digital Banking App Design",
                          "description": "High-trust UI/UX for neobanks, cryptocurrency platforms, payment gateways, and personal finance management apps."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "B2B SaaS & Web Application Design",
                          "description": "Data-dense analytics dashboards, complex workflow software, and enterprise B2B web applications."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Design Systems & Token Architecture",
                          "description": "Comprehensive design token libraries in Figma built for zero-friction handoff to React, Next.js, and Flutter engineering teams."
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://nurhasan.dev/#website",
                  "url": "https://nurhasan.dev",
                  "name": "Nur Hasan — Senior UI/UX Product Designer Portfolio",
                  "description": "Official portfolio of Nur Hasan, Senior UI/UX Product Designer & CS Engineer.",
                  "publisher": {
                    "@id": "https://nurhasan.dev/#person"
                  }
                }
              ]
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('nurhasan_theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                  if (t === 'light') {
                    document.documentElement.classList.add('light');
                  }
                  document.documentElement.style.colorScheme = t;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
