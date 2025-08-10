"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "">(() => {
    if (typeof window === "undefined") return "";
    return (localStorage.getItem("theme") as "light" | "dark" | "") || "";
  });

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  return (
    <button
      className="btn"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light" : "Dark"} mode
    </button>
  );
}
