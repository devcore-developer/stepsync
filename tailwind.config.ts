import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#065594",
          50: "#E6F0FA",
          100: "#CCE2F3",
          200: "#99C5E7",
          300: "#66A8DB",
          400: "#338BCF",
          500: "#065594",
          600: "#05447A",
          700: "#04335B",
          800: "#02223D",
          900: "#01111E",
        },
        navy: {
          DEFAULT: "#0F3A72",
          50: "#E6EDF6",
          100: "#C2D1E3",
          200: "#85A3C8",
          300: "#4875AD",
          400: "#244D8C",
          500: "#0F3A72",
          600: "#0C2E5B",
          700: "#092344",
          800: "#06172D",
          900: "#030C17",
        },
        accent: {
          red: {
            DEFAULT: "#D81734",
            dark: "#A41C2F",
            50: "#FCE8EB",
            100: "#F9CDD4",
            500: "#D81734",
            600: "#A41C2F",
            700: "#820E1F",
          },
          gold: {
            DEFAULT: "#F0B758",
            dark: "#D3A14A",
            50: "#FDF5E8",
            100: "#FAE6C2",
            500: "#F0B758",
            600: "#D3A14A",
            700: "#A77A34",
          },
        },
        surface: {
          page: "#F5F7FA",
          subtle: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#F1F5F9",
        },
        ink: {
          DEFAULT: "#140C0D",
          secondary: "#475569",
          tertiary: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "0.875rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)",
        "card-hover": "0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.05)",
        nav: "0 4px 16px -4px rgba(15, 58, 114, 0.25)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.25s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;