"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Briefcase, User, Sparkles, Send, Home } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function BottomFloatingNavbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "works", "about", "services", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="bottom-dock-navbar"
      aria-label="Floating Navigation Menu"
      style={{
        position: "fixed",
        bottom: "clamp(1.2rem, 3.5vh, 2.2rem)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        maxWidth: "92vw",
        display: "flex",
        alignItems: "center",
        gap: "clamp(0.25rem, 1vw, 0.5rem)",
        padding: "0.45rem 0.65rem",
        borderRadius: "999px",
        backgroundColor: "var(--bg-glass)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid var(--border-medium)",
        boxShadow: "0 18px 45px rgba(0, 0, 0, 0.35), 0 2px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "env(safe-area-inset-bottom, 0px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Brand Monogram / Home trigger */}
      <a
        href="#hero"
        aria-label="Back to top"
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          backgroundColor: activeSection === "hero" ? "var(--text-primary)" : "var(--bg-card-hover)",
          color: activeSection === "hero" ? "var(--bg-primary)" : "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "0.82rem",
          letterSpacing: "-0.02em",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        title="Nur Hasan"
      >
        NH
      </a>

      {/* Subtle Divider */}
      <span
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: "var(--border-subtle)",
          margin: "0 0.2rem",
          display: "inline-block",
        }}
      />

      {/* Nav Menu Items (No Numbers, Clean Apple Glass Figma Dock Style) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(item.href.substring(1))}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.55rem clamp(0.75rem, 2vw, 1.25rem)",
                borderRadius: "999px",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                backgroundColor: isActive ? "var(--bg-card-hover)" : "transparent",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.backgroundColor = "var(--glow-subtle)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span>{item.label}</span>

              {/* Active Dot / Glow */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "3px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-primary)",
                  }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Subtle Divider */}
      <span
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: "var(--border-subtle)",
          margin: "0 0.2rem",
          display: "inline-block",
        }}
      />

      {/* Day / Night Mode Icon Button (Works effortlessly on phone) */}
      <ThemeToggle />
    </nav>
  );
}
