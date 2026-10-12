"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

export function ArtScratchPortrait({ className = "" }: { className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [shadowStyle, setShadowStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const shadowX = ((x - centerX) / centerX) * -15;
    const shadowY = ((y - centerY) / centerY) * -15;

    setTransformStyle(
      `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`
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
        width: "clamp(260px, 30vw, 360px)",
        aspectRatio: "0.9 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: transformStyle,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Ambient Radial Glow Behind Cutout */}
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
          transition: "filter 0.2s ease",
        }}
      >
        <Image
          src="/images/nurhasan-cutout.png"
          alt="Nur Hasan - UI/UX Product Designer"
          fill
          sizes="(max-width: 768px) 280px, 380px"
          priority
          className="real-cutout-img"
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
            pointerEvents: "none",
            userSelect: "none",
            transition: "filter 0.4s ease, transform 0.3s ease",
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
              backgroundColor: isHovered ? "#10b981" : "var(--text-muted)",
              transition: "background-color 0.2s ease",
            }}
          />
          {isHovered ? "3D TILT" : "NUR HASAN"}
        </span>
      </div>

      <style jsx global>{`
        /* Dynamic Black & White for real photo cutout with Day/Night Theme */
        .real-cutout-img {
          filter: grayscale(100%) contrast(112%) brightness(0.96);
        }

        [data-theme="light"] .real-cutout-img {
          filter: grayscale(100%) contrast(108%) brightness(1.02);
        }

        /* Subtle tactile color bloom on interactive hover */
        .real-portrait-container:hover .real-cutout-img {
          filter: grayscale(20%) contrast(108%) brightness(1);
        }
      `}</style>
    </div>
  );
}
