import { useEffect } from "react";
import { Themes } from "../../ts/types";

export const useSetTheme = () => {
  useEffect(() => {
    if (localStorage.theme) {
      if (
        JSON.parse(localStorage.theme).type === Themes.Dark ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        window.document.documentElement.classList.add(Themes.Dark);
      } else {
        window.document.documentElement.classList.remove(Themes.Dark);
      }
    } else {
      localStorage.setItem(
        "theme",
        JSON.stringify({
          type: "light",
          enabled: false,
        })
      );
    }
  }, []);
};
