"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function PortraitScrollPinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grayscalePercent, setGrayscalePercent] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance <= 0) return;

      // Scrolled distance within this pinned container
      const scrolled = -rect.top;

      if (scrolled <= 0) {
        // Not reached pin yet / at top
        setGrayscalePercent(100);
      } else if (scrolled >= scrollableDistance) {
        // Scrolled past the pin
        setGrayscalePercent(0);
      } else {
        // While pinned in the middle of screen:
        // Progress from 0 to 1
        const rawProgress = scrolled / scrollableDistance;

        // Phase 1: 0.0 - 0.15 (enters center as pure 100% B&W)
        // Phase 2: 0.15 - 0.85 (scrubs smoothly from 100% B&W down to 0% B&W / full color)
        // Phase 3: 0.85 - 1.0 (holds 100% full color, then releases to normal page scroll)
        if (rawProgress < 0.15) {
          setGrayscalePercent(100);
        } else if (rawProgress > 0.85) {
          setGrayscalePercent(0);
        } else {
          const colorProgress = (rawProgress - 0.15) / 0.7; // 0 to 1
          const gray = Math.round((1 - colorProgress) * 100);
          setGrayscalePercent(gray);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const colorBloomFactor = (100 - grayscalePercent) / 100; // 0 to 1

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: "220vh", // Gives scroll track for pinned scrubbing
        width: "100%",
      }}
    >
      {/* Sticky Screen-Centered Frame (Locks in middle screen during scrubbing) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Real Photo PNG Cutout Container (No 3D tilt, No badges) */}
        <div
          style={{
            position: "relative",
            width: "clamp(280px, 35vw, 420px)",
            aspectRatio: "0.88 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Ambient Glow behind Cutout */}
          <div
            style={{
              position: "absolute",
              inset: "10%",
              borderRadius: "50%",
              background: "radial-gradient(circle, var(--glow-active) 0%, transparent 70%)",
              filter: "blur(40px)",
              opacity: 0.35 + colorBloomFactor * 0.45,
              transition: "opacity 0.2s ease-out",
            }}
          />

          {/* Real Photo PNG Cutout (Scrubs B&W -> Full Vibrant Color) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              filter: `drop-shadow(0 20px 35px rgba(0, 0, 0, ${0.3 + colorBloomFactor * 0.2}))`,
              transition: "filter 0.2s ease-out",
            }}
          >
            <Image
              src="/images/nurhasan-cutout.png"
              alt="Nur Hasan — UI/UX Product Designer & CS Engineer"
              fill
              sizes="(max-width: 768px) 320px, 440px"
              priority
              style={{
                objectFit: "contain",
                objectPosition: "bottom center",
                filter: `grayscale(${grayscalePercent}%) contrast(${100 + (grayscalePercent * 0.1)}%) brightness(${grayscalePercent > 50 ? 0.98 : 1.02})`,
                transition: "filter 0.15s ease-out",
                userSelect: "none",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
