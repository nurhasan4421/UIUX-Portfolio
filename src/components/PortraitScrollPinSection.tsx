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
  const textContainerRef = useRef<HTMLDivElement>(null);
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
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (window.innerWidth < 768) {
        // Mobile scroll scrub: Natural viewport-relative Apple scrub without clipping
        // Photo color reveal:
        const photoStart = windowHeight * 0.9;
        const photoEnd = windowHeight * 0.35;
        const photoP = Math.max(0, Math.min(1, (photoStart - rect.top) / (photoStart - photoEnd)));
        setGrayscalePercent(Math.round((1 - photoP) * 100));

        // Bio text Apple word scrub:
        // Starts as text enters the comfortable viewing area (85% of screen)
        // Completes as it scrolls through the upper center (15% of screen)
        if (textContainerRef.current) {
          const textRect = textContainerRef.current.getBoundingClientRect();
          const textStart = windowHeight * 0.85;
          const textEnd = windowHeight * 0.18;
          const textP = Math.max(0, Math.min(1, (textStart - textRect.top) / (textStart - textEnd)));
          setTransitionProgress(textP);
        } else {
          setTransitionProgress(photoP);
        }
      } else {
        // Desktop pinned scroll scrub:
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
          if (rawProgress < 0.10) {
            setGrayscalePercent(100);
            setTransitionProgress(0);
          } else if (rawProgress > 0.82) {
            setGrayscalePercent(0);
            setTransitionProgress(1);
          } else {
            const t = (rawProgress - 0.10) / 0.72;
            const clampedT = Math.max(0, Math.min(1, t));
            setGrayscalePercent(Math.round((1 - clampedT) * 100));
            setTransitionProgress(clampedT);
          }
        }
      }
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
    window.addEventListener("resize", () => {
      checkMobile();
      handleScroll();
    }, { passive: true });

    handleScroll();

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const colorBloomFactor = (100 - grayscalePercent) / 100; // 0 to 1

  // Word scrubbing progress: mapped smoothly across scroll progress
  const wordScrubProgress = Math.max(0, Math.min(1, isMobile ? transitionProgress : (transitionProgress - 0.04) / 0.88));

  // Trigger metrics only after scroll reaches the word 'problems' (around 70% of scrubbing)
  const hitProblems = wordScrubProgress >= 0.70;

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
  const ctaReady = wordScrubProgress > 0.68;
  const ctaOpacity = Math.max(0, Math.min(1, (wordScrubProgress - 0.58) / 0.28));

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: isMobile ? "auto" : "270vh",
        minHeight: isMobile ? "auto" : "270vh",
        width: "100%",
        zIndex: 5,
        padding: isMobile ? "clamp(2rem, 4vh, 3.5rem) 0 clamp(4rem, 8vh, 6rem)" : 0,
      }}
    >
      {/* Pinned Screen Frame on Web / Natural Flow Frame on Mobile */}
      <div
        style={{
          position: isMobile ? "relative" : "sticky",
          top: 0,
          height: isMobile ? "auto" : "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: isMobile ? "visible" : "hidden",
          padding: isMobile
            ? "0 1.25rem"
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
            height: isMobile ? "auto" : "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "space-between",
            gap: isMobile ? "clamp(1.5rem, 3vh, 2.25rem)" : "clamp(2rem, 4vw, 5rem)",
            paddingTop: isMobile ? "0.5rem" : 0,
            boxSizing: "border-box",
          }}
        >
          {/* ============================================================ */}
          {/* WRITINGS (Left on Web, Below Picture on Mobile) */}
          {/* ============================================================ */}
          <div
            ref={textContainerRef}
            style={{
              order: isMobile ? 2 : 1,
              flex: isMobile ? "none" : "1 1 55%",
              maxWidth: isMobile ? "100%" : "640px",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "0px" : "1.75rem",
              zIndex: 10,
            }}
          >
            {/* 1. Category / Intro Tag */}
            <div
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: isMobile ? "0.78rem" : "clamp(0.72rem, 0.9vw, 0.82rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: Math.max(0.3, wordScrubProgress * 1.2),
                color: colorBloomFactor > 0.4 ? "var(--text-primary)" : "var(--text-muted)",
                transition: "color 0.25s ease, opacity 0.2s ease",
                marginBottom: isMobile ? "12px" : "0",
              }}
            >
              <span
                style={{
                  width: isMobile ? "6px" : "6px",
                  height: isMobile ? "6px" : "6px",
                  borderRadius: "50%",
                  backgroundColor: colorBloomFactor > 0.5 ? "#10b981" : "var(--text-muted)",
                  boxShadow: colorBloomFactor > 0.5 ? "0 0 10px #10b981" : "none",
                  transition: "all 0.3s ease",
                }}
              />
              <span>PRODUCT DESIGNER &amp; CS ENGINEER</span>
            </div>

            {/* 2. Apple-Style Typography Scrubbing: 3x MORE BIG on mobile with High Contrast Visibility */}
            <p
              className="font-display"
              style={{
                fontSize: isMobile
                  ? "clamp(1.95rem, 6.8vw, 2.75rem)"
                  : "clamp(1.4rem, 2.25vw, 2.05rem)",
                lineHeight: isMobile ? 1.24 : 1.42,
                letterSpacing: "-0.035em",
                fontWeight: 800,
                margin: 0,
                marginBottom: isMobile ? "18px" : "0",
              }}
            >
              {PITCH_WORDS.map((item, index) => {
                const wordThreshold = index / PITCH_WORDS.length;
                const wordProgress = Math.max(
                  0,
                  Math.min(1, (wordScrubProgress - wordThreshold) * PITCH_WORDS.length * 1.5)
                );
                const isIlluminated = wordProgress > 0.55;

                return (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      marginRight: "0.26em",
                      opacity: 0.32 + 0.68 * wordProgress,
                      color: isIlluminated ? "var(--text-primary)" : "var(--text-muted)",
                      fontWeight: 800,
                      textDecoration: item.isName && isIlluminated ? "underline" : "none",
                      textDecorationColor:
                        item.isName && isIlluminated ? "var(--border-bold)" : "transparent",
                      textUnderlineOffset: "4px",
                      transform: isIlluminated ? "translateY(0)" : "translateY(2px)",
                      textShadow:
                        isIlluminated && item.isKey && wordProgress > 0.75
                          ? "0 0 20px var(--glow-active)"
                          : "none",
                      // Immediate 1-to-1 scrubbing without artificial lag
                      transition: "none",
                    }}
                  >
                    {item.text}
                  </span>
                );
              })}
            </p>

            {/* 3. Mini Metrics: 24+ Dribbble Works & 100% Engineering Ready */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "1.5rem" : "2.5rem",
                marginTop: isMobile ? "0px" : "0.75rem",
                marginBottom: isMobile ? "18px" : "0",
                opacity: hitProblems ? 1 : (isMobile ? 0.3 : 0),
                transform: hitProblems ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: hitProblems ? "auto" : "none",
              }}
            >
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: isMobile ? "1.65rem" : "1.85rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.035em",
                  }}
                >
                  {countWorks}+
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: isMobile ? "0.72rem" : "clamp(0.68rem, 0.8vw, 0.76rem)",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginTop: "0.15rem",
                  }}
                >
                  Dribbble Works
                </div>
              </div>

              <div
                style={{
                  width: "1px",
                  height: isMobile ? "26px" : "28px",
                  backgroundColor: "var(--border-medium)",
                }}
              />

              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: isMobile ? "1.65rem" : "1.85rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.035em",
                  }}
                >
                  {countEng}%
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: isMobile ? "0.72rem" : "clamp(0.68rem, 0.8vw, 0.76rem)",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginTop: "0.15rem",
                  }}
                >
                  Engineering Ready
                </div>
              </div>
            </div>

            {/* 4. [Let's Connect] Call to Action Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: isMobile ? "0px" : "0.5rem",
                opacity: isMobile ? Math.max(0.7, ctaOpacity) : ctaOpacity,
                transform: `scale(${0.92 + (isMobile ? Math.max(0.7, ctaOpacity) : ctaOpacity) * 0.08}) translateY(${(1 - ctaOpacity) * 6}px)`,
                pointerEvents: "auto",
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
                  gap: "0.5rem",
                  minHeight: isMobile ? "44px" : "50px",
                  padding: isMobile ? "0 1.5rem" : "0 2rem",
                  borderRadius: "999px",
                  background: "var(--text-primary)",
                  color: "var(--bg-primary)",
                  fontWeight: 700,
                  fontSize: isMobile ? "0.92rem" : "0.98rem",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  boxShadow:
                    ctaReady
                      ? "0 10px 25px var(--glow-active)"
                      : "0 4px 14px rgba(0,0,0,0.2)",
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
                <ArrowUpRight size={isMobile ? 16 : 17} />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PICTURE (Pins in Middle on Web, at Top on Mobile: 100% Screen to Screen Wide) */}
          {/* ============================================================ */}
          <div
            style={{
              order: isMobile ? 1 : 2,
              flex: isMobile ? "none" : "1 1 45%",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-end",
              width: isMobile ? "calc(100% + 2.5rem)" : "auto",
              marginLeft: isMobile ? "-1.25rem" : "0",
              marginRight: isMobile ? "-1.25rem" : "0",
              maxWidth: isMobile ? "100vw" : "none",
              overflow: isMobile ? "hidden" : "visible",
              transform: isMobile
                ? "none"
                : `translateX(${(1 - transitionProgress) * -22}vw)`,
              transition: "none",
              position: "relative",
              zIndex: 8,
            }}
          >
            {/* Cutout Wrapper: 100% Wide Screen to Screen on Mobile */}
            <div
              style={{
                position: "relative",
                width: isMobile ? "100%" : "clamp(320px, 32vw, 460px)",
                maxWidth: isMobile ? "100vw" : "none",
                height: isMobile ? "auto" : "clamp(460px, 66vh, 640px)",
                aspectRatio: isMobile ? "946 / 1024" : "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Radial Bloom Glow Behind Cutout (Only for mobile phone; completely removed on website view) */}
              {isMobile && (
                <div
                  style={{
                    position: "absolute",
                    inset: "4%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, var(--glow-active) 0%, transparent 70%)",
                    filter: "blur(25px)",
                    opacity: 0.2 + colorBloomFactor * 0.6,
                    transition: "none",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Real Cutout Image Scrubbing B&W -> Full Color. Subtle Bottom Gradient MATCH ONLY FOR MOBILE PHONE, NOT WEB */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  filter: `drop-shadow(0 15px 25px rgba(0, 0, 0, ${
                    0.25 + colorBloomFactor * 0.25
                  }))`,
                  WebkitMaskImage: isMobile
                    ? "linear-gradient(to bottom, black 86%, transparent 100%)"
                    : "none",
                  maskImage: isMobile
                    ? "linear-gradient(to bottom, black 86%, transparent 100%)"
                    : "none",
                  transition: "none",
                }}
              >
                <Image
                  src={getAssetPath("/images/nurhasan-cutout.png")}
                  alt="Nur Hasan — UI/UX Product Designer & CS Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  style={{
                    objectFit: isMobile ? "contain" : "contain",
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

                {/* Bottom subtle gradient overlay MATCHING SITE COLOR ONLY FOR MOBILE PHONE */}
                {isMobile && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "14%",
                      background: "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)",
                      pointerEvents: "none",
                      zIndex: 4,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
