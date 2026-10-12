"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ArrowUpRight, Play, ExternalLink } from "lucide-react";

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
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
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
            Selected Works
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
            FEATURED CRAFT
            <br />
            &amp; CASE STUDIES
          </h2>
        </div>

        {/* Filter Pills with Horizontal Scroll on Phone */}
        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            alignItems: "center",
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: "0.5rem",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  minHeight: "40px",
                  padding: "0 1.1rem",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? "1px solid var(--text-primary)" : "1px solid var(--border-medium)",
                  background: isActive ? "var(--text-primary)" : "var(--bg-card)",
                  color: isActive ? "var(--bg-primary)" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
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
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {filteredProjects.map((project) => {
          return (
            <article
              key={project.id}
              style={{
                borderRadius: "20px",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-card)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bold)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 18px 40px var(--glow-active)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.12)";
              }}
            >
              {/* Image Thumbnail */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(220px, 28vw, 320px)",
                  backgroundColor: "var(--bg-tertiary)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="project-img-zoom"
                />

                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    zIndex: 2,
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(8px)",
                      color: "#ffffff",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                {project.video && (
                  <button
                    onClick={() => setSelectedVideo(project.video || null)}
                    aria-label="Play motion video"
                    title="Play motion concept"
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1rem",
                      zIndex: 2,
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(8px)",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <Play size={16} fill="#ffffff" />
                  </button>
                )}
              </div>

              {/* Project Card Content */}
              <div
                style={{
                  padding: "clamp(1.25rem, 2vw, 1.75rem)",
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
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {project.year}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                      marginBottom: "1rem",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "4px",
                          backgroundColor: "var(--bg-tertiary)",
                          color: "var(--text-secondary)",
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
                      paddingTop: "0.85rem",
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
                        gap: "0.35rem",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        minHeight: "36px",
                      }}
                    >
                      <span>Inspect on Dribbble</span>
                      <ArrowUpRight size={15} />
                    </a>

                    <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      Figma High-Fi
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Video Modal Preview */}
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
            padding: "1.5rem",
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
              style={{ width: "100%", maxHeight: "75vh", display: "block" }}
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
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
