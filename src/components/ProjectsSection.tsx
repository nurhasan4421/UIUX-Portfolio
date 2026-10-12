"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ArrowUpRight, Play, ExternalLink, Layers, Sparkles } from "lucide-react";

const CATEGORIES = ["All Works", "Mobile Apps", "Web & SaaS", "Fintech", "E-Commerce"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === "All Works") return true;
    if (activeCategory === "Mobile Apps") return project.category.includes("Mobile");
    if (activeCategory === "Web & SaaS") return project.category.includes("Web") || project.category.includes("SaaS");
    if (activeCategory === "Fintech") return project.category.includes("Fintech") || project.tools.includes("Fintech");
    if (activeCategory === "E-Commerce") return project.category.includes("E-Commerce") || project.title.includes("Commerce") || project.title.includes("Juice");
    return true;
  });

  return (
    <section
      id="works"
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
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
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
            01 // SELECTED WORKS
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
            FEATURED CRAFT
            <br />
            &amp; CASE STUDIES
          </h2>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? "1px solid var(--text-primary)" : "1px solid var(--border-medium)",
                  background: isActive ? "var(--text-primary)" : "var(--bg-card)",
                  color: isActive ? "var(--bg-primary)" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "clamp(1.5rem, 3vw, 2.75rem)",
        }}
      >
        {filteredProjects.map((project, idx) => {
          return (
            <article
              key={project.id}
              style={{
                borderRadius: "24px",
                border: "1px solid var(--border-medium)",
                backgroundColor: "var(--bg-card)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bold)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 45px var(--glow-active)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image / Thumbnail Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "360px",
                  backgroundColor: "var(--bg-tertiary)",
                  overflow: "hidden",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="project-img-zoom"
                />

                {/* Badge Top Left */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    left: "1.25rem",
                    zIndex: 2,
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(10px)",
                      color: "#ffffff",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                {/* Video Play Button if video available */}
                {project.video && (
                  <button
                    onClick={() => setSelectedVideo(project.video || null)}
                    aria-label="Play video prototype"
                    title="Play motion animation"
                    style={{
                      position: "absolute",
                      bottom: "1.25rem",
                      right: "1.25rem",
                      zIndex: 2,
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <Play size={18} fill="#ffffff" />
                  </button>
                )}
              </div>

              {/* Project Card Body */}
              <div
                style={{
                  padding: "1.75rem clamp(1.25rem, 2vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {project.year}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Card Footer: Tools & Dribbble Link */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          fontSize: "0.72rem",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "4px",
                          backgroundColor: "var(--bg-tertiary)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    <a
                      href={project.dribbbleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.7";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      <span>Inspect on Dribbble</span>
                      <ArrowUpRight size={16} />
                    </a>

                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Figma High-Fi
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Video Modal Preview for Motion Demos */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "800px",
              backgroundColor: "#000000",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <video
              src={selectedVideo}
              controls
              autoPlay
              style={{ width: "100%", maxHeight: "80vh", display: "block" }}
            />
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "#ffffff",
                padding: "0.4rem 0.8rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                border: "1px solid rgba(255,255,255,0.3)",
                cursor: "pointer",
              }}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        article:hover .project-img-zoom {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
