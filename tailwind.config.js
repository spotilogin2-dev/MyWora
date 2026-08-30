/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0D153F",
        brand: {
          50: "#EEF4FE",
          100: "#DCE7FD",
          200: "#B9CDFB",
          300: "#8AADF8",
          400: "#4B7FF1",
          500: "#1455E8",
          600: "#1046C6",
          700: "#0D389E",
          800: "#0A2A75",
          900: "#081F56",
          DEFAULT: "#1455E8",
        },
        accent: {
          50: "#FFF1EA",
          100: "#FFE1D3",
          200: "#FFC3A7",
          400: "#FF8A5C",
          500: "#FF6A32",
          600: "#EF5420",
          700: "#C94312",
          DEFAULT: "#FF6A32",
        },
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          DEFAULT: "#10B981",
        },
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          DEFAULT: "#EF4444",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
          DEFAULT: "#F59E0B",
        },
        mist: "#E9EEF0",
        cream: "#F7F3EA",
        page: "#F7F8FA",
      },
      fontFamily: {
        sans: [
          '"Manrope Variable"',
          "Manrope",
          "Inter",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(13, 21, 63, 0.04), 0 8px 24px -12px rgba(13, 21, 63, 0.12)",
        float: "0 24px 60px -24px rgba(13, 21, 63, 0.28), 0 4px 16px -8px rgba(13, 21, 63, 0.10)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
