"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollGradientTextProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  subtext?: string;
}

export function ScrollGradientText({
  text = "I build interfaces where pure aesthetics meet engineering discipline. Every micro-interaction is calibrated, every hierarchy purposeful, and every design token battle-tested.",
  subtext,
  className = "",
}: ScrollGradientTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.2);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress between entering viewport and leaving
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;
      const current = rect.top;

      let p = (start - current) / (start - end);
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`scroll-gradient-container ${className}`}
      style={{
        padding: "clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 4rem)",
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-muted)",
          marginBottom: "1.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "30px",
            height: "1px",
            background: "var(--text-muted)",
          }}
        />
        <span>[ Philosophy &amp; Kinetic Motion ]</span>
      </div>

      {/* Fluid Words Scroll Reveal */}
      <p
        className="font-display"
        style={{
          fontSize: "clamp(1.75rem, 4.4vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1.25,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        {words.map((word, index) => {
          const wordThreshold = index / words.length;
          const isIlluminated = progress >= wordThreshold;
          const wordProgress = Math.max(0, Math.min(1, (progress - wordThreshold) * words.length));

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                marginRight: "0.32em",
                transition: "opacity 0.25s ease, transform 0.35s ease, filter 0.35s ease",
                opacity: isIlluminated ? 0.35 + 0.65 * wordProgress : 0.2,
                transform: isIlluminated ? "translateY(0)" : "translateY(3px)",
                filter: isIlluminated ? "none" : "blur(0.5px)",
                color: isIlluminated ? "var(--text-primary)" : "var(--text-muted)",
                background: isIlluminated
                  ? `linear-gradient(135deg, var(--text-primary) 0%, rgba(255,255,255,${0.6 + 0.4 * wordProgress}) 100%)`
                  : "none",
                WebkitBackgroundClip: isIlluminated ? "text" : "none",
                WebkitTextFillColor: isIlluminated ? "transparent" : "inherit",
              }}
            >
              {word}
            </span>
          );
        })}
      </p>

      {subtext && (
        <p
          style={{
            marginTop: "2.5rem",
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            color: "var(--text-secondary)",
            maxWidth: "680px",
            lineHeight: 1.7,
          }}
        >
          {subtext}
        </p>
      )}

      {/* Bottom Kinetic Gradient Track */}
      <div
        style={{
          marginTop: "3rem",
          width: "100%",
          height: "2px",
          background: "var(--border-subtle)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, transparent, var(--text-primary))",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
