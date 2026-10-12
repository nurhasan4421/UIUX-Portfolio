"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavItem {
  label: string;
  href: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: "01", label: "Works", href: "#works" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Philosophy", href: "#philosophy" },
  { number: "04", label: "Services", href: "#services" },
  { number: "05", label: "Experience", href: "#experience" },
  { number: "06", label: "Contact", href: "#contact" },
];

export function StickyNavbar() {
  const [activeSection, setActiveSection] = useState("works");
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if navbar reached top of screen
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsScrolledToTop(heroBottom <= 10);
      }

      // Check current section
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="main-navbar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          backgroundColor: isScrolledToTop ? "var(--bg-glass)" : "var(--bg-secondary)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid var(--border-divider)",
          borderBottom: "1px solid var(--border-divider)",
          transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isScrolledToTop ? "0 10px 30px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            minHeight: "68px",
            padding: "0 clamp(1rem, 3vw, 2.5rem)",
          }}
        >
          {/* Brand Monogram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              paddingRight: "1.5rem",
              borderRight: "1px solid var(--border-divider)",
            }}
          >
            <a
              href="#hero"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontWeight: 800,
                fontSize: "1.05rem",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "var(--text-primary)",
                  color: "var(--bg-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 900,
                }}
              >
                NH
              </span>
              <span className="font-display">NUR HASAN</span>
            </a>
          </div>

          {/* Desktop Inline Menus Divided by Color Shade / Divider */}
          <div
            className="desktop-nav-links"
            style={{
              display: "flex",
              alignItems: "stretch",
              flex: 1,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <div
                  key={item.href}
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setActiveSection(item.href.substring(1))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0 1.5rem",
                      fontSize: "0.92rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--bg-card-hover)" : "transparent",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.02em",
                      position: "relative",
                      whiteSpace: "nowrap",
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
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.72rem",
                        color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      {item.number}
                    </span>
                    <span>{item.label}</span>

                    {/* Active highlight indicator */}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "1.5rem",
                          right: "1.5rem",
                          height: "2px",
                          background: "var(--text-primary)",
                        }}
                      />
                    )}
                  </a>

                  {/* Divider line between inline items */}
                  {idx < NAV_ITEMS.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        backgroundColor: "var(--border-divider)",
                        height: "100%",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Bar: Theme Toggle (just icon) + Let's Talk CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              paddingLeft: "1.5rem",
              borderLeft: "1px solid var(--border-divider)",
            }}
          >
            {/* Night / Day mode toggle (strictly icon only) */}
            <ThemeToggle />

            <a
              href="#contact"
              className="navbar-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1.25rem",
                borderRadius: "999px",
                border: "1px solid var(--border-bold)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "transparent",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--text-primary)";
                e.currentTarget.style.color = "var(--bg-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              aria-label="Toggle menu"
              style={{
                width: "42px",
                height: "42px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-medium)",
                borderRadius: "8px",
                color: "var(--text-primary)",
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "68px",
            zIndex: 99,
            backgroundColor: "var(--bg-primary)",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            borderBottom: "1px solid var(--border-medium)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                setActiveSection(item.href.substring(1));
                setMobileMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 0",
                fontSize: "1.3rem",
                fontWeight: 700,
                borderBottom: "1px solid var(--border-subtle)",
                color: activeSection === item.href.substring(1) ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              <span>{item.label}</span>
              <span className="font-mono" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                {item.number}
              </span>
            </a>
          ))}

          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: "1rem",
                textAlign: "center",
                borderRadius: "999px",
                background: "var(--text-primary)",
                color: "var(--bg-primary)",
                fontWeight: 700,
              }}
            >
              Start a Project
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }
          .navbar-cta-btn {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
