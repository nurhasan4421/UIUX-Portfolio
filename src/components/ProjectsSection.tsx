"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ArrowUpRight, Play, ExternalLink } from "lucide-react";
import { ScrollScrubHeadline } from "@/components/ScrollScrubHeadline";

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
          <ScrollScrubHeadline
            lines={["FEATURED CRAFT", "& CASE STUDIES"]}
            fontSize="clamp(1.85rem, 4.5vw, 4rem)"
          />
        </div>

        {/* Category Navbar Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            borderBottom: "1px solid var(--border-subtle)",
            gap: "clamp(0.75rem, 1.8vw, 1.75rem)",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "All Works"
                ? PROJECTS.length
                : cat === "Mobile Apps"
                ? PROJECTS.filter((p) => p.category.includes("Mobile")).length
                : cat === "Web & SaaS"
                ? PROJECTS.filter((p) => p.category.includes("Web") || p.category.includes("SaaS")).length
                : cat === "Fintech"
                ? PROJECTS.filter((p) => p.category.includes("Fintech") || p.tools.includes("Fintech")).length
                : PROJECTS.filter((p) => p.category.includes("E-Commerce") || p.title.includes("Commerce") || p.title.includes("Juice")).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive ? "2px solid var(--text-primary)" : "2px solid transparent",
                  borderRadius: 0,
                  padding: "0.6rem 0.2rem 0.65rem 0.2rem",
                  fontSize: "clamp(0.82rem, 0.95vw, 0.9rem)",
                  fontWeight: isActive ? 750 : 500,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  marginBottom: "-1px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <span>{cat}</span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    opacity: isActive ? 0.9 : 0.6,
                    fontWeight: 600,
                  }}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with 8/12/16px Gap & Fresh Minimal Card Design */}
      <div className="projects-fresh-grid">
        {filteredProjects.map((project) => {
          return (
            <a
              key={project.id}
              href={project.dribbbleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-fresh-card"
            >
              {/* Image Thumbnail with zero radius */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(210px, 24vw, 290px)",
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
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="project-img-zoom"
                />

                <div
                  style={{
                    position: "absolute",
                    top: "0.85rem",
                    left: "0.85rem",
                    zIndex: 2,
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      color: "#ffffff",
                      padding: "0.25rem 0.6rem",
                      borderRadius: 0,
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                {project.video && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVideo(project.video || null);
                    }}
                    aria-label="Play motion video"
                    title="Play motion concept"
                    style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      right: "0.85rem",
                      zIndex: 2,
                      width: "38px",
                      height: "38px",
                      borderRadius: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(8px)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.08)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                    }}
                  >
                    <Play size={14} fill="#ffffff" />
                  </button>
                )}
              </div>

              {/* Fresh Card Content */}
              <div
                style={{
                  padding: "clamp(1.25rem, 2vw, 1.75rem)",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.74rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  {project.category}
                </span>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.35rem",
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
                  }}
                >
                  {project.description}
                </p>
              </div>
            </a>
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
