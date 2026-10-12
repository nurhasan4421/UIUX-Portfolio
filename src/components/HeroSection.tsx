"use client";

import React, { useState, useEffect, useRef } from "react";

interface LetterItem {
  id: string;
  char: string;
  wordIdx: number;
  letterKey: string; // Used to identify identical letters ('E', 'O', 'U', 'T', 'R')
}

// Initial structured letters for the catchy client-focused headline lines
const INITIAL_LINE_1: LetterItem[] = [
  // CRAFTING (word 0)
  { id: "w0_C", char: "C", wordIdx: 0, letterKey: "C" },
  { id: "w0_R", char: "R", wordIdx: 0, letterKey: "R" },
  { id: "w0_A", char: "A", wordIdx: 0, letterKey: "A" },
  { id: "w0_F", char: "F", wordIdx: 0, letterKey: "F" },
  { id: "w0_T", char: "T", wordIdx: 0, letterKey: "T" },
  { id: "w0_I", char: "I", wordIdx: 0, letterKey: "I" },
  { id: "w0_N", char: "N", wordIdx: 0, letterKey: "N" },
  { id: "w0_G", char: "G", wordIdx: 0, letterKey: "G" },
  { id: "w0_sp", char: " ", wordIdx: 0, letterKey: " " },
  // DIGITAL (word 1)
  { id: "w1_D", char: "D", wordIdx: 1, letterKey: "D" },
  { id: "w1_I1", char: "I", wordIdx: 1, letterKey: "I" },
  { id: "w1_G", char: "G", wordIdx: 1, letterKey: "G" },
  { id: "w1_I2", char: "I", wordIdx: 1, letterKey: "I" },
  { id: "w1_T", char: "T", wordIdx: 1, letterKey: "T" },
  { id: "w1_A", char: "A", wordIdx: 1, letterKey: "A" },
  { id: "w1_L", char: "L", wordIdx: 1, letterKey: "L" },
];

const INITIAL_LINE_2: LetterItem[] = [
  // PRODUCTS (word 2)
  { id: "w2_P", char: "P", wordIdx: 2, letterKey: "P" },
  { id: "w2_R", char: "R", wordIdx: 2, letterKey: "R" },
  { id: "w2_O", char: "O", wordIdx: 2, letterKey: "O" },
  { id: "w2_D", char: "D", wordIdx: 2, letterKey: "D" },
  { id: "w2_U", char: "U", wordIdx: 2, letterKey: "U" },
  { id: "w2_C", char: "C", wordIdx: 2, letterKey: "C" },
  { id: "w2_T", char: "T", wordIdx: 2, letterKey: "T" },
  { id: "w2_S", char: "S", wordIdx: 2, letterKey: "S" },
  { id: "w2_sp", char: " ", wordIdx: 2, letterKey: " " },
  // THAT (word 3)
  { id: "w3_T1", char: "T", wordIdx: 3, letterKey: "T" },
  { id: "w3_H", char: "H", wordIdx: 3, letterKey: "H" },
  { id: "w3_A", char: "A", wordIdx: 3, letterKey: "A" },
  { id: "w3_T2", char: "T", wordIdx: 3, letterKey: "T" },
];

const INITIAL_LINE_3: LetterItem[] = [
  // CONVERT (word 4)
  { id: "w4_C", char: "C", wordIdx: 4, letterKey: "C" },
  { id: "w4_O", char: "O", wordIdx: 4, letterKey: "O" },
  { id: "w4_N", char: "N", wordIdx: 4, letterKey: "N" },
  { id: "w4_V", char: "V", wordIdx: 4, letterKey: "V" },
  { id: "w4_E", char: "E", wordIdx: 4, letterKey: "E" },
  { id: "w4_R", char: "R", wordIdx: 4, letterKey: "R" },
  { id: "w4_T", char: "T", wordIdx: 4, letterKey: "T" },
  { id: "w4_sp1", char: " ", wordIdx: 4, letterKey: " " },
  // & (word 5)
  { id: "w5_AMP", char: "&", wordIdx: 5, letterKey: "&" },
  { id: "w5_sp2", char: " ", wordIdx: 5, letterKey: " " },
  // SCALE. (word 6)
  { id: "w6_S", char: "S", wordIdx: 6, letterKey: "S" },
  { id: "w6_C", char: "C", wordIdx: 6, letterKey: "C" },
  { id: "w6_A", char: "A", wordIdx: 6, letterKey: "A" },
  { id: "w6_L", char: "L", wordIdx: 6, letterKey: "L" },
  { id: "w6_E", char: "E", wordIdx: 6, letterKey: "E" },
  { id: "w6_DOT", char: ".", wordIdx: 6, letterKey: "." },
];

const INITIAL_SUB_LINE: LetterItem[] = [
  // UI/UX (word 7)
  { id: "w7_U1", char: "U", wordIdx: 7, letterKey: "U" },
  { id: "w7_I", char: "I", wordIdx: 7, letterKey: "I" },
  { id: "w7_SL", char: "/", wordIdx: 7, letterKey: "/" },
  { id: "w7_U2", char: "U", wordIdx: 7, letterKey: "U" },
  { id: "w7_X", char: "X", wordIdx: 7, letterKey: "X" },
  { id: "w7_sp1", char: " ", wordIdx: 7, letterKey: " " },
  // & (word 8)
  { id: "w8_AMP", char: "&", wordIdx: 8, letterKey: "&" },
  { id: "w8_sp2", char: " ", wordIdx: 8, letterKey: " " },
  // CS (word 9)
  { id: "w9_C", char: "C", wordIdx: 9, letterKey: "C" },
  { id: "w9_S", char: "S", wordIdx: 9, letterKey: "S" },
  { id: "w9_sp3", char: " ", wordIdx: 9, letterKey: " " },
  // ENGINEER (word 10)
  { id: "w10_E1", char: "E", wordIdx: 10, letterKey: "E" },
  { id: "w10_N1", char: "N", wordIdx: 10, letterKey: "N" },
  { id: "w10_G", char: "G", wordIdx: 10, letterKey: "G" },
  { id: "w10_I", char: "I", wordIdx: 10, letterKey: "I" },
  { id: "w10_N2", char: "N", wordIdx: 10, letterKey: "N" },
  { id: "w10_E2", char: "E", wordIdx: 10, letterKey: "E" },
  { id: "w10_E3", char: "E", wordIdx: 10, letterKey: "E" },
  { id: "w10_R", char: "R", wordIdx: 10, letterKey: "R" },
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

  // Random word dimming: at most 2 words dimmed at a time (indices 0..10, excluding UI/UX)
  const [dimmedWords, setDimmedWords] = useState<number[]>([]);

  // Active smooth gliding letter swap animation
  const [swapState, setSwapState] = useState<SwapAnimationState | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isUiUxRed, setIsUiUxRed] = useState(false);

  // Illuminate "UI/UX" in crimson red after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUiUxRed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const letterRefs = useRef<Map<string, HTMLElement>>(new Map());

  // 1. Ambient Random Word Dimming (Excluding word 7 "UI/UX" so it stays vibrantly red)
  useEffect(() => {
    const dimInterval = setInterval(() => {
      // Pick 1 or 2 distinct words from non-UI/UX words
      const eligibleWords = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10];
      const count = Math.random() > 0.4 ? 2 : 1;
      const first = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
      let second = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
      while (second === first) {
        second = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
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

  // 2. Kinetic Smooth Gliding Letter Position Exchange (Excluding UI/UX)
  useEffect(() => {
    const swapInterval = setInterval(() => {
      // If a swap is already animating, wait
      if (swapState) return;

      // Collect all current letters across lines (excluding wordIdx 7 "UI/UX")
      const allLetters = [...line1, ...line2, ...line3, ...subLine].filter(
        (item) => item.wordIdx !== 7
      );

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

      // Trigger the smooth gliding animation (no jumping)
      setSwapState({
        idA: itemA.id,
        idB: itemB.id,
        dx,
        dy,
      });

      // Complete swap in data and reset transform after glide trajectory finishes (1000ms)
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
      }, 1000);
    }, 4200);

    return () => clearInterval(swapInterval);
  }, [line1, line2, line3, subLine, swapState]);

  // Helper to render letter with kinetic glide, UI/UX red state, and word dimming
  const renderLetter = (item: LetterItem) => {
    if (item.char === " ") {
      return (
        <span key={item.id} style={{ display: "inline-block", width: "0.26em" }}>
          {" "}
        </span>
      );
    }

    const isUiUx = item.wordIdx === 7;
    const isDimmed = !isUiUx && dimmedWords.includes(item.wordIdx);
    const isSwappingA = swapState?.idA === item.id;
    const isSwappingB = swapState?.idB === item.id;

    let isSwapping = false;
    let customAnimation = "none";

    if (isSwappingA && swapState) {
      isSwapping = true;
      customAnimation = `smoothGlideA 1.0s cubic-bezier(0.65, 0, 0.35, 1) forwards`;
    } else if (isSwappingB && swapState) {
      isSwapping = true;
      customAnimation = `smoothGlideB 1.0s cubic-bezier(0.65, 0, 0.35, 1) forwards`;
    }

    let letterColor = "inherit";
    let letterTextShadow = "none";

    if (isUiUx && isUiUxRed) {
      letterColor = "var(--accent-uiux, #ff3b30)";
      letterTextShadow = "0 0 16px rgba(255, 59, 48, 0.45)";
    } else if (isSwapping) {
      letterColor = "var(--text-primary)";
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
          zIndex: isSwapping ? 30 : 1,
          opacity: isDimmed ? 0.3 : 1,
          animation: customAnimation,
          color: letterColor,
          textShadow: letterTextShadow,
          transition: isSwapping
            ? "none"
            : "color 0.8s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.8s ease, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          userSelect: "none",
          willChange: isSwapping ? "transform, opacity" : "auto",
        }}
      >
        {item.char}
      </span>
    );
  };

  // Group letters into whole words so words NEVER split across lines
  const renderWordGroups = (letters: LetterItem[]) => {
    const wordsMap = new Map<number, LetterItem[]>();
    letters.forEach((item) => {
      const list = wordsMap.get(item.wordIdx) || [];
      list.push(item);
      wordsMap.set(item.wordIdx, list);
    });

    return Array.from(wordsMap.entries()).map(([wordIdx, wordLetters]) => (
      <span
        key={`word_${wordIdx}`}
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          wordBreak: "keep-all",
          overflowWrap: "normal",
          flexShrink: 0,
          marginRight: "0.22em",
        }}
      >
        {wordLetters.map(renderLetter)}
      </span>
    ));
  };

  return (
    <header
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "center",
        minHeight: isMobile ? "105vh" : "clamp(80vh, 88vh, 920px)",
        padding: isMobile
          ? "0 clamp(1rem, 4vw, 2rem) 0"
          : "clamp(2rem, 4vw, 3rem) clamp(1rem, 5vw, 4rem)",
        background: "radial-gradient(ellipse 90% 50% at 50% 0%, var(--glow-active), transparent 75%)",
        boxSizing: "border-box",
      }}
    >
      {/* Main Massive Typography Header (Placed in Middle on Load, then Scrolls to Top and Sticks below top buttons until Picture Arrives) */}
      <div
        style={{
          position: isMobile ? "sticky" : "relative",
          top: isMobile ? "max(3.8rem, calc(env(safe-area-inset-top, 0px) + 2.8rem))" : "auto",
          zIndex: 4,
          paddingTop: isMobile ? "clamp(10vh, 14vh, 18vh)" : "clamp(1rem, 3vw, 2.5rem)",
          paddingBottom: isMobile ? "1rem" : "0",
          margin: isMobile ? "0" : "auto 0",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.4rem, 1.2vw, 1rem)",
        }}
      >
        {/* Massive Headline: CRAFTING DIGITAL / PRODUCTS THAT / CONVERT & SCALE. */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.8rem, 11.5vw, 150px)",
            fontWeight: 900,
            lineHeight: 0.86,
            letterSpacing: "-0.045em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            margin: 0,
            wordBreak: "keep-all",
            overflowWrap: "normal",
          }}
        >
          {/* Line 1: CRAFTING DIGITAL */}
          <div style={{ display: "flex", flexWrap: "wrap", rowGap: "0.08em" }}>{renderWordGroups(line1)}</div>

          {/* Line 2: PRODUCTS THAT */}
          <div style={{ display: "flex", flexWrap: "wrap", rowGap: "0.08em" }}>{renderWordGroups(line2)}</div>

          {/* Line 3: CONVERT & SCALE. */}
          <div style={{ display: "flex", flexWrap: "wrap", rowGap: "0.08em" }}>{renderWordGroups(line3)}</div>
        </h1>

        {/* Massive Sub-headline: UI/UX & CS ENGINEER */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.8rem, 7.5vw, 86px)",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            margin: 0,
            wordBreak: "keep-all",
            overflowWrap: "normal",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", rowGap: "0.08em" }}>{renderWordGroups(subLine)}</div>
        </h2>
      </div>

      {/* Dynamic Keyframe Injection for the Exact Smooth Glide Trajectories */}
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

        /* Kinetic Smooth Glide Letter Position Exchange (Straight glide, zero jump, zero rotation, zero scale pop) */
        @keyframes smoothGlideA {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(${swapState ? swapState.dx : 0}px, ${
              swapState ? swapState.dy : 0
            }px);
          }
        }

        @keyframes smoothGlideB {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(${swapState ? -swapState.dx : 0}px, ${
              swapState ? -swapState.dy : 0
            }px);
          }
        }

        @media (max-width: 640px) {
          #hero {
            min-height: 105vh !important;
            padding-bottom: 0 !important;
          }
          #hero h1 {
            font-size: clamp(2.75rem, 11.4vw, 4.3rem) !important;
            line-height: 0.87 !important;
            letter-spacing: -0.045em !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
          }
          #hero h2 {
            font-size: clamp(1.75rem, 7.4vw, 2.7rem) !important;
            line-height: 0.9 !important;
            letter-spacing: -0.04em !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
          }
        }
      `}</style>
    </header>
  );
}
