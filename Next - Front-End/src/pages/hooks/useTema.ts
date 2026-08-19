import { useState, useEffect } from "react";

export function useTema() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const temaSalvo = localStorage.getItem("theme");
    const prefereDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (temaSalvo === "dark" || (!temaSalvo && prefereDark)) {
      root.classList.add("darkmode");
      setIsDark(true);
    } else {
      root.classList.remove("darkmode");
      setIsDark(false);
    }
  }, []);

  const alternarTema = () => {
    const root = document.documentElement;
    const proximoTemaDark = !root.classList.contains("darkmode");

    if (proximoTemaDark) {
      root.classList.add("darkmode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("darkmode");
      localStorage.setItem("theme", "light");
    }

    setIsDark(proximoTemaDark);
  };

  return { isDark, alternarTema };
}
