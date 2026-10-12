"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function FloatingThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("nurhasan_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("nurhasan_theme", nextTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "clamp(1rem, 2.5vw, 1.5rem)",
        right: "clamp(1rem, 2.5vw, 1.5rem)",
        zIndex: 10000,
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={toggleTheme}
        onTouchEnd={toggleTheme}
        aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
        title={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-glass)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid var(--border-medium)",
          color: "var(--text-primary)",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.borderColor = "var(--border-bold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "var(--border-medium)";
        }}
      >
        {theme === "dark" ? (
          <Sun size={20} strokeWidth={2} />
        ) : (
          <Moon size={20} strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
