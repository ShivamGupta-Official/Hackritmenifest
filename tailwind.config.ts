import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vanilla: {
          high: "var(--text-vanilla-high)",
          body: "var(--text-vanilla-body)",
          muted: "var(--text-vanilla-muted)",
          subtle: "var(--text-vanilla-subtle)",
        },
        status: {
          emerald: {
            text: "var(--status-emerald-text)",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
