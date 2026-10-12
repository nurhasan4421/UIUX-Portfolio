"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO, PHILOSOPHY_CARDS } from "@/data/portfolioData";
import { ExternalLink, Award } from "lucide-react";

export function InfoCardsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="about"
      style={{
        padding: "clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 3.5rem)",
        maxWidth: "1500px",
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
          gap: "1.5rem",
          marginBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div>
          <span
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            About &amp; Core Philosophy
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.85rem, 4.5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
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
            maxWidth: "440px",
            color: "var(--text-secondary)",
            fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)",
            lineHeight: 1.65,
          }}
        >
          Bridging human empathy with the precision of a Computer Science degree. Crafting digital products that feel intuitive on screen and run cleanly in production.
        </p>
      </div>

      {/* Main Grid: Designer Portrait Bento + Slow-Motion Animated Info Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(1.25rem, 2.5vw, 2rem)",
          alignItems: "stretch",
        }}
      >
        {/* Designer Spotlight Profile Bento Card */}
        <div
          className="animate-float-a"
          style={{
            borderRadius: "20px",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-card)",
            padding: "clamp(1.5rem, 3vw, 2.2rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-medium)";
            e.currentTarget.style.boxShadow = "0 20px 45px var(--glow-active)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.boxShadow = "0 14px 34px rgba(0,0,0,0.18)";
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Profile // Dhaka, BD
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.72rem",
                  background: "var(--bg-tertiary)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "999px",
                  color: "var(--text-secondary)",
                }}
                className="font-mono"
              >
                <Award size={12} />
                CS Graduate
              </span>
            </div>

            {/* Profile Picture */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(240px, 30vw, 300px)",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                marginBottom: "1.25rem",
                backgroundColor: "var(--bg-tertiary)",
              }}
            >
              <Image
                src="/images/nurhasan-portrait.jpg"
                alt="Nur Hasan - UI/UX Designer"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(15%) contrast(105%)",
                }}
                priority
              />

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
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>Nur Hasan</h3>
                  <p style={{ fontSize: "0.8rem", opacity: 0.85, margin: 0 }}>UI/UX Product Designer</p>
                </div>

                <a
                  href={PERSONAL_INFO.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "34px",
                    height: "34px",
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
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.92rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              {PERSONAL_INFO.bioShort}
            </p>
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <span className="font-display" style={{ fontSize: "1.6rem", fontWeight: 800 }}>
                24+
              </span>
              <p className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Dribbble Works
              </p>
            </div>
            <div>
              <span className="font-display" style={{ fontSize: "1.6rem", fontWeight: 800 }}>
                100%
              </span>
              <p className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.25rem",
          }}
          className="philosophy-grid"
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
                  borderRadius: "18px",
                  border: isHovered ? "1px solid var(--border-bold)" : "1px solid var(--border-subtle)",
                  backgroundColor: isHovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                  padding: "clamp(1.5rem, 2.5vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered ? "0 18px 36px var(--glow-active)" : "0 8px 24px rgba(0,0,0,0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--text-muted)",
                      }}
                    >
                      {card.number}
                    </span>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "999px",
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
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .philosophy-grid {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
