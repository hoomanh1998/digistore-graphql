import { useState, useEffect } from "react";

export const useMediaQuery = () => {
  const [windowSize, setWindowSize] = useState({
    isSmall: window.innerWidth < 640,
    isMobile: window.innerWidth < 768,
    isLarge: window.innerWidth < 1024,
  });

  useEffect(() => {
    function updateIsMobile() {
      setWindowSize({
        isSmall: window.innerWidth < 640,
        isMobile: window.innerWidth < 768,
        isLarge: window.innerWidth < 1024,
      });
    }
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);
  return windowSize;
};

// import { useEffect, useState } from "react";

// export const useMediaQuery = (query: string = "(max-width: 640px)") => {
//   const [matches, setMatches] = useState(window.matchMedia(query).matches);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia(query);
//     const handleChange = (event: MediaQueryListEvent) => {
//       setMatches(event.matches);
//     };
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [query]);

//   return matches;
// };

