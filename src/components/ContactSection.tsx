"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { submitContactMessage } from "@/lib/supabase";
import { Mail, MapPin, Copy, Check, Send, ExternalLink } from "lucide-react";
import { ScrollScrubHeadline } from "@/components/ScrollScrubHeadline";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project_type: "Product UI/UX Design",
    budget: "$1k — $3k",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setStatusMessage(null);

    const res = await submitContactMessage(formData);
    setSubmitting(false);
    setStatusMessage({ text: res.message, success: res.success });

    if (res.success) {
      setFormData({
        name: "",
        email: "",
        project_type: "Product UI/UX Design",
        budget: "$1k — $3k",
        message: "",
      });
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 3.5rem)",
        maxWidth: "1500px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* CTA Header */}
      <div
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
          marginBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: "0.6rem",
          }}
        >
          Initiate Collaboration
        </span>

        <ScrollScrubHeadline
          lines={["LET'S BUILD", "SOMETHING", "ICONIC TOGETHER."]}
          fontSize="clamp(2rem, 6.5vw, 110px)"
          fontWeight={900}
          lineHeight={0.95}
          letterSpacing="-0.04em"
        />
      </div>

      {/* Grid: Coordinates & Form */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "start",
        }}
      >
        {/* Left Column: Coordinates */}
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Direct Channels
          </h3>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Have a project in mind, an early wireframe to review, or a product design opportunity? Reach out directly. I respond within 24 hours.
          </p>

          {/* Email Copy Box */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid var(--border-subtle)",
              backgroundColor: "var(--bg-card)",
              padding: "1.25rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Email
              </span>
              <p
                className="font-mono"
                style={{
                  fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: "0.15rem 0 0 0",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {PERSONAL_INFO.email}
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy email"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                minHeight: "40px",
                padding: "0 0.9rem",
                borderRadius: "8px",
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                fontSize: "0.8rem",
                cursor: "pointer",
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
              }}
            >
              {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Meta card */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid var(--border-subtle)",
              backgroundColor: "var(--bg-card)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <MapPin size={16} color="var(--text-primary)" />
              <div>
                <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Location &amp; Timezone
                </span>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, margin: 0 }}>
                  Dhaka, Bangladesh • GMT+6
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ExternalLink size={16} color="var(--text-primary)" />
              <div>
                <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Dribbble
                </span>
                <a
                  href={PERSONAL_INFO.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--text-primary)",
                    textDecoration: "underline",
                  }}
                >
                  dribbble.com/nurhasan4421
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div
          style={{
            borderRadius: "20px",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-card)",
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.16)",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
              }}
            >
              Inquiry Form
            </span>
            <h4
              className="font-display"
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginTop: "0.25rem",
              }}
            >
              Start a Conversation
            </h4>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label
                className="font-mono"
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Name *
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  padding: "0 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                className="font-mono"
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  padding: "0 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
              <div>
                <label
                  className="font-mono"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.4rem",
                    textTransform: "uppercase",
                  }}
                >
                  Project Scope
                </label>
                <select
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  style={{
                    width: "100%",
                    minHeight: "48px",
                    padding: "0 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                >
                  <option value="Product UI/UX Design">Product UI/UX</option>
                  <option value="Mobile App Design">Mobile App</option>
                  <option value="Design System & Tokens">Design System</option>
                  <option value="SaaS Dashboard">SaaS Dashboard</option>
                  <option value="General Inquiry">Other</option>
                </select>
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.4rem",
                    textTransform: "uppercase",
                  }}
                >
                  Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{
                    width: "100%",
                    minHeight: "48px",
                    padding: "0 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                >
                  <option value="$1k — $3k">$1,000 — $3,000</option>
                  <option value="$3k — $6k">$3,000 — $6,000</option>
                  <option value="$6k+">$6,000+</option>
                  <option value="Discussion Required">Negotiable</option>
                </select>
              </div>
            </div>

            <div>
              <label
                className="font-mono"
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Project Details *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your goals, target users, or timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: "0.5rem",
                minHeight: "48px",
                borderRadius: "999px",
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-primary)",
                fontSize: "0.95rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
                border: "none",
              }}
            >
              <Send size={15} />
              <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
            </button>

            {statusMessage && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: statusMessage.success ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  border: `1px solid ${statusMessage.success ? "#10b981" : "#ef4444"}`,
                  fontSize: "0.85rem",
                  color: statusMessage.success ? "#10b981" : "#ef4444",
                  textAlign: "center",
                }}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
