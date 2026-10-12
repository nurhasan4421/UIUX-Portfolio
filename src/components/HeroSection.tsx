"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

interface LetterItem {
  id: string;
  char: string;
  wordIdx: number;
  letterKey: string; // Used to identify identical letters ('E', 'O', 'U', 'T', 'R')
}

// Initial structured letters for the headline lines
const INITIAL_LINE_1: LetterItem[] = [
  // LET'S (word 0)
  { id: "w0_L", char: "L", wordIdx: 0, letterKey: "L" },
  { id: "w0_E", char: "E", wordIdx: 0, letterKey: "E" },
  { id: "w0_T", char: "T", wordIdx: 0, letterKey: "T" },
  { id: "w0_APO", char: "'", wordIdx: 0, letterKey: "'" },
  { id: "w0_S", char: "S", wordIdx: 0, letterKey: "S" },
  { id: "w0_sp", char: " ", wordIdx: 0, letterKey: " " },
  // MAKE (word 1)
  { id: "w1_M", char: "M", wordIdx: 1, letterKey: "M" },
  { id: "w1_A", char: "A", wordIdx: 1, letterKey: "A" },
  { id: "w1_K", char: "K", wordIdx: 1, letterKey: "K" },
  { id: "w1_E", char: "E", wordIdx: 1, letterKey: "E" },
];

const INITIAL_LINE_2: LetterItem[] = [
  // YOUR (word 2)
  { id: "w2_Y", char: "Y", wordIdx: 2, letterKey: "Y" },
  { id: "w2_O", char: "O", wordIdx: 2, letterKey: "O" },
  { id: "w2_U", char: "U", wordIdx: 2, letterKey: "U" },
  { id: "w2_R", char: "R", wordIdx: 2, letterKey: "R" },
  { id: "w2_sp", char: " ", wordIdx: 2, letterKey: " " },
  // PROJECT (word 3)
  { id: "w3_P", char: "P", wordIdx: 3, letterKey: "P" },
  { id: "w3_R", char: "R", wordIdx: 3, letterKey: "R" },
  { id: "w3_O", char: "O", wordIdx: 3, letterKey: "O" },
  { id: "w3_J", char: "J", wordIdx: 3, letterKey: "J" },
  { id: "w3_E", char: "E", wordIdx: 3, letterKey: "E" },
  { id: "w3_C", char: "C", wordIdx: 3, letterKey: "C" },
  { id: "w3_T", char: "T", wordIdx: 3, letterKey: "T" },
];

const INITIAL_LINE_3: LetterItem[] = [
  // BEAUTIFUL. (word 4)
  { id: "w4_B", char: "B", wordIdx: 4, letterKey: "B" },
  { id: "w4_E", char: "E", wordIdx: 4, letterKey: "E" },
  { id: "w4_A", char: "A", wordIdx: 4, letterKey: "A" },
  { id: "w4_U1", char: "U", wordIdx: 4, letterKey: "U" },
  { id: "w4_T", char: "T", wordIdx: 4, letterKey: "T" },
  { id: "w4_I", char: "I", wordIdx: 4, letterKey: "I" },
  { id: "w4_F", char: "F", wordIdx: 4, letterKey: "F" },
  { id: "w4_U2", char: "U", wordIdx: 4, letterKey: "U" },
  { id: "w4_L", char: "L", wordIdx: 4, letterKey: "L" },
  { id: "w4_DOT", char: ".", wordIdx: 4, letterKey: "." },
];

const INITIAL_SUB_LINE: LetterItem[] = [
  // I'M (word 5)
  { id: "w5_I", char: "I", wordIdx: 5, letterKey: "I" },
  { id: "w5_APO", char: "'", wordIdx: 5, letterKey: "'" },
  { id: "w5_M", char: "M", wordIdx: 5, letterKey: "M" },
  { id: "w5_sp1", char: " ", wordIdx: 5, letterKey: " " },
  // UI/UX (word 6)
  { id: "w6_U1", char: "U", wordIdx: 6, letterKey: "U" },
  { id: "w6_I", char: "I", wordIdx: 6, letterKey: "I" },
  { id: "w6_SL", char: "/", wordIdx: 6, letterKey: "/" },
  { id: "w6_U2", char: "U", wordIdx: 6, letterKey: "U" },
  { id: "w6_X", char: "X", wordIdx: 6, letterKey: "X" },
  { id: "w6_sp2", char: " ", wordIdx: 6, letterKey: " " },
  // DESIGNER (word 7)
  { id: "w7_D", char: "D", wordIdx: 7, letterKey: "D" },
  { id: "w7_E1", char: "E", wordIdx: 7, letterKey: "E" },
  { id: "w7_S", char: "S", wordIdx: 7, letterKey: "S" },
  { id: "w7_I", char: "I", wordIdx: 7, letterKey: "I" },
  { id: "w7_G", char: "G", wordIdx: 7, letterKey: "G" },
  { id: "w7_N", char: "N", wordIdx: 7, letterKey: "N" },
  { id: "w7_E2", char: "E", wordIdx: 7, letterKey: "E" },
  { id: "w7_R", char: "R", wordIdx: 7, letterKey: "R" },
];

interface SwapAnimationState {
  idA: string;
  idB: string;
  dx: number;
  dy: number;
}

export function HeroSection() {
  const [line1, setLine1] = useState<LetterItem[]>(INITIAL_LINE_1);
  const [line2, setLine2] = useState<LetterItem[]>(INITIAL_LINE_2);
  const [line3, setLine3] = useState<LetterItem[]>(INITIAL_LINE_3);
  const [subLine, setSubLine] = useState<LetterItem[]>(INITIAL_SUB_LINE);

  // Random word dimming: at most 2 words dimmed at a time (indices 0..7)
  const [dimmedWords, setDimmedWords] = useState<number[]>([]);

  // Active jumping letter swap animation
  const [swapState, setSwapState] = useState<SwapAnimationState | null>(null);

  const letterRefs = useRef<Map<string, HTMLElement>>(new Map());

  // 1. Ambient Random Word Dimming (Max 2 words at a time)
  useEffect(() => {
    const dimInterval = setInterval(() => {
      // Pick 1 or 2 distinct words from 0 to 7
      const totalWords = 8;
      const count = Math.random() > 0.4 ? 2 : 1;
      const first = Math.floor(Math.random() * totalWords);
      let second = Math.floor(Math.random() * totalWords);
      while (second === first) {
        second = Math.floor(Math.random() * totalWords);
      }

      const selected = count === 2 ? [first, second] : [first];
      setDimmedWords(selected);

      // Restore to normal color after 1.5 seconds
      setTimeout(() => {
        setDimmedWords([]);
      }, 1500);
    }, 3600);

    return () => clearInterval(dimInterval);
  }, []);

  // 2. Kinetic Letter Jumping and Position Swap (ALL letters that appear twice or more)
  useEffect(() => {
    const swapInterval = setInterval(() => {
      // If a swap is already animating, wait
      if (swapState) return;

      // Collect all current letters across lines
      const allLetters = [...line1, ...line2, ...line3, ...subLine];

      // Group all alphabet letters by character (case-insensitive)
      const letterGroups = new Map<string, LetterItem[]>();
      allLetters.forEach((item) => {
        const ch = item.char.toUpperCase();
        if (/[A-Z]/.test(ch)) {
          const list = letterGroups.get(ch) || [];
          list.push(item);
          letterGroups.set(ch, list);
        }
      });

      // Filter ALL letters that appear at least twice
      const eligibleGroups = Array.from(letterGroups.values()).filter((group) => group.length >= 2);
      if (eligibleGroups.length === 0) return;

      // Pick a random duplicate letter group (O, U, E, T, R, A, I, L, M, S, etc.)
      const targetGroup = eligibleGroups[Math.floor(Math.random() * eligibleGroups.length)];

      // Pick 2 distinct instances of this identical letter
      const idxA = Math.floor(Math.random() * targetGroup.length);
      let idxB = Math.floor(Math.random() * targetGroup.length);
      while (idxB === idxA) {
        idxB = Math.floor(Math.random() * targetGroup.length);
      }

      const itemA = targetGroup[idxA];
      const itemB = targetGroup[idxB];

      const elA = letterRefs.current.get(itemA.id);
      const elB = letterRefs.current.get(itemB.id);

      if (!elA || !elB) return;

      const rectA = elA.getBoundingClientRect();
      const rectB = elB.getBoundingClientRect();

      // Ensure elements are rendered and visible
      if (rectA.width === 0 || rectB.width === 0) return;

      const dx = rectB.left - rectA.left;
      const dy = rectB.top - rectA.top;

      // Trigger the jump animation
      setSwapState({
        idA: itemA.id,
        idB: itemB.id,
        dx,
        dy,
      });

      // Complete swap in data and reset transform after jump trajectory finishes (950ms)
      setTimeout(() => {
        // Swap IDs in lines so they officially replace their places
        const swapInLine = (arr: LetterItem[]) =>
          arr.map((item) => {
            if (item.id === itemA.id) return { ...itemB, wordIdx: item.wordIdx };
            if (item.id === itemB.id) return { ...itemA, wordIdx: item.wordIdx };
            return item;
          });

        setLine1((prev) => swapInLine(prev));
        setLine2((prev) => swapInLine(prev));
        setLine3((prev) => swapInLine(prev));
        setSubLine((prev) => swapInLine(prev));

        setSwapState(null);
      }, 950);
    }, 4200);

    return () => clearInterval(swapInterval);
  }, [line1, line2, line3, subLine, swapState]);

  // Helper to render letter with kinetic jump and word dimming
  const renderLetter = (item: LetterItem) => {
    if (item.char === " ") {
      return (
        <span key={item.id} style={{ display: "inline-block", width: "0.26em" }}>
          {" "}
        </span>
      );
    }

    const isDimmed = dimmedWords.includes(item.wordIdx);
    const isSwappingA = swapState?.idA === item.id;
    const isSwappingB = swapState?.idB === item.id;

    let jumpTransform = "none";
    let isJumping = false;
    let customAnimation = "none";

    if (isSwappingA && swapState) {
      isJumping = true;
      customAnimation = `jumpMotionA 0.95s cubic-bezier(0.34, 1.45, 0.64, 1) forwards`;
    } else if (isSwappingB && swapState) {
      isJumping = true;
      customAnimation = `jumpMotionB 0.95s cubic-bezier(0.34, 1.45, 0.64, 1) forwards`;
    }

    return (
      <span
        key={item.id}
        ref={(el) => {
          if (el) letterRefs.current.set(item.id, el);
          else letterRefs.current.delete(item.id);
        }}
        style={{
          display: "inline-block",
          position: "relative",
          zIndex: isJumping ? 30 : 1,
          opacity: isDimmed ? 0.3 : 1,
          transform: jumpTransform,
          animation: customAnimation,
          color: isJumping ? "var(--text-primary)" : "inherit",
          textShadow: isJumping ? "0 0 18px var(--text-primary)" : "none",
          transition: isJumping
            ? "none"
            : "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
          userSelect: "none",
          willChange: isJumping ? "transform, opacity" : "auto",
        }}
      >
        {item.char}
      </span>
    );
  };

  return (
    <header
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "clamp(80vh, 88vh, 920px)",
        padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)",
        background: "radial-gradient(ellipse 90% 50% at 50% 0%, var(--glow-active), transparent 75%)",
        overflow: "hidden",
      }}
    >
      {/* Top bar (Dhaka, Bangladesh / BSc in CS) REMOVED as requested */}

      {/* Main Massive Typography Header (Massive on Mobile & Desktop + Kinetic Word Dimming & Letter Swapping) */}
      <div
        style={{
          margin: "auto 0",
          padding: "clamp(1rem, 3vw, 2.5rem) 0",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.6rem, 1.5vw, 1.25rem)",
        }}
      >
        {/* Massive Headline: LET'S MAKE / YOUR PROJECT / BEAUTIFUL. */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 10.8vw, 150px)",
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {/* Line 1: LET'S MAKE */}
          <div style={{ whiteSpace: "nowrap" }}>{line1.map(renderLetter)}</div>

          {/* Line 2: YOUR PROJECT */}
          <div style={{ whiteSpace: "nowrap" }}>{line2.map(renderLetter)}</div>

          {/* Line 3: BEAUTIFUL. */}
          <div style={{ whiteSpace: "nowrap" }}>{line3.map(renderLetter)}</div>
        </h1>

        {/* Massive Sub-headline: I'M UI/UX DESIGNER */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.9rem, 7.8vw, 96px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          <div>{subLine.map(renderLetter)}</div>
        </h2>
      </div>

      {/* Subtle Scroll Hint leading into Pinned Portrait Color Scrubbing Story */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "1rem",
          borderTop: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
          fontSize: "clamp(0.72rem, 0.95vw, 0.82rem)",
        }}
      >
        <span className="font-mono" style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>
          SCROLL TO EXPLORE
        </span>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            animation: "subtleBounce 2.4s ease-in-out infinite",
          }}
        >
          <ArrowDown size={14} />
        </div>
      </div>

      {/* Dynamic Keyframe Injection for the Exact Arc Hop Trajectories */}
      <style jsx global>{`
        @keyframes subtleBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        /* Kinetic Arc Hop Jump Swap Animation for Identical Letters (O, U, E, T, R) */
        @keyframes jumpMotionA {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          32% {
            transform: translate(${swapState ? swapState.dx * 0.32 : 0}px, ${
              swapState ? swapState.dy * 0.32 - 28 : -28
            }px) scale(1.25) rotate(14deg);
          }
          68% {
            transform: translate(${swapState ? swapState.dx * 0.75 : 0}px, ${
              swapState ? swapState.dy * 0.75 - 12 : -12
            }px) scale(1.12) rotate(-8deg);
          }
          100% {
            transform: translate(${swapState ? swapState.dx : 0}px, ${
              swapState ? swapState.dy : 0
            }px) scale(1) rotate(0deg);
          }
        }

        @keyframes jumpMotionB {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          32% {
            transform: translate(${swapState ? -swapState.dx * 0.32 : 0}px, ${
              swapState ? -swapState.dy * 0.32 - 28 : -28
            }px) scale(1.25) rotate(-14deg);
          }
          68% {
            transform: translate(${swapState ? -swapState.dx * 0.75 : 0}px, ${
              swapState ? -swapState.dy * 0.75 - 12 : -12
            }px) scale(1.12) rotate(8deg);
          }
          100% {
            transform: translate(${swapState ? -swapState.dx : 0}px, ${
              swapState ? -swapState.dy : 0
            }px) scale(1) rotate(0deg);
          }
        }

        @media (max-width: 640px) {
          #hero h1 {
            line-height: 0.86 !important;
            letter-spacing: -0.05em !important;
          }
        }
      `}</style>
    </header>
  );
}
