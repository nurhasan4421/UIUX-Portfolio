"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { submitContactMessage } from "@/lib/supabase";
import { Mail, MapPin, Copy, Check, Send, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";

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
        padding: "clamp(3.5rem, 8vw, 8rem) clamp(1rem, 5vw, 4rem)",
        maxWidth: "1600px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Giant CTA Header */}
      <div
        style={{
          borderBottom: "1px solid var(--border-divider)",
          paddingBottom: "clamp(2rem, 4vw, 4rem)",
          marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          06 // INITIATE COLLABORATION
        </span>

        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.4rem, 8vw, 130px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          <span
            style={{
              background: "linear-gradient(180deg, var(--text-primary) 0%, var(--text-muted) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ICONIC TOGETHER.
          </span>
        </h2>
      </div>

      {/* Grid: Direct Contact Details & Interactive Form */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Left Column: Coordinates & Quick Info */}
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Direct Channels
          </h3>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
            }}
          >
            Have a project in mind, an early wireframe to review, or a product design role? Reach out directly. I respond within 24 hours.
          </p>

          {/* Email Copy Card */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-card)",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Primary Email
              </span>
              <p
                className="font-mono"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: "0.2rem 0 0 0",
                }}
              >
                {PERSONAL_INFO.email}
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy Email address"
              title="Copy to clipboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border-medium)",
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
              }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* Location & Status Card */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-card)",
              padding: "1.5rem",
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <MapPin size={18} color="var(--text-primary)" />
              <div>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Location &amp; Timezone
                </span>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>
                  Dhaka, Bangladesh • GMT+6
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ExternalLink size={18} color="var(--text-primary)" />
              <div>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Dribbble Portfolio
                </span>
                <a
                  href={PERSONAL_INFO.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
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

        {/* Right Column: Interactive Contact Form (Supabase connected) */}
        <div
          style={{
            borderRadius: "24px",
            border: "1px solid var(--border-medium)",
            backgroundColor: "var(--bg-card)",
            padding: "clamp(1.75rem, 3.5vw, 3rem)",
            boxShadow: "0 20px 45px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
              }}
            >
              [ INQUIRY FORM // SUPABASE ENABLED ]
            </span>
            <h4
              className="font-display"
              style={{
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginTop: "0.3rem",
              }}
            >
              Start a Conversation
            </h4>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label
                className="font-mono"
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe / Sarah Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--text-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
              />
            </div>

            <div>
              <label
                className="font-mono"
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                Your Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--text-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label
                  className="font-mono"
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
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
                    padding: "0.9rem 1.1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="Product UI/UX Design">Product UI/UX</option>
                  <option value="Mobile App Design">Mobile App Design</option>
                  <option value="Design System & Tokens">Design System</option>
                  <option value="SaaS Dashboard">SaaS Dashboard</option>
                  <option value="General Inquiry">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  Estimated Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1.1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="$1k — $3k">$1,000 — $3,000</option>
                  <option value="$3k — $6k">$3,000 — $6,000</option>
                  <option value="$6k+">$6,000+</option>
                  <option value="Discussion Required">To Be Discussed</option>
                </select>
              </div>
            </div>

            <div>
              <label
                className="font-mono"
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                Project Details *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your vision, target users, timeline, or links to existing wireframes..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.5,
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--text-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: "0.5rem",
                padding: "1rem",
                borderRadius: "999px",
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-primary)",
                fontSize: "1rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!submitting) e.currentTarget.style.transform = "scale(1.01)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Send size={16} />
              <span>{submitting ? "Sending Inquiry..." : "Submit Project Inquiry"}</span>
            </button>

            {statusMessage && (
              <div
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: statusMessage.success ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  border: `1px solid ${statusMessage.success ? "#10b981" : "#ef4444"}`,
                  fontSize: "0.88rem",
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
