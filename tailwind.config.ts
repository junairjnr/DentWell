import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wall: "#F4F1EC",
        paper: "#FBF9F6",
        oak: "#C6B08A",
        "oak-deep": "#8C7358",
        gold: "#C4A15A",
        "gold-deep": "#8C6E32",
        slate: "#2C3A44",
        ink: "#1A1816",
        aqua: "#7AD4F0",
        lamp: "#F7FBFF",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lift: "0 18px 40px -24px rgba(26, 24, 22, 0.45)",
        header: "0 10px 30px -22px rgba(26, 24, 22, 0.55)",
      },
      maxWidth: {
        page: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
