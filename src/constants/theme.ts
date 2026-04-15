// BrewMaster Pro 設計 Token — 對應 Pencil 設計稿

export const colors = {
  // 背景層次
  background: "#1A1A1C",
  card: "#242426",
  expanded: "#2A2A2C",

  // 金色系
  gold: "#C9A962",
  goldDeep: "#8B7845",

  // 文字
  textPrimary: "#F5F5F0",
  textSecondary: "#6E6E70",
  textTertiary: "#4A4A4C",

  // 邊框
  border: "#3A3A3C",
  divider: "#2A2A2C",

  // 語意色彩
  success: "#6E9E6E",
  warning: "#FF9800",
  error: "#E53935",

  // 飲品識別色
  drink: {
    espresso: "#3E2723",
    americano: "#5D4037",
    latte: "#8B7355",
    cappuccino: "#7B6B5E",
    flatWhite: "#6B5D52",
    mocha: "#4E342E",
  },
} as const;

export const fonts = {
  display: "CormorantGaramond",
  displayMedium: "CormorantGaramond_500Medium",
  displayLight: "CormorantGaramond_300Light",
  body: "Inter",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 40,
  contentPadding: 28,
  sectionGap: 40,
} as const;

export const radius = {
  sm: 4,
  md: 16,
  lg: 20,
  xl: 26,
  pill: 34,
  full: 9999,
} as const;

// Tab Bar 設定
export const tabBar = {
  height: 62,
  pillRadius: 34,
  itemRadius: 26,
  iconSize: 18,
  labelSize: 10,
  padding: { top: 12, right: 21, bottom: 21, left: 21 },
} as const;

// 螢幕尺寸參考（iPhone 標準）
export const screen = {
  width: 402,
  minHeight: 874,
  statusBarHeight: 62,
} as const;
