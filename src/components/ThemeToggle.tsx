"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
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

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("nurhasan_theme", nextTheme);
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle Night/Day mode"
        className={`theme-toggle-btn ${className}`}
        style={{
          width: "38px",
          height: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
      >
        <Moon size={17} strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
      title={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
      className={`theme-toggle-btn ${className}`}
      style={{
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "var(--text-primary)",
        backgroundColor: "var(--bg-card-hover)",
        cursor: "pointer",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease",
        border: "1px solid var(--border-subtle)",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {theme === "dark" ? (
        <Sun size={17} strokeWidth={2} />
      ) : (
        <Moon size={17} strokeWidth={2} />
      )}
    </button>
  );
}
