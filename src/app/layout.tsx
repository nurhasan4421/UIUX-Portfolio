import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nur Hasan — UI/UX Product Designer & CS Engineer | Portfolio",
  description: "Monochrome portfolio of Nur Hasan, UI/UX Designer with a BSc in Computer Science based in Dhaka, Bangladesh. Designing intuitive digital products, fintech apps, and design systems.",
  keywords: [
    "Nur Hasan",
    "UI/UX Designer",
    "Product Designer",
    "Dhaka Bangladesh",
    "Figma",
    "Fintech UI",
    "AmiBachelor",
    "White Desk",
    "Design Systems",
    "Monochrome Portfolio",
  ],
  authors: [{ name: "Nur Hasan", url: "https://dribbble.com/nurhasan4421" }],
  openGraph: {
    title: "Nur Hasan — UI/UX Product Designer",
    description: "Let's make your project beautiful. High-contrast monochrome portfolio.",
    url: "https://dribbble.com/nurhasan4421",
    siteName: "Nur Hasan Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
