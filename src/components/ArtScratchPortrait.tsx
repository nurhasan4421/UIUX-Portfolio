"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

export function ArtScratchPortrait({ className = "" }: { className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(
      `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        setIsHovered(true);
        handleMouseMove(e);
      }}
      onMouseLeave={handleMouseLeave}
      className={`art-portrait-container ${className}`}
      style={{
        position: "relative",
        width: "clamp(240px, 32vw, 360px)",
        aspectRatio: "1/1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: transformStyle,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Subtle Halo */}
      <div
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow-active) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          transform: "translateZ(-20px)",
        }}
      />

      {/* The Artistic Scratch Portrait Body */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateZ(30px)",
        }}
      >
        <Image
          src="/images/nurhasan-art-scratch.jpg"
          alt="Nur Hasan - Artistic Sketch Portrait"
          fill
          sizes="(max-width: 768px) 260px, 360px"
          priority
          className="art-scratch-img"
          style={{
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Interactive Micro Badge */}
      <div
        style={{
          position: "absolute",
          bottom: "0.25rem",
          right: "0.5rem",
          transform: "translateZ(45px)",
          pointerEvents: "none",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0.3rem 0.75rem",
            borderRadius: "999px",
            backgroundColor: "var(--bg-glass-card)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border-medium)",
            color: "var(--text-secondary)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          }}
        >
          {isHovered ? "✦ 3D FOCUS" : "NUR HASAN"}
        </span>
      </div>

      <style jsx global>{`
        /* Dynamic Theme Blending: pure sketch lines without background block */
        [data-theme="dark"] .art-scratch-img {
          filter: invert(1) contrast(120%) brightness(1.1);
          mix-blend-mode: screen;
        }
        [data-theme="light"] .art-scratch-img {
          filter: contrast(125%) brightness(0.95);
          mix-blend-mode: multiply;
        }
      `}</style>
    </div>
  );
}
