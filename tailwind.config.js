/** @type {import('tailwindcss').Config} */

const { heroui, colors } = require("@heroui/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            primary: {
              DEFAULT: "rgb(68, 76, 231)",
              50: "#eef4ff",
              100: "#e0eaff",
              200: "#c6d8ff",
              300: "#a4bcfd",
              400: "#8098f9",
              500: "#6173f3",
              600: "#444ce7",
              700: "#363bcc",
              800: "#2f34a4",
              900: "#2d3382",
              950: "#1a1c4c",
              foreground: "rgb(255, 255, 255)",
            },
          },
        },
      },
    }),
  ],
};
