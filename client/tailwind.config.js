const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    boxShadow: {
      "inner-sidebar-dark": "inset -6px 2px 10px -10px rgba(0, 0, 0, 0.7)",
      "inner-sidebar-light": "inset -6px 2px 10px -10px rgba(0, 0, 0, 0.4)",
      ...defaultTheme.boxShadow,
    },
    fontSize: {
      "1xl": "1.375rem",
      ...defaultTheme.fontSize,
    },
    minWidth: {
      28: "7rem",
      32: "8rem",
      56: "14rem",
      80: "20rem",
      ...defaultTheme.minWidth,
    },
    minHeight: {
      18: "4.5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      ...defaultTheme.minHeight,
    },
    screens: {
      xxs: "322px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    fill: (theme) => ({
      white: theme("colors.white"),
      red: theme("colors.red.500"),
      green: theme("colors.green.500"),
      blue: theme("colors.blue.500"),
    }),
    stroke: (theme) => ({
      red: theme("colors.red.500"),
      green: theme("colors.green.500"),
      "light-blue": theme("colors.blue.400"),
      "dark-blue": theme("colors.blue.500"),
      white: theme("colors.white"),
      "light-gray": theme("colors.gray.100"),
      "dark-gray": theme("colors.gray.400"),
      black: theme("colors.black"),
    }),
    backgroundSize: {
      "50%": "50%",
      16: "4rem",
      ...defaultTheme.backgroundSize,
    },
    extend: {
      blur: {
        xs: "2px",
      },
      backdropContrast: {
        25: ".25",
      },
      boxShadow: {
        lg: "0px 3px 15px -2px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        sans: ["Nunito", "Helvetica", "Arial", "sans-serif"],
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      translate: {
        4.5: "1.125rem",
        5.5: "1.375rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        46: "11.5rem",
        114: "26rem",
        120: "30rem",
        150: "37.5rem",
        160: "40rem",
        180: "45rem",
        main: "calc(100% - 4.5rem)",
        "safe-inset-top": "env(safe-area-inset-top)",
        "safe-inset-right": "env(safe-area-inset-right)",
        "safe-inset-bottom": "calc(1rem + env(safe-area-inset-bottom))",
        "safe-inset-left": "env(safe-area-inset-left)",
        navbar: "calc(0.5rem + env(safe-area-inset-bottom))",
        "navbar-height": "calc(4rem + env(safe-area-inset-bottom))",
        "fixed-button": "calc(5rem + env(safe-area-inset-bottom))",
        "scroll-top-button": "calc(4.5rem + env(safe-area-inset-bottom))",
      },
      transitionProperty: {
        width: "width",
        height: "height",
        "background-color": "background-color, fill",
        positions: "top, right, bottom, left",
        badge: "right, top, opacity",
        spacing: "margin, padding",
        navbar: "background-color, transform",
        "navigation-items": "width, opacity, margin, padding, transform",
        "cart-item": "max-height, margin, opacity",
      },
      transitionDuration: {
        1000: "1000ms",
        2000: "2000ms",
        3000: "3000ms",
      },
      scale: {
        98: "0.98",
        102: "1.02",
      },
      minHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      keyframes: {
        transparent: {
          "0%": { backgroundColor: "rgb(156, 163, 175, 1)" },
          "100%": { backgroundColor: "rgb(243, 244, 246, 1)" },
        },
        "transparent-dark": {
          "0%": { backgroundColor: "rgb(209, 213, 219, 1)" },
          "100%": { backgroundColor: "rgb(55, 65, 81, 1)" },
        },
        "badge-full": {
          "0%": { opacity: 0, right: "0.75rem" },
          "20%": { opacity: 0, right: "0.75rem" },
          "100%": { opacity: 100, right: "0.75rem" },
        },
        "badge-min": {
          "0%": { opacity: 0, right: "-0.25rem", top: "-0.25rem" },
          "20%": { opacity: 0, right: "-0.25rem", top: "-0.25rem" },
          "100%": { opacity: 100, right: "-0.25rem", top: "-0.25rem" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        disappear: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        scale: {
          "0%": { transform: "scale(1.0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1.0)" },
        },
      },
      animation: {
        transparent: "transparent .5s ease-in-out forwards",
        "transparent-dark": "transparent-dark .5s ease-in-out forwards",
        "badge-full": "badge-full .5s ease-in-out forwards",
        "badge-min": "badge-min .5s ease-in-out forwards",
        shimmer: "shimmer 1s ease-in-out infinite",
        disappear: "disappear .15s ease-in-out forwards",
        appear: "appear .15s ease-in-out forwards",
        scale: "scale .1s ease-in-out forwards",
        "pulse-fast": "pulse 1s infinite",
      },
      inset: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "group-hover", "dark"],
      borderWidth: ["disabled", "last", "first"],
      backgroundColor: ["active", "disabled"],
      backdropBrightness: ["dark"],
      backgroundOpacity: ["disabled"],
      boxShadow: ["dark"],
      cursor: ["disabled"],
      display: ["group-hover", "active"],
      fill: ["dark"],
      opacity: ["disabled"],
      margin: ["last", "first", "odd", "even"],
      padding: ["last", "first", "odd", "even"],
      scale: ["active"],
      translate: ["active"],
      transitionProperty: ["hover", "focus", "active"],
      transitionDelay: ["group-hover"],
      textOpacity: ["disabled"],
      textColor: ["disabled"],
      stroke: ["dark"],
      width: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
