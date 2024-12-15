/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "2px",
          medium: "4px",
          large: "8px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#97c5bf",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
}
