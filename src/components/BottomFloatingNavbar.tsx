"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  MessageSquare,
  MessageCircle,
  Mail,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function BottomFloatingNavbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("nurhasan_theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"dark" | "light">;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("themechange", handleThemeChange);

    const handleScroll = () => {
      const sections = ["hero", "works", "about", "philosophy", "services", "experience", "contact"];
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
    window.addEventListener("touchmove", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  const lastThemeToggleRef = useRef<number>(0);

  const applyGlobalTheme = (newTheme: "dark" | "light") => {
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
      } catch (err) {}
    } catch (e) {}
  };

  const toggleTheme = (e?: React.SyntheticEvent | Event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastThemeToggleRef.current < 350) return;
    lastThemeToggleRef.current = now;

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      applyGlobalTheme(nextTheme);
      try {
        window.dispatchEvent(new CustomEvent("themechange", { detail: nextTheme }));
      } catch (err) {}
      return nextTheme;
    });
  };

  const closeMenu = () => setMenuOpen(false);

  const isWorksActive = activeSection === "works";
  const isAboutActive = activeSection === "about" || activeSection === "philosophy";
  const isServicesActive = activeSection === "services";
  const isContactActive = activeSection === "contact";

  return (
    <>
      {/* Floating Apple Glass Mini Card Menu (Opened via Hamburger) */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 1rem clamp(5.5rem, 12vh, 7.5rem)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "380px",
              borderRadius: "24px",
              backgroundColor: "var(--bg-card)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid var(--border-medium)",
              padding: "1.5rem",
              boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              animation: "slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Header of Mini Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "0.85rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    position: "relative",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid var(--border-medium)",
                  }}
                >
                  <Image
                    src="/images/nurhasan-cutout.png"
                    alt="Nur Hasan"
                    fill
                    sizes="32px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Nur Hasan
                  </h4>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", margin: 0 }} className="font-mono">
                    Product Designer
                  </p>
                </div>
              </div>

              <button
                onClick={closeMenu}
                aria-label="Close menu"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Navigation Links inside Mini Card (Clean Option Tabs without diagonal icons) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {[
                { label: "About & Philosophy", href: "#about", active: isAboutActive },
                { label: "Services & Sprints", href: "#services", active: isServicesActive },
                { label: "Selected Works", href: "#works", active: isWorksActive },
                { label: "Get in Touch", href: "#contact", active: isContactActive },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    backgroundColor: link.active ? "var(--bg-tertiary)" : "transparent",
                    color: link.active ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: link.active ? 700 : 500,
                    fontSize: "0.95rem",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>{link.label}</span>
                  {link.active && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mini Social Media Icons directly (Social channels text removed) */}
            <div
              style={{
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "0.85rem",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.4rem",
                }}
              >
                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801700000000?text=Hi%20Nur%20Hasan,%20I'd%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="social-icon-btn"
                >
                  <MessageCircle size={17} />
                </a>

                {/* Mail */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                  aria-label="Email"
                  title="Direct Email"
                  className="social-icon-btn"
                >
                  <Mail size={17} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                  className="social-icon-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="social-icon-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="social-icon-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  className="social-icon-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>

                {/* Dribbble */}
                <a
                  href={PERSONAL_INFO.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dribbble"
                  title="Dribbble Shots"
                  className="social-icon-btn"
                >
                  <ExternalLink size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Floating Dock Navbar */}
      <nav
        id="bottom-dock-navbar"
        aria-label="Bottom Navigation Bar"
        style={{
          position: "fixed",
          bottom: "clamp(1.1rem, 3vh, 2rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          maxWidth: "96vw",
          display: "flex",
          alignItems: "center",
          gap: "clamp(0.25rem, 1vw, 0.55rem)",
          padding: "0.4rem 0.55rem",
          borderRadius: "999px",
          backgroundColor: "var(--bg-glass)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid var(--border-medium)",
          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.35), 0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "env(safe-area-inset-bottom, 0px)",
          transition: "all 0.25s ease",
        }}
      >
        {/* 1. Colorful Picture Avatar in NH spot */}
        <a
          href="#hero"
          aria-label="Home / Nur Hasan"
          title="Nur Hasan"
          style={{
            position: "relative",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            overflow: "hidden",
            border: activeSection === "hero" ? "2px solid #10b981" : "1.5px solid var(--border-bold)",
            boxShadow: activeSection === "hero" ? "0 0 12px rgba(16, 185, 129, 0.5)" : "none",
            flexShrink: 0,
            display: "block",
            transition: "all 0.2s ease",
          }}
        >
          <Image
            src="/images/nurhasan-cutout.png"
            alt="Nur Hasan"
            fill
            sizes="36px"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </a>

        {/* 2. Works Button (with prominent active UI stat) */}
        <a
          href="#works"
          onClick={() => setActiveSection("works")}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.55rem clamp(0.75rem, 1.8vw, 1.15rem)",
            borderRadius: "999px",
            fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
            fontWeight: isWorksActive ? 800 : 600,
            color: isWorksActive ? "var(--bg-primary)" : "var(--text-primary)",
            backgroundColor: isWorksActive ? "var(--text-primary)" : "transparent",
            boxShadow: isWorksActive ? "0 4px 14px rgba(0,0,0,0.25)" : "none",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          {isWorksActive && (
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
          )}
          <span>Works</span>
        </a>

        {/* 3. Services Button (In place of Hire Now) */}
        <a
          href="#services"
          onClick={() => setActiveSection("services")}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.55rem clamp(0.75rem, 1.8vw, 1.15rem)",
            borderRadius: "999px",
            fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
            fontWeight: isServicesActive ? 800 : 600,
            color: isServicesActive ? "var(--bg-primary)" : "var(--text-primary)",
            backgroundColor: isServicesActive ? "var(--text-primary)" : "transparent",
            boxShadow: isServicesActive ? "0 4px 14px rgba(0,0,0,0.25)" : "none",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          {isServicesActive && (
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
          )}
          <span>Services</span>
        </a>

        {/* 4. Live Chat Button (WhatsApp trigger) */}
        <a
          href="https://wa.me/8801700000000?text=Hi%20Nur%20Hasan,%20let's%20work%20together"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.55rem clamp(0.65rem, 1.8vw, 1rem)",
            borderRadius: "999px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            color: "#10b981",
            fontSize: "clamp(0.78rem, 1.1vw, 0.85rem)",
            fontWeight: 700,
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
          }}
        >
          <MessageSquare size={13} />
          <span>Live Chat</span>
        </a>

        {/* 5. Hamburger Menu Icon (Toggles Mini Card on mobile & desktop) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          title="More sections & socials"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: menuOpen ? "var(--text-primary)" : "var(--bg-card-hover)",
            color: menuOpen ? "var(--bg-primary)" : "var(--text-primary)",
            border: "1px solid var(--border-subtle)",
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .social-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .social-icon-btn:hover {
          transform: scale(1.12);
          background-color: var(--bg-card-hover);
          border-color: var(--border-medium);
        }
        @media (max-width: 768px) {
          .desktop-only-links {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
