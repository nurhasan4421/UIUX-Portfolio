import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { PortraitScrollPinSection } from "@/components/PortraitScrollPinSection";
import { BottomFloatingNavbar } from "@/components/BottomFloatingNavbar";
import { FloatingThemeToggle } from "@/components/FloatingThemeToggle";
import { ScrollGradientText } from "@/components/ScrollGradientText";
import { InfoCardsSection } from "@/components/InfoCardsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "clamp(5rem, 9vh, 7rem)",
      }}
    >
      {/* Noise Texture for Cinematic Monochrome Look */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Hire Now + Day/Night Icon on Right Side Top */}
      <FloatingThemeToggle />

      {/* 1. Hero Section (Headline, Bio pitch, Let's Connect CTA) */}
      <HeroSection />

      {/* 2. Pinned Portrait Color Scrubbing Showcase (Pins in middle screen, scrubs B&W -> Full Color) */}
      <PortraitScrollPinSection />

      {/* 2. Kinetic Scroll Motion Typography */}
      <ScrollGradientText
        text="Design is not merely decoration. It is the tactical bridge between complex engineering logic and effortless human instinct. Every pixel exists with deliberate intent."
        subtext="Holding a BSc in Computer Science and Engineering, I collaborate seamlessly with software architects, frontend teams, and startup founders to ship interfaces that look exceptional and run flawlessly."
      />

      {/* 3. Slow-motion Animating Info Cards & Philosophy */}
      <InfoCardsSection />

      {/* 4. Selected Works from Real Dribbble Profile */}
      <ProjectsSection />

      {/* 5. Capabilities, Deliverables & 5-Stage Process */}
      <ServicesSection />

      {/* 6. Experience, White Desk Studio & Testimonials */}
      <ExperienceSection />

      {/* 7. Contact Section (Supabase Connected) */}
      <ContactSection />

      {/* 8. Footer with Dhaka Local Time */}
      <Footer />

      {/* 9. Apple Glass Bottom Floating Phone Navbar (Avatar, Works, Hire Now, Live Chat, Hamburger Mini Card) */}
      <BottomFloatingNavbar />
    </main>
  );
}
