"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO, PHILOSOPHY_CARDS } from "@/data/portfolioData";
import { ExternalLink, Award } from "lucide-react";
import { ScrollScrubHeadline } from "@/components/ScrollScrubHeadline";
import { getAssetPath } from "@/utils/assetPath";

export function InfoCardsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="about"
      style={{
        padding: "clamp(3rem, 7vw, 6.5rem) clamp(1rem, 4.5vw, 3.5rem)",
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
          gap: "1.25rem",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
        }}
      >
        <div>
          <span
            className="font-mono"
            style={{
              fontSize: "clamp(0.74rem, 0.9vw, 0.82rem)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            About &amp; Core Philosophy
          </span>
          <ScrollScrubHeadline
            lines={["ENGINEERED AESTHETICS.", "ZERO FLUFF."]}
            fontSize="clamp(1.85rem, 4.5vw, 4rem)"
          />
        </div>

        <p
          style={{
            maxWidth: "460px",
            color: "var(--text-secondary)",
            fontSize: "clamp(0.9rem, 1.05vw, 1.02rem)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Bridging human empathy with the precision of a Computer Science degree. Crafting digital products that feel intuitive on screen and run cleanly in production.
        </p>
      </div>

      {/* Main Grid: Designer Spotlight Bento (Left) + Balanced 2x2 Philosophy Cards (Right) */}
      <div className="about-main-grid">
        {/* Designer Spotlight Profile Bento Card */}
        <div
          className="animate-float-a"
          style={{
            borderRadius: "20px",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-card)",
            padding: "clamp(1.25rem, 2.4vw, 1.85rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-bold)";
            e.currentTarget.style.boxShadow = "0 20px 45px var(--glow-active)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
          }}
        >
          <div>
            {/* Top Tag Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
                marginBottom: "1.1rem",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(0.72rem, 0.85vw, 0.78rem)",
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
                  border: "1px solid var(--border-subtle)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "999px",
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
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
                height: "clamp(200px, 26vw, 265px)",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                marginBottom: "1.2rem",
                backgroundColor: "var(--bg-tertiary)",
              }}
            >
              <Image
                src={getAssetPath("/images/nurhasan-portrait.jpg")}
                alt="Nur Hasan - UI/UX Designer"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  filter: "grayscale(10%) contrast(105%)",
                }}
                priority
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, transparent 65%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "0.9rem",
                  left: "0.9rem",
                  right: "0.9rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#ffffff",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Nur Hasan</h3>
                  <p style={{ fontSize: "0.78rem", opacity: 0.85, margin: 0 }}>UI/UX Product Designer</p>
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
                    WebkitBackdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    transition: "transform 0.2s ease, background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                  }}
                  title="View Dribbble"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <p
              style={{
                fontSize: "clamp(0.88rem, 1vw, 0.94rem)",
                lineHeight: 1.62,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {PERSONAL_INFO.bioShort}
            </p>
          </div>

          <div
            className="profile-stats-grid"
            style={{
              marginTop: "1.4rem",
              paddingTop: "1.1rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <span className="font-display" style={{ fontSize: "clamp(1.5rem, 2vw, 1.75rem)", fontWeight: 800, color: "var(--text-primary)" }}>
                24+
              </span>
              <p className="font-mono" style={{ fontSize: "0.74rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                Dribbble Works
              </p>
            </div>
            <div>
              <span className="font-display" style={{ fontSize: "clamp(1.5rem, 2vw, 1.75rem)", fontWeight: 800, color: "var(--text-primary)" }}>
                100%
              </span>
              <p className="font-mono" style={{ fontSize: "0.74rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                Engineering Ready
              </p>
            </div>
          </div>
        </div>

        {/* 4 Philosophy Cards: Balanced 2x2 Grid (No Orphan Cards) */}
        <div id="philosophy" className="philosophy-grid">
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
                  border: isHovered ? "1px solid var(--border-bold)" : "1px solid var(--border-subtle)",
                  backgroundColor: isHovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                  padding: "clamp(1.25rem, 2.2vw, 1.85rem)",
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
                      gap: "0.5rem",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                        fontWeight: 800,
                        color: "var(--text-muted)",
                      }}
                    >
                      {card.number}
                    </span>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: "clamp(0.68rem, 0.8vw, 0.74rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "0.26rem 0.65rem",
                        borderRadius: "999px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {card.highlight}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.12rem, 1.35vw, 1.3rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.25,
                      marginBottom: "0.65rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "clamp(0.86rem, 0.95vw, 0.92rem)",
                      lineHeight: 1.62,
                      color: "var(--text-secondary)",
                      margin: 0,
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
        .about-main-grid {
          display: grid;
          grid-template-columns: minmax(320px, 380px) 1fr;
          gap: clamp(1.25rem, 2.5vw, 2rem);
          align-items: stretch;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        @media (max-width: 1024px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
          }
          .philosophy-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .philosophy-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .about-main-grid {
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
