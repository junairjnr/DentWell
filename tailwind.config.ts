import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wall: "#F8F6F2",
        paper: "#FBF9F6",
        ivory: "#F8F6F2",
        cream: "#F3EEE6",
        oak: "#C6B08A",
        "oak-deep": "#8C7358",
        gold: "#C6A66B",
        "gold-deep": "#8C6E32",
        champagne: "#C6A66B",
        sage: "#DCE8E3",
        "sage-deep": "#9BB5AB",
        slate: "#202A2B",
        charcoal: "#202A2B",
        ink: "#1A1816",
        aqua: "#7AD4F0",
        lamp: "#F7FBFF",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-sora)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        editorial: [
          "var(--font-display)",
          "var(--font-sora)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        lift: "0 18px 40px -24px rgba(26, 24, 22, 0.45)",
        header: "0 10px 30px -22px rgba(26, 24, 22, 0.55)",
        glow: "0 24px 60px -28px rgba(198, 166, 107, 0.45)",
        depth: "0 40px 80px -40px rgba(32, 42, 43, 0.55)",
      },
      maxWidth: {
        page: "76rem",
      },
      backgroundImage: {
        "cream-wash":
          "radial-gradient(120% 80% at 100% -10%, rgba(198, 166, 107, 0.22), transparent 55%), radial-gradient(90% 60% at -10% 30%, rgba(220, 232, 227, 0.55), transparent 50%), #F8F6F2",
        "sage-band": "linear-gradient(135deg, #DCE8E3 0%, #F8F6F2 55%, #F3EEE6 100%)",
        "charcoal-veil": "linear-gradient(180deg, rgba(32,42,43,0.08) 0%, rgba(32,42,43,0.55) 100%)",
      },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
