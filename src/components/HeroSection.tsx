"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function HeroSection() {
  return (
    <header
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
        background: "radial-gradient(ellipse 90% 50% at 50% 0%, var(--glow-active), transparent 75%)",
        overflow: "hidden",
      }}
    >
      {/* Top Meta Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 10px #10b981",
              display: "inline-block",
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-secondary)",
            }}
          >
            Available for Projects
          </span>
        </div>

        {/* Location & Degree (Hidden on mobile via CSS class) */}
        <div
          className="font-mono hero-top-meta-desktop"
          style={{
            alignItems: "center",
            gap: "1.25rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <MapPin size={13} />
            Dhaka, Bangladesh
          </span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span>BSc in Computer Science</span>
        </div>
      </div>

      {/* Main Typography Header (Bigger on Mobile as Requested) */}
      <div
        style={{
          margin: "clamp(1rem, 3vw, 2.5rem) 0",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.4rem, 1vw, 0.75rem)",
        }}
      >
        {/* Scaled & Mobile-Enhanced Headline */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.75rem, 11vw, 192px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          LET&apos;S MAKE
          <br />
          <span
            style={{
              background: "linear-gradient(180deg, var(--text-primary) 0%, var(--text-muted) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            YOUR PROJECT
          </span>
          <br />
          BEAUTIFUL.
        </h1>

        {/* Sub-headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "0.85rem",
            marginTop: "clamp(0.4rem, 1.2vw, 1rem)",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 5.5vw, 94px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              opacity: 0.92,
              margin: 0,
            }}
          >
            I&apos;M UI/UX DESIGNER
          </h2>

          <div
            className="font-mono"
            style={{
              fontSize: "clamp(0.75rem, 0.95vw, 0.9rem)",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              border: "1px solid var(--border-medium)",
              padding: "0.3rem 0.85rem",
              borderRadius: "999px",
            }}
          >
            [ NUR HASAN • STUDIO ]
          </div>
        </div>
      </div>

      {/* Pitch & Primary Call to Action */}
      <div
        style={{
          maxWidth: "720px",
          paddingTop: "1.25rem",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            fontWeight: 400,
            marginBottom: "1.75rem",
          }}
        >
          Hi, I&apos;m <strong>{PERSONAL_INFO.name}</strong>. Bridging high-craft aesthetic intuition with engineering rigor. Designing intuitive digital products, SaaS dashboards, and mobile experiences that solve real-world problems.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.85rem",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              minHeight: "48px",
              padding: "0 1.85rem",
              borderRadius: "999px",
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "-0.01em",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 8px 20px var(--glow-active)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            Let&apos;s Connect
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .hero-top-meta-desktop {
          display: flex;
        }
        @media (max-width: 640px) {
          .hero-top-meta-desktop {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
