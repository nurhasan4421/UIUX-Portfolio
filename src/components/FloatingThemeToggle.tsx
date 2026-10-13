"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { AppTheme, getStoredTheme, applyThemeToDOM, broadcastThemeChange } from "@/utils/theme";
import { getAssetPath } from "@/utils/assetPath";

export function FloatingThemeToggle() {
  const [theme, setTheme] = useState<AppTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    applyThemeToDOM(initialTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<AppTheme>;
      if (customEvent.detail && (customEvent.detail === "dark" || customEvent.detail === "light")) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("nurhasan_theme_change", handleThemeChange);
    window.addEventListener("themechange", handleThemeChange);

    return () => {
      window.removeEventListener("nurhasan_theme_change", handleThemeChange);
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  const lastToggleTimeRef = useRef(0);

  const handleToggle = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      if (e) {
        e.stopPropagation();
      }
      const now = Date.now();
      if (now - lastToggleTimeRef.current < 250) return;
      lastToggleTimeRef.current = now;

      setTheme((prev) => {
        const nextTheme: AppTheme = prev === "dark" ? "light" : "dark";
        applyThemeToDOM(nextTheme);
        broadcastThemeChange(nextTheme);
        try {
          window.dispatchEvent(new CustomEvent("themechange", { detail: nextTheme }));
        } catch (err) {}
        return nextTheme;
      });
    },
    []
  );

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div
        className="floating-top-controls"
        style={{
          position: "fixed",
          top: "max(14px, calc(env(safe-area-inset-top, 0px) + 8px))",
          right: "max(14px, calc(env(safe-area-inset-right, 0px) + 8px))",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            height: "40px",
            width: "92px",
            borderRadius: "999px",
            backgroundColor: "rgba(20, 20, 22, 0.85)",
          }}
        />
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "rgba(20, 20, 22, 0.85)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="floating-top-controls"
      style={{
        position: "fixed",
        top: "max(14px, calc(env(safe-area-inset-top, 0px) + 8px))",
        right: "max(14px, calc(env(safe-area-inset-right, 0px) + 8px))",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        pointerEvents: "auto",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      {/* 0. White Desk Logo on Left Side of Hire Now Button */}
      <a
        href="#experience"
        aria-label="White Desk Agency"
        title="White Desk Design Studio"
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("experience");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "experience";
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          minHeight: "40px",
          padding: "0 0.85rem",
          borderRadius: "999px",
          backgroundColor: isDark ? "rgba(18, 18, 20, 0.88)" : "rgba(255, 255, 255, 0.92)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          textDecoration: "none",
          boxShadow: isDark
            ? "0 4px 14px rgba(0, 0, 0, 0.4)"
            : "0 4px 14px rgba(0, 0, 0, 0.08)",
          transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
          touchAction: "manipulation",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
        }}
      >
        <Image
          src={getAssetPath("/images/whitedesk-white.png")}
          alt="White Desk Logo"
          width={86}
          height={18}
          style={{ objectFit: "contain", height: "16px", width: "auto" }}
          className="whitedesk-logo-dark"
          priority
        />
        <Image
          src={getAssetPath("/images/whitedesk-black.png")}
          alt="White Desk Logo"
          width={86}
          height={18}
          style={{ objectFit: "contain", height: "16px", width: "auto" }}
          className="whitedesk-logo-light"
          priority
        />
      </a>

      {/* 1. Floated Hire Now Button on Left Side */}
      <a
        href="#contact"
        aria-label="Hire Nur Hasan"
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("contact");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "contact";
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          minHeight: "40px",
          padding: "0 1.15rem",
          borderRadius: "999px",
          backgroundColor: isDark ? "#ffffff" : "#0a0a0a",
          color: isDark ? "#050505" : "#ffffff",
          fontSize: "0.84rem",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: isDark
            ? "0 4px 14px rgba(0, 0, 0, 0.45)"
            : "0 4px 14px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
          touchAction: "manipulation",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <span>Hire Now</span>
      </a>

      {/* 2. Day/Night Toggle Button (Mobile Touch Reliable & Fully Responsive) */}
      <button
        type="button"
        onTouchStart={(e) => e.stopPropagation()}
        onClick={handleToggle}
        aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
        title={isDark ? "Switch to day mode" : "Switch to night mode"}
        className="floating-theme-btn"
        style={{
          width: "42px",
          height: "42px",
          minWidth: "42px",
          minHeight: "42px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark ? "rgba(24, 24, 27, 0.95)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: isDark ? "1.5px solid rgba(255, 255, 255, 0.22)" : "1.5px solid rgba(0, 0, 0, 0.18)",
          color: isDark ? "#ffffff" : "#0a0a0a",
          boxShadow: isDark
            ? "0 6px 20px rgba(0, 0, 0, 0.5)"
            : "0 6px 18px rgba(0, 0, 0, 0.14)",
          transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
          cursor: "pointer",
          pointerEvents: "auto",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          outline: "none",
        }}
      >
        {isDark ? (
          <Sun size={18} strokeWidth={2.3} />
        ) : (
          <Moon size={18} strokeWidth={2.3} />
        )}
      </button>
    </div>
  );
}
