"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Sparkles, MapPin, Mail, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function HeroSection() {
  return (
    <header
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 5vw, 4rem)",
        borderBottom: "1px solid var(--border-divider)",
        background: "radial-gradient(ellipse 90% 60% at 50% 0%, var(--glow-active), transparent 80%)",
        overflow: "hidden",
      }}
    >
      {/* Top Meta Bar in Hero */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 12px #10b981",
              display: "inline-block",
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-secondary)",
            }}
          >
            Available for Projects • Q4 2026
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
          className="font-mono"
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <MapPin size={14} />
            Dhaka, Bangladesh
          </span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>BSc in Computer Science & Eng.</span>
        </div>
      </div>

      {/* Main Massive Kinetic Typography Hero */}
      <div
        style={{
          margin: "clamp(2rem, 5vw, 4.5rem) 0",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.5rem, 2vw, 1.5rem)",
        }}
      >
        {/* Massive 260px Heading */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.8rem, 12vw, 240px)",
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
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

        {/* 120px Sub-headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginTop: "clamp(0.75rem, 2vw, 1.5rem)",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 6.2vw, 115px)",
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
              fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              border: "1px solid var(--border-medium)",
              padding: "0.45rem 1.1rem",
              borderRadius: "999px",
            }}
          >
            [ NUR HASAN • STUDIO ]
          </div>
        </div>
      </div>

      {/* Bottom Hero Connect Statement & CTAs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          alignItems: "end",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        {/* Short Connect Pitch */}
        <div style={{ maxWidth: "560px" }}>
          <p
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              fontWeight: 400,
            }}
          >
            Hi, I&apos;m <strong>{PERSONAL_INFO.name}</strong>. Bridging high-craft aesthetic intuition with engineering rigor. Designing intuitive digital products, SaaS dashboards, and mobile experiences that solve real-world problems.
          </p>
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              fontSize: "0.9rem",
              color: "var(--text-muted)",
            }}
          >
            <a
              href={PERSONAL_INFO.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border-bold)",
                paddingBottom: "2px",
                transition: "var(--transition-smooth)",
              }}
            >
              View 24+ Dribbble Shots
              <ExternalLink size={13} />
            </a>
            <span>•</span>
            <span className="font-mono">{PERSONAL_INFO.email}</span>
          </div>
        </div>

        {/* Action CTAs & Scroll Pointer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              width: "100%",
            }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                padding: "1rem 2.2rem",
                borderRadius: "999px",
                background: "var(--text-primary)",
                color: "var(--bg-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-0.01em",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 10px 25px var(--glow-active)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Let&apos;s Connect &amp; Talk
              <ArrowUpRight size={18} />
            </a>

            <a
              href="#works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                padding: "1rem 2rem",
                borderRadius: "999px",
                background: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border-medium)",
                fontWeight: 600,
                fontSize: "1rem",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bold)";
                e.currentTarget.style.background = "var(--bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Explore Portfolio
              <ArrowDownRight size={18} />
            </a>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
            }}
            className="font-mono"
          >
            <Sparkles size={14} />
            <span>Scroll down to navigate portfolio below</span>
          </div>
        </div>
      </div>
    </header>
  );
}
