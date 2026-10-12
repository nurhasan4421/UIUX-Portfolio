"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/assetPath";

interface WordItem {
  text: string;
  isKey?: boolean;
  isName?: boolean;
}

const PITCH_WORDS: WordItem[] = [
  { text: "Hi,", isKey: false },
  { text: "I'm", isKey: false },
  { text: "Nur", isKey: true, isName: true },
  { text: "Hasan.", isKey: true, isName: true },
  { text: "Bridging", isKey: false },
  { text: "high-craft", isKey: true },
  { text: "aesthetic", isKey: true },
  { text: "intuition", isKey: true },
  { text: "with", isKey: false },
  { text: "engineering", isKey: true },
  { text: "rigor.", isKey: true },
  { text: "Designing", isKey: false },
  { text: "intuitive", isKey: true },
  { text: "digital", isKey: false },
  { text: "products,", isKey: false },
  { text: "SaaS", isKey: true },
  { text: "dashboards,", isKey: false },
  { text: "and", isKey: false },
  { text: "mobile", isKey: true },
  { text: "experiences", isKey: false },
  { text: "that", isKey: false },
  { text: "solve", isKey: false },
  { text: "real-world", isKey: true },
  { text: "problems.", isKey: false },
];

export function PortraitScrollPinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grayscalePercent, setGrayscalePercent] = useState(100);
  const [transitionProgress, setTransitionProgress] = useState(0); // 0 to 1
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;

      if (scrolled <= 0) {
        setGrayscalePercent(100);
        setTransitionProgress(0);
      } else if (scrolled >= scrollableDistance) {
        setGrayscalePercent(0);
        setTransitionProgress(1);
      } else {
        const rawProgress = scrolled / scrollableDistance;

        // Phase 1: 0.0 - 0.10 (initial pause at entry)
        // Phase 2: 0.10 - 0.82 (smooth synchronized move, color scrub & word-by-word Apple scrubbing)
        // Phase 3: 0.82 - 1.0 (settled in full color, then releases naturally)
        if (rawProgress < 0.10) {
          setGrayscalePercent(100);
          setTransitionProgress(0);
        } else if (rawProgress > 0.82) {
          setGrayscalePercent(0);
          setTransitionProgress(1);
        } else {
          const t = (rawProgress - 0.10) / 0.72; // 0 to 1
          const clampedT = Math.max(0, Math.min(1, t));
          const gray = Math.round((1 - clampedT) * 100);
          setGrayscalePercent(gray);
          setTransitionProgress(clampedT);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      checkMobile();
      handleScroll();
    }, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const colorBloomFactor = (100 - grayscalePercent) / 100; // 0 to 1

  // Word scrubbing progress: mapped smoothly across scroll progress
  const wordScrubProgress = Math.max(0, Math.min(1, (transitionProgress - 0.04) / 0.88));

  // Trigger metrics only after scroll reaches the word 'problems' (around 82% of scrubbing)
  const hitProblems = wordScrubProgress >= 0.8;

  const [countWorks, setCountWorks] = useState(0);
  const [countEng, setCountEng] = useState(0);

  useEffect(() => {
    if (!hitProblems) {
      setCountWorks(0);
      setCountEng(0);
      return;
    }

    let start: number | null = null;
    const duration = 1100; // ms
    let animId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(1, elapsed / duration);
      // Smooth exponential deceleration
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);

      setCountWorks(Math.round(ease * 24));
      setCountEng(Math.round(ease * 100));

      if (p < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [hitProblems]);

  // Connect CTA reveal timing: lights up right as the final words illuminate
  const ctaReady = wordScrubProgress > 0.75;
  const ctaOpacity = Math.max(0, Math.min(1, (wordScrubProgress - 0.65) / 0.3));

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: isMobile ? "240vh" : "270vh",
        width: "100%",
        zIndex: 5,
      }}
    >
      {/* Sticky Screen Frame */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: isMobile ? "100dvh" : "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: isMobile
            ? "clamp(0.5rem, 1.5vh, 1rem) 1.25rem clamp(5.2rem, 11vh, 6.8rem)"
            : "2rem clamp(1.5rem, 5vw, 5rem)",
          boxSizing: "border-box",
        }}
      >
        {/* Responsive Content Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            height: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "space-between",
            gap: isMobile ? "clamp(0.35rem, 1.2vh, 0.9rem)" : "clamp(2rem, 4vw, 5rem)",
            paddingTop: isMobile ? "max(0.25rem, env(safe-area-inset-top, 0px))" : 0,
            boxSizing: "border-box",
          }}
        >
          {/* ============================================================ */}
          {/* WRITINGS (Left on Web, Under Picture on Mobile) */}
          {/* ============================================================ */}
          <div
            style={{
              order: isMobile ? 2 : 1,
              flex: isMobile ? "none" : "1 1 55%",
              maxWidth: isMobile ? "100%" : "640px",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "clamp(0.3rem, 1vh, 0.65rem)" : "1.75rem",
              zIndex: 10,
            }}
          >
            {/* Category / Intro Tag */}
            <div
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: isMobile ? "0.68rem" : "clamp(0.72rem, 0.9vw, 0.82rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: Math.max(0.2, wordScrubProgress * 1.2),
                color: colorBloomFactor > 0.4 ? "var(--text-primary)" : "var(--text-muted)",
                transition: "color 0.25s ease, opacity 0.2s ease",
              }}
            >
              <span
                style={{
                  width: isMobile ? "5px" : "6px",
                  height: isMobile ? "5px" : "6px",
                  borderRadius: "50%",
                  backgroundColor: colorBloomFactor > 0.5 ? "#10b981" : "var(--text-muted)",
                  boxShadow: colorBloomFactor > 0.5 ? "0 0 10px #10b981" : "none",
                  transition: "all 0.3s ease",
                }}
              />
              <span>PRODUCT DESIGNER &amp; CS ENGINEER</span>
            </div>

            {/* Apple-Style Typography Scrubbing: Word-by-Word Reveal with High Contrast */}
            <p
              className="font-display"
              style={{
                fontSize: isMobile
                  ? "clamp(0.85rem, 3.5vw, 1.05rem)"
                  : "clamp(1.4rem, 2.25vw, 2.05rem)",
                lineHeight: isMobile ? 1.34 : 1.42,
                letterSpacing: "-0.025em",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {PITCH_WORDS.map((item, index) => {
                const wordThreshold = index / PITCH_WORDS.length;
                const wordProgress = Math.max(
                  0,
                  Math.min(1, (wordScrubProgress - wordThreshold) * PITCH_WORDS.length * 1.6)
                );
                const isIlluminated = wordProgress > 0.65;

                return (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      marginRight: "0.28em",
                      opacity: 0.14 + 0.86 * wordProgress,
                      color: isIlluminated ? "var(--text-primary)" : "var(--text-muted)",
                      fontWeight: item.isName ? 800 : item.isKey && isIlluminated ? 700 : 500,
                      textDecoration: item.isName && isIlluminated ? "underline" : "none",
                      textDecorationColor:
                        item.isName && isIlluminated ? "var(--border-bold)" : "transparent",
                      textUnderlineOffset: "4px",
                      transform: isIlluminated ? "translateY(0)" : "translateY(3px)",
                      textShadow:
                        isIlluminated && item.isKey && wordProgress > 0.8
                          ? "0 0 18px var(--glow-active)"
                          : "none",
                      // Direct 1-to-1 scrubbing with zero delay: stops immediately when scroll stops
                      transition: "none",
                    }}
                  >
                    {item.text}
                  </span>
                );
              })}
            </p>

            {/* Mini Metrics: 24+ Dribbble Works & 100% Engineering Ready (Triggers number animation after hitting 'problems') */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "1.25rem" : "2.5rem",
                marginTop: isMobile ? "0.15rem" : "0.75rem",
                opacity: hitProblems ? 1 : 0,
                transform: hitProblems ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: hitProblems ? "auto" : "none",
              }}
            >
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: isMobile ? "1.25rem" : "1.85rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {countWorks}+
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: isMobile ? "0.64rem" : "clamp(0.68rem, 0.8vw, 0.76rem)",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: "0.15rem",
                  }}
                >
                  Dribbble Works
                </div>
              </div>

              <div
                style={{
                  width: "1px",
                  height: isMobile ? "22px" : "28px",
                  backgroundColor: "var(--border-medium)",
                }}
              />

              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: isMobile ? "1.25rem" : "1.85rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {countEng}%
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: isMobile ? "0.64rem" : "clamp(0.68rem, 0.8vw, 0.76rem)",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: "0.15rem",
                  }}
                >
                  Engineering Ready
                </div>
              </div>
            </div>

            {/* [Let's Connect] Call to Action Button (Reveals sharply when scrubbing finishes) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: isMobile ? "0.2rem" : "0.5rem",
                opacity: ctaOpacity,
                transform: `scale(${0.9 + ctaOpacity * 0.1}) translateY(${(1 - ctaOpacity) * 8}px)`,
                pointerEvents: ctaReady ? "auto" : "none",
                transition: "all 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <a
                href="#contact"
                aria-label="Let's Connect with Nur Hasan"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  minHeight: isMobile ? "38px" : "50px",
                  padding: isMobile ? "0 1.35rem" : "0 2rem",
                  borderRadius: "999px",
                  background: "var(--text-primary)",
                  color: "var(--bg-primary)",
                  fontWeight: 700,
                  fontSize: isMobile ? "0.82rem" : "0.98rem",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  boxShadow:
                    ctaReady
                      ? "0 10px 25px var(--glow-active)"
                      : "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  WebkitTapHighlightColor: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight size={isMobile ? 14 : 17} />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PICTURE (Pins in Middle on Web, then Slides Right; On Mobile Sticks on Top) */}
          {/* ============================================================ */}
          <div
            style={{
              order: isMobile ? 1 : 2,
              flex: isMobile ? "none" : "1 1 45%",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-end",
              width: isMobile ? "100%" : "auto",
              transform: isMobile
                ? "none"
                : `translateX(${(1 - transitionProgress) * -22}vw)`,
              transition: "none",
              position: "relative",
              zIndex: 8,
            }}
          >
            {/* Cutout Wrapper */}
            <div
              style={{
                position: "relative",
                width: isMobile ? "clamp(120px, 32vw, 160px)" : "clamp(320px, 32vw, 460px)",
                height: isMobile ? "clamp(125px, 17vh, 165px)" : "clamp(460px, 66vh, 640px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Radial Bloom Glow Behind Cutout */}
              <div
                style={{
                  position: "absolute",
                  inset: "8%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, var(--glow-active) 0%, transparent 70%)",
                  filter: isMobile ? "blur(20px)" : "blur(50px)",
                  opacity: 0.2 + colorBloomFactor * 0.6,
                  transition: "none",
                  pointerEvents: "none",
                }}
              />

              {/* Real Cutout Image Scrubbing B&W -> Full Color */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  filter: `drop-shadow(0 15px 25px rgba(0, 0, 0, ${
                    0.25 + colorBloomFactor * 0.25
                  }))`,
                  transition: "none",
                }}
              >
                <Image
                  src={getAssetPath("/images/nurhasan-cutout.png")}
                  alt="Nur Hasan — UI/UX Product Designer & CS Engineer"
                  fill
                  sizes="(max-width: 768px) 180px, 500px"
                  priority
                  style={{
                    objectFit: "contain",
                    objectPosition: isMobile ? "center top" : "center bottom",
                    filter: `grayscale(${grayscalePercent}%) contrast(${
                      100 + grayscalePercent * 0.1
                    }%) brightness(${grayscalePercent > 50 ? 0.98 : 1.02})`,
                    WebkitFilter: `grayscale(${grayscalePercent}%) contrast(${
                      100 + grayscalePercent * 0.1
                    }%) brightness(${grayscalePercent > 50 ? 0.98 : 1.02})`,
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    willChange: "filter",
                    transition: "none",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
