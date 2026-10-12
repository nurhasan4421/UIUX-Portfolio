"use client";

import React, { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  const [dhakaTime, setDhakaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setDhakaTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-divider)",
        backgroundColor: "var(--bg-secondary)",
        padding: "clamp(3rem, 5vw, 5rem) clamp(1rem, 5vw, 4rem) 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <h3
              className="font-display"
              style={{
                fontSize: "1.8rem",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              NUR HASAN
            </h3>
            <p
              className="font-mono"
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginTop: "0.4rem",
              }}
            >
              UI/UX Product Designer • CS Engineer
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              fontSize: "0.92rem",
            }}
          >
            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Social Channels
              </span>
              <ul style={{ listStyle: "none", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <li>
                  <a
                    href={PERSONAL_INFO.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-secondary)", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    Dribbble Profile ↗
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:nurhasan90446@gmail.com"
                    style={{ color: "var(--text-secondary)", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    Direct Email ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Studio Affiliation
              </span>
              <p style={{ marginTop: "0.5rem", color: "var(--text-secondary)" }}>
                White Desk Studio
                <br />
                Dhaka, Bangladesh
              </p>
            </div>

            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Local Time
              </span>
              <p className="font-mono" style={{ marginTop: "0.5rem", color: "var(--text-primary)", fontWeight: 700 }}>
                {dhakaTime || "09:14 PM GMT+6"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}
          className="font-mono"
        >
          <div>
            © {new Date().getFullYear()} Nur Hasan. All Rights Reserved. Monochrome Brutalist Edition.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
