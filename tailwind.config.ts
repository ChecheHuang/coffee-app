import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 背景層次
        bg: {
          primary: "#1A1A1C",
          card: "#242426",
          expanded: "#2A2A2C",
        },
        // 金色系
        gold: {
          DEFAULT: "#C9A962",
          deep: "#8B7845",
        },
        // 文字
        text: {
          primary: "#F5F5F0",
          secondary: "#6E6E70",
          tertiary: "#4A4A4C",
        },
        // 邊框
        border: {
          DEFAULT: "#3A3A3C",
          divider: "#2A2A2C",
        },
        // 語意
        success: "#6E9E6E",
        warning: "#FF9800",
        error: "#E53935",
      },
      fontFamily: {
        display: ["CormorantGaramond_400Regular"],
        "display-medium": ["CormorantGaramond_500Medium"],
        "display-light": ["CormorantGaramond_300Light"],
        body: ["Inter_400Regular"],
        "body-medium": ["Inter_500Medium"],
        "body-semibold": ["Inter_600SemiBold"],
      },
      borderRadius: {
        sm: "4px",
        md: "16px",
        lg: "20px",
        xl: "26px",
        card: "20px",
        pill: "34px",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "content-padding": "28px",
        "section-gap": "40px",
      },
    },
  },
  plugins: [],
};

export default config;
