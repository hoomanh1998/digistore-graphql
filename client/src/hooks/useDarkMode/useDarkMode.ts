import { useState, useEffect } from "react";
import { Theme as ThemeType, Themes } from "../../ts/types";

export const useDarkMode = () => {
  let currentTheme = null;
  if (localStorage.theme) {
    currentTheme = JSON.parse(localStorage.theme);
  } else {
    currentTheme = { type: Themes.Light, enabled: false };
  }
  const [theme, setTheme] = useState<ThemeType>(currentTheme);
  const colorTheme = theme.type === Themes.Dark ? Themes.Light : Themes.Dark;
  const isEnabled = theme.type === Themes.Dark ? false : true;
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme.type);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme, colorTheme]);
  return { colorTheme, isEnabled, setTheme };
};
