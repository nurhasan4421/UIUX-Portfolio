"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";

export function FloatingThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const lastToggleRef = useRef<number>(0);

  const applyTheme = (newTheme: "dark" | "light") => {
    try {
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.dataset.theme = newTheme;
      if (document.body) {
        document.body.setAttribute("data-theme", newTheme);
        document.body.dataset.theme = newTheme;
      }

      if (newTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        if (document.body) {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
        }
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        if (document.body) {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
        }
      }

      document.documentElement.style.colorScheme = newTheme;

      try {
        localStorage.setItem("nurhasan_theme", newTheme);
      } catch (e) {
        // Safe fallback if localStorage is disabled or Safari private browsing
      }
    } catch (err) {
      console.error("Failed to apply theme:", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    let initialTheme: "dark" | "light" = "dark";
    try {
      const stored = localStorage.getItem("nurhasan_theme");
      if (stored === "light" || stored === "dark") {
        initialTheme = stored;
      }
    } catch (e) {}

    setTheme(initialTheme);
    applyTheme(initialTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"dark" | "light">;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  const handleToggle = (e?: React.SyntheticEvent | Event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    // Guard against iOS double-firing (touchend followed by synthesized click)
    if (now - lastToggleRef.current < 350) return;
    lastToggleRef.current = now;

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        window.dispatchEvent(new CustomEvent("themechange", { detail: nextTheme }));
      } catch (err) {}
      return nextTheme;
    });
  };

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div
        style={{
          position: "fixed",
          top: "max(1rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))",
          right: "max(1rem, calc(env(safe-area-inset-right, 0px) + 0.75rem))",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
        }}
      >
        <div
          style={{
            height: "36px",
            width: "94px",
            borderRadius: "999px",
            backgroundColor: "rgba(20, 20, 22, 0.85)",
          }}
        />
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(20, 20, 22, 0.85)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "max(1rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))",
        right: "max(1rem, calc(env(safe-area-inset-right, 0px) + 0.75rem))",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        pointerEvents: "auto",
        touchAction: "manipulation",
      }}
    >
      {/* 1. Floated Hire Now Button on Left Side of Day/Night Icon */}
      <a
        href="#contact"
        aria-label="Hire Nur Hasan"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          height: "36px",
          padding: "0 0.9rem",
          borderRadius: "999px",
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 10, 0.92)",
          color: isDark ? "#050505" : "#ffffff",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: isDark
            ? "0 6px 18px rgba(0, 0, 0, 0.35)"
            : "0 6px 18px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Sparkles size={12} strokeWidth={2.4} />
        <span>Hire Now</span>
      </a>

      {/* 2. Smaller Day/Night Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        onTouchEnd={handleToggle}
        aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
        title={isDark ? "Switch to day mode" : "Switch to night mode"}
        className="floating-theme-btn"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark ? "rgba(24, 24, 27, 0.9)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: isDark ? "1.5px solid rgba(255, 255, 255, 0.2)" : "1.5px solid rgba(0, 0, 0, 0.15)",
          color: isDark ? "#ffffff" : "#0a0a0a",
          boxShadow: isDark
            ? "0 6px 18px rgba(0, 0, 0, 0.35)"
            : "0 6px 18px rgba(0, 0, 0, 0.12)",
          transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
        }}
      >
        {isDark ? (
          <Sun size={16} strokeWidth={2.2} />
        ) : (
          <Moon size={16} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}
