"use client";

import React from "react";
import Image from "next/image";
import { EXPERIENCE, TESTIMONIALS } from "@/data/portfolioData";
import { Quote, Briefcase, MapPin, Building2, Sparkles } from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
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
          marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
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
            05 // TRACK RECORD &amp; EXPERIENCE
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
            EXPERIENCE &amp;
            <br />
            AGENCY CRAFT
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
          Building high-impact software alongside international startup founders and engineering teams.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "3rem",
          marginBottom: "5rem",
        }}
      >
        {/* Left: Experience Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <h3
            className="font-display"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            CAREER TIMELINE
          </h3>

          {EXPERIENCE.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: "16px",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-card)",
                padding: "1.75rem",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bold)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span className="font-mono" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {item.period}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                  }}
                  className="font-mono"
                >
                  <MapPin size={12} />
                  {item.location}
                </span>
              </div>

              <h4
                className="font-display"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                }}
              >
                {item.role}
              </h4>

              <p
                className="font-mono"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.85rem",
                  fontWeight: 600,
                }}
              >
                @ {item.company}
              </p>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right: White Desk Agency Spotlight with user uploaded logo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <h3
            className="font-display"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            AGENCY LAB
          </h3>

          <div
            style={{
              borderRadius: "24px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-secondary)",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
              }}
            >
              [ STUDIO COLLABORATION ]
            </span>

            {/* White Desk Logo Display */}
            <div
              style={{
                margin: "2rem 0",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.5rem",
                borderRadius: "16px",
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "180px",
                  height: "40px",
                }}
              >
                {/* Dark mode version */}
                <Image
                  src="/images/whitedesk-white.png"
                  alt="White Desk Logo"
                  fill
                  sizes="180px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                  }}
                  className="whitedesk-logo-dark"
                />
                {/* Light mode version */}
                <Image
                  src="/images/whitedesk-black.png"
                  alt="White Desk Logo"
                  fill
                  sizes="180px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                  }}
                  className="whitedesk-logo-light"
                />
              </div>

              <div style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "1rem" }}>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Design Partner
                </span>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>Digital Craft Studio</p>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              At <strong>White Desk</strong>, we bridge the gap between bespoke visual identity and production-ready interface systems. We take complex, data-heavy products and give them an irresistible, minimal polish.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
              }}
            >
              {["Brand Identity", "Design Tokens", "Design System Audits", "Micro-SaaS"].map((t) => (
                <span
                  key={t}
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "999px",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Bento Ribbon */}
      <div
        style={{
          borderRadius: "24px",
          border: "1px solid var(--border-medium)",
          backgroundColor: "var(--bg-card)",
          padding: "clamp(2rem, 4vw, 3.5rem)",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
            }}
          >
            [ ENDORSEMENTS ]
          </span>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginTop: "0.5rem",
            }}
          >
            WHAT COLLABORATORS SAY
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.75rem",
                borderRadius: "16px",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <Quote size={24} color="var(--border-bold)" style={{ marginBottom: "1rem" }} />
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <h5 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0 }}>{t.author}</h5>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>{t.role}</p>
                </div>
                <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {t.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* Automatic theme switching for White Desk logo */
        [data-theme="dark"] .whitedesk-logo-light {
          display: none !important;
        }
        [data-theme="dark"] .whitedesk-logo-dark {
          display: block !important;
        }
        [data-theme="light"] .whitedesk-logo-dark {
          display: none !important;
        }
        [data-theme="light"] .whitedesk-logo-light {
          display: block !important;
        }
      `}</style>
    </section>
  );
}
