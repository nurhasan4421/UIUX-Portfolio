"use client";

export type AppTheme = "dark" | "light";

export function getStoredTheme(): AppTheme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("nurhasan_theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {}
  return "dark";
}

export function applyThemeToDOM(theme: AppTheme) {
  if (typeof document === "undefined") return;
  try {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.dataset.theme = theme;
    if (document.body) {
      document.body.setAttribute("data-theme", theme);
      document.body.dataset.theme = theme;
    }

    if (theme === "light") {
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

    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("nurhasan_theme", theme);
  } catch (e) {
    console.error("Failed to apply theme to DOM:", e);
  }
}

export function broadcastThemeChange(theme: AppTheme) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("nurhasan_theme_change", { detail: theme }));
  } catch (e) {}
}
