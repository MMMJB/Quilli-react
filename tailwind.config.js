/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "salmon": "#FEECE2",
        "salmon-lgt": "#FEF3ED",
        "brand": "#309BA0",
        "brand-lgt": "#43CEA2",
        "brand-dark": "#185A9D",
        "gray-border": "#DADCE0",
        "gray-icon": "#AFB1B2",
        // Text colors
        "home": "#665E5A",
        "home-lgt": "#B2A8A3",
        "editor": "#404040",
        "editor-lgt": "#5F6366"
      },
      keyframes: {
        "cta": {
          "from": {"-webkit-mask-position": "0 0", "mask-position": "0 0"},
          "to": {"-webkit-mask-position": "100% 0", "mask-position": "100% 0"}
        },
        "cta-rev": {
          "from": {"-webkit-mask-position": "100% 0", "mask-position": "100% 0"},
          "to": {"-webkit-mask-position": "0 0", "mask-position": "0 0"}
        }
      },
      animation: {
        "cta": "cta 700ms steps(29) forwards",
        "cta-rev": "cta-rev 700ms steps(29) forwards"
      }
    },
    fontFamily: {
      "display": ["Gilda Display", "serif"],
      "logo": ["Cinzel", "serif"],
      "script": ["Kaushan Script", "cursive"],
      "sans": ["Open Sans", "sans-serif"],
      "roboto": ["Roboto", "sans-serif"]
    },
  },
  plugins: [],
}

