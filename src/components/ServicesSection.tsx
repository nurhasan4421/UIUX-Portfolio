"use client";

import React, { useState } from "react";
import { SERVICES } from "@/data/portfolioData";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & User Architecture",
    description: "Deep dive into product goals, user behavioral patterns, competitor audits, and user flow mapping. Clarifying core constraints before any Figma work begins.",
  },
  {
    step: "02",
    title: "Wireframing & Structural Proof",
    description: "Rapid low-fidelity exploration testing cognitive load, layout ergonomics, and visual hierarchy. Ensuring navigation feels frictionless on mobile and desktop.",
  },
  {
    step: "03",
    title: "Design System & High-Fi Craft",
    description: "Full tokenization in Figma: auto-layout components, color tokens, typographical scales, and accessibility-compliant contrast ratios.",
  },
  {
    step: "04",
    title: "Kinetic Motion & Prototyping",
    description: "Calibrating spring curves, micro-interactions, scroll triggers, and transition states so the product feels alive, tactile, and natural to touch.",
  },
  {
    step: "05",
    title: "Zero-Friction Dev Handoff",
    description: "As a Computer Science graduate, I provide clean component specs, state variants (hover, active, error, loading), and exact CSS tokens that developers ship effortlessly.",
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<string>("01");

  return (
    <section
      id="services"
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
            04 // CAPABILITIES &amp; PROCESS
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
            HOW I ELEVATE
            <br />
            DIGITAL PRODUCTS
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
          From high-velocity MVP prototyping to enterprise-scale design systems. Built with extreme attention to detail and modern engineering feasibility.
        </p>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginBottom: "5rem",
        }}
      >
        {SERVICES.map((service) => {
          const isSelected = activeService === service.number;

          return (
            <div
              key={service.number}
              onClick={() => setActiveService(service.number)}
              style={{
                borderRadius: "20px",
                border: isSelected ? "1px solid var(--border-bold)" : "1px solid var(--border-medium)",
                backgroundColor: isSelected ? "var(--bg-card-hover)" : "var(--bg-card)",
                padding: "2.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isSelected ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isSelected ? "0 15px 35px var(--glow-active)" : "none",
              }}
            >
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
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    {service.number}
                  </span>

                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: isSelected ? "var(--text-primary)" : "var(--border-bold)",
                    }}
                  />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    marginBottom: "1rem",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                    marginBottom: "1.75rem",
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "1.25rem",
                }}
              >
                <p
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Key Deliverables
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Check size={13} color="var(--text-primary)" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5-Step Linear Process Ribbon */}
      <div
        style={{
          borderRadius: "24px",
          border: "1px solid var(--border-medium)",
          backgroundColor: "var(--bg-secondary)",
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
            [ THE METHODOLOGY ]
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
            A 5-STAGE SPRINT TO SHIP WITH CONFIDENCE
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} style={{ position: "relative" }}>
              <span
                className="font-mono"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "var(--border-bold)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                {step.step}
              </span>
              <h4
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
