"use client";

import React, { useRef, useState, useEffect } from "react";

interface ScrollScrubHeadlineProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number | string;
  letterSpacing?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ScrollScrubHeadline({
  lines,
  as: Component = "h2",
  fontSize = "clamp(2rem, 5.5vw, 4.5rem)",
  fontWeight = 800,
  lineHeight = 1.05,
  letterSpacing = "-0.035em",
  style = {},
  className = "",
}: ScrollScrubHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Real 1-to-1 scroll scrub:
      // Starts as element enters 88% of screen
      // Finishes smoothly when element center travels through 32% of screen
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.32;

      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    let rafId: number | null = null;
    const updateScroll = () => {
      rafId = null;
      handleScroll();
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Compute total words across all lines
  const totalWords = lines.reduce((acc, line) => acc + line.split(" ").filter(Boolean).length, 0);

  let globalWordIndex = 0;

  return (
    <Component
      ref={containerRef}
      className={`font-display ${className}`}
      style={{
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing,
        textTransform: "uppercase",
        margin: 0,
        ...style,
      }}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(" ").filter(Boolean);

        return (
          <div key={lineIdx} style={{ display: "block" }}>
            {words.map((word, wordIdx) => {
              const currentGlobalIndex = globalWordIndex++;
              const threshold = totalWords > 1 ? currentGlobalIndex / (totalWords - 0.2) : 0;
              const wordProgress = Math.max(
                0,
                Math.min(1, (progress - threshold) * totalWords * 1.5)
              );
              const isIlluminated = wordProgress >= 0.7;

              return (
                <span
                  key={wordIdx}
                  style={{
                    display: "inline-block",
                    marginRight: "0.26em",
                    // Immediate 1-to-1 scrubbing without artificial lag
                    transition: "none",
                    opacity: 0.16 + 0.84 * wordProgress,
                    color: isIlluminated ? "var(--text-primary)" : "var(--text-muted)",
                    transform: isIlluminated ? "translateY(0)" : "translateY(2px)",
                    textShadow:
                      isIlluminated && wordProgress > 0.85
                        ? "0 0 16px var(--glow-active)"
                        : "none",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
    </Component>
  );
}
