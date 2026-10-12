import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { StickyNavbar } from "@/components/StickyNavbar";
import { ScrollGradientText } from "@/components/ScrollGradientText";
import { InfoCardsSection } from "@/components/InfoCardsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { NetworkTestingBar } from "@/components/NetworkTestingBar";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Noise Texture for Cinematic Monochrome Look */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 1. Hero Section (260px heading, 120px subheadline, short bio & CTA) */}
      <HeroSection />

      {/* 2. Sticky Navbar placed immediately below Hero, sticks to top on scroll */}
      <StickyNavbar />

      {/* 3. Kinetic Scroll Gradient Motion Statement */}
      <ScrollGradientText
        text="Design is not merely decoration. It is the tactical bridge between complex engineering logic and effortless human instinct. Every pixel exists with deliberate intent."
        subtext="Holding a BSc in Computer Science and Engineering, I collaborate seamlessly with software architects, frontend teams, and startup founders to ship interfaces that look exceptional and run flawlessly."
      />

      {/* 4. Slow-motion Animating Info Cards & Portrait */}
      <InfoCardsSection />

      {/* 5. Selected Works from Real Dribbble Profile */}
      <ProjectsSection />

      {/* 6. Capabilities, Deliverables & 5-Stage Process */}
      <ServicesSection />

      {/* 7. Experience, White Desk Studio & Testimonials */}
      <ExperienceSection />

      {/* 8. Contact Section (Supabase Connected & Mail) */}
      <ContactSection />

      {/* 9. Footer with Dhaka Local Time */}
      <Footer />

      {/* 10. Local Network Testing Helper for Mobile Preview */}
      <NetworkTestingBar />
    </main>
  );
}
