"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO, PHILOSOPHY_CARDS } from "@/data/portfolioData";
import { CheckCircle2, Code2, Layers, Cpu, Sparkles, ExternalLink, GraduationCap, MapPin, Award } from "lucide-react";

export function InfoCardsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="about"
      style={{
        padding: "clamp(3.5rem, 8vw, 8rem) clamp(1rem, 5vw, 4rem)",
        maxWidth: "1600px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: " clamp(2.5rem, 5vw, 4.5rem)",
          borderBottom: "1px solid var(--border-divider)",
          paddingBottom: "2rem",
        }}
      >
        <div>
          <span
            className="font-mono"
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            02 // ABOUT &amp; PHILOSOPHY
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
              textTransform: "uppercase",
            }}
          >
            ENGINEERED AESTHETICS.
            <br />
            ZERO FLUFF.
          </h2>
        </div>

        <p
          style={{
            maxWidth: "460px",
            color: "var(--text-secondary)",
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            lineHeight: 1.6,
          }}
        >
          Bridging human empathy with the precision of a Computer Science degree. Crafting digital products that feel intuitive on screen and run cleanly in production.
        </p>
      </div>

      {/* Main Grid: Designer Portrait Bento + Slow-Motion Animated Info Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}
      >
        {/* Designer Spotlight Profile Bento Card */}
        <div
          className="animate-float-a"
          style={{
            gridColumn: "span 1",
            borderRadius: "24px",
            border: "1px solid var(--border-medium)",
            backgroundColor: "var(--bg-card)",
            padding: "2.2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-bold)";
            e.currentTarget.style.boxShadow = "0 25px 50px var(--glow-active)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-medium)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
          }}
        >
          {/* Portrait Image Header */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                [ PROFILE // DHAKA, BD ]
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.75rem",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-subtle)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  color: "var(--text-secondary)",
                }}
                className="font-mono"
              >
                <Award size={13} />
                CS Graduate
              </span>
            </div>

            {/* Profile Picture with Monochrome Framing */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "320px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                marginBottom: "1.5rem",
                backgroundColor: "var(--bg-tertiary)",
              }}
            >
              <Image
                src="/images/nurhasan-portrait.jpg"
                alt="Nur Hasan - UI/UX Designer"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(10%) contrast(105%)",
                  transition: "transform 0.5s ease, filter 0.5s ease",
                }}
                priority
              />

              {/* Gradient Scrim on Portrait */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#ffffff",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Nur Hasan</h3>
                  <p style={{ fontSize: "0.82rem", opacity: 0.85, margin: 0 }}>UI/UX Product Designer</p>
                </div>

                <a
                  href={PERSONAL_INFO.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                  title="View Dribbble"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              {PERSONAL_INFO.bioShort}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <span className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800 }}>
                24+
              </span>
              <p className="font-mono" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Dribbble Works
              </p>
            </div>
            <div>
              <span className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800 }}>
                100%
              </span>
              <p className="font-mono" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Engineering Ready
              </p>
            </div>
          </div>
        </div>

        {/* 4 Slow-Motion Animating Philosophy Cards */}
        <div
          id="philosophy"
          style={{
            gridColumn: "span 2",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PHILOSOPHY_CARDS.map((card, idx) => {
            const isHovered = hoveredCard === card.id;
            const floatClass = idx % 2 === 0 ? "animate-float-b" : "animate-float-c";

            return (
              <div
                key={card.id}
                className={floatClass}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: "20px",
                  border: isHovered ? "1px solid var(--border-bold)" : "1px solid var(--border-medium)",
                  backgroundColor: isHovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isHovered ? "translateY(-6px) scale(1.01)" : "translateY(0)",
                  boxShadow: isHovered ? "0 20px 40px var(--glow-active)" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top Number & Tag */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--text-muted)",
                      }}
                    >
                      {card.number}
                    </span>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "999px",
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg-tertiary)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {card.highlight}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      marginBottom: "1rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.65,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Subtle Interactive Footnote */}
                <div
                  style={{
                    marginTop: "2rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                  className="font-mono"
                >
                  <CheckCircle2 size={14} color={isHovered ? "var(--text-primary)" : "var(--text-muted)"} />
                  <span>Design Principle Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
