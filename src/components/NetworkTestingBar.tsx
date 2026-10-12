"use client";

import React, { useState } from "react";
import { Smartphone, Copy, Check, X, Wifi } from "lucide-react";

export function NetworkTestingBar() {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const mobileUrl = "http://192.168.0.54:3001";

  const handleCopy = () => {
    navigator.clipboard.writeText(mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Open mobile preview helper"
        title="View phone preview IP address"
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 1rem",
          borderRadius: "999px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-medium)",
          color: "var(--text-primary)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          cursor: "pointer",
          fontSize: "0.8rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <Smartphone size={15} />
        <span className="font-mono">Phone URL</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Local network testing panel"
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 999,
        maxWidth: "360px",
        borderRadius: "16px",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-bold)",
        padding: "1rem 1.25rem",
        boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Wifi size={14} color="#10b981" />
          <span
            className="font-mono"
            style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}
          >
            MOBILE LOCAL PREVIEW
          </span>
        </div>

        <button
          onClick={() => setCollapsed(true)}
          aria-label="Minimize preview helper"
          style={{
            cursor: "pointer",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            padding: "2px",
          }}
        >
          <X size={15} />
        </button>
      </div>

      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.75rem", lineHeight: 1.4 }}>
        Open on your phone (connected to local Wi-Fi):
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-subtle)",
          padding: "0.5rem 0.75rem",
          borderRadius: "8px",
          gap: "0.5rem",
        }}
      >
        <code className="font-mono" style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>
          {mobileUrl}
        </code>

        <button
          onClick={handleCopy}
          aria-label="Copy phone URL"
          title="Copy IP to clipboard"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.75rem",
            color: "var(--text-primary)",
            padding: "0.2rem 0.4rem",
            borderRadius: "4px",
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </aside>
  );
}
