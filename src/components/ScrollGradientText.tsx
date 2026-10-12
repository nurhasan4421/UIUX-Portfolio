"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollGradientTextProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  subtext?: string;
}

export function ScrollGradientText({
  text = "Design is not merely decoration. It is the tactical bridge between complex engineering logic and effortless human instinct. Every pixel exists with deliberate intent.",
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

      // Start illuminating when top reaches 90% of screen, complete when at 20%
      const start = windowHeight * 0.9;
      const end = windowHeight * 0.25;
      const current = rect.top;

      let p = (start - current) / (start - end);
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`scroll-gradient-container ${className}`}
      style={{
        padding: "clamp(3rem, 7vw, 6rem) clamp(1rem, 5vw, 4rem)",
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "25px",
            height: "1px",
            background: "var(--text-muted)",
          }}
        />
        <span>[ Core Philosophy &amp; Motion ]</span>
      </div>

      {/* Fluid Words Scroll Reveal (Mobile Touch & Desktop Smooth) */}
      <p
        className="font-display"
        style={{
          fontSize: "clamp(1.75rem, 4.2vw, 3.8rem)",
          fontWeight: 800,
          lineHeight: 1.3,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        {words.map((word, index) => {
          const wordThreshold = index / words.length;
          const isIlluminated = progress >= wordThreshold;
          const wordProgress = Math.max(0, Math.min(1, (progress - wordThreshold) * words.length * 1.5));

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                marginRight: "0.32em",
                transition: "color 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
                opacity: isIlluminated ? 0.4 + 0.6 * wordProgress : 0.22,
                transform: isIlluminated ? "translateY(0)" : "translateY(2px)",
                color: isIlluminated ? "var(--text-primary)" : "var(--text-muted)",
                textShadow: isIlluminated && wordProgress > 0.6 ? "0 0 16px var(--glow-active)" : "none",
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
            marginTop: "2rem",
            fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)",
            color: "var(--text-secondary)",
            maxWidth: "680px",
            lineHeight: 1.65,
          }}
        >
          {subtext}
        </p>
      )}

      {/* Bottom Kinetic Gradient Track */}
      <div
        style={{
          marginTop: "2.5rem",
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
            transition: "width 0.05s linear",
          }}
        />
      </div>
    </div>
  );
}
