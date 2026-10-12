"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function ArtScratchPortrait({ className = "" }: { className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [shadowStyle, setShadowStyle] = useState("");
  const [grayscalePercent, setGrayscalePercent] = useState(100);

  // Dynamic Scroll-linked B&W -> Color transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // When at top (0-40px): 100% grayscale (pure B&W)
      // As user scrolls down (40px - 320px): color smoothly reveals (0% grayscale)
      // When scrolling back up: returns to 100% B&W
      const start = 30;
      const end = 300;

      if (scrollY <= start) {
        setGrayscalePercent(100);
      } else if (scrollY >= end) {
        setGrayscalePercent(0);
      } else {
        const factor = 1 - (scrollY - start) / (end - start);
        setGrayscalePercent(Math.round(factor * 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    const shadowX = ((x - centerX) / centerX) * -15;
    const shadowY = ((y - centerY) / centerY) * -15;

    setTransformStyle(
      `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`
    );
    setShadowStyle(`drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 30px var(--glow-active))`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadowStyle("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        setIsHovered(true);
        handleMouseMove(e);
      }}
      onMouseLeave={handleMouseLeave}
      className={`real-portrait-container ${className}`}
      style={{
        position: "relative",
        width: "clamp(260px, 34vw, 380px)",
        aspectRatio: "0.9 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: transformStyle,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Radial Glow Behind Cutout */}
      <div
        style={{
          position: "absolute",
          inset: "15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow-active) 0%, transparent 70%)",
          filter: "blur(35px)",
          pointerEvents: "none",
          transform: "translateZ(-20px)",
          transition: "opacity 0.3s ease",
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Real Photo PNG Cutout (No background) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transform: "translateZ(30px)",
          filter: shadowStyle,
          transition: "filter 0.25s ease",
        }}
      >
        <Image
          src="/images/nurhasan-cutout.png"
          alt="Nur Hasan - UI/UX Product Designer"
          fill
          sizes="(max-width: 768px) 300px, 400px"
          priority
          className="real-cutout-img"
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
            pointerEvents: "none",
            userSelect: "none",
            filter: `grayscale(${grayscalePercent}%) contrast(${100 + (grayscalePercent * 0.12)}%) brightness(${grayscalePercent > 50 ? 0.96 : 1.02})`,
            transition: "filter 0.2s ease-out",
          }}
        />
      </div>

      {/* Floating 3D Badge Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          right: "0.5rem",
          transform: "translateZ(50px)",
          pointerEvents: "none",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0.35rem 0.8rem",
            borderRadius: "999px",
            backgroundColor: "var(--bg-glass-card)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--border-medium)",
            color: "var(--text-primary)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: grayscalePercent === 0 ? "#10b981" : "var(--text-muted)",
              transition: "background-color 0.3s ease",
            }}
          />
          {grayscalePercent === 0 ? "LIVE COLOR" : "B&W FOCUS"}
        </span>
      </div>
    </div>
  );
}
