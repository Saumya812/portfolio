/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Pastels for backgrounds, highlights, and accents
        lavender: "#C8A2C8",   // soft purple
        powderBlue: "#A2C8F4", // soft blue
        mint: "#A2F4C8",        // soft green
        peach: "#F4C8A2",       // soft peach

        // Neutral / Text Colors
        charcoal: "#333333",    // main body text
        gray500: "#666666",     // secondary text
        lightGray: "#D9D9D9",   // subtle borders / dividers
        softWhite: "#FDFDFD",   // backgrounds
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};







import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
