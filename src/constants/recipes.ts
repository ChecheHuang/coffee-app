import type { Recipe } from "../types";

/** 預設配方列表 — 對應 PRD 3.2 */
export const INITIAL_RECIPES: ReadonlyArray<Recipe> = [
  {
    id: "recipe-1",
    name: "早安濃縮",
    drinkId: "espresso",
    params: {
      temperature: 93,
      intensity: 4,
      volume: 30,
      grindLevel: 2,
      milkFoam: 0,
    },
    isFavorite: true,
    lastUsedAt: "2026-04-16T09:15:00",
    createdAt: "2026-03-15",
  },
  {
    id: "recipe-2",
    name: "午後拿鐵",
    drinkId: "latte",
    params: {
      temperature: 90,
      intensity: 3,
      volume: 240,
      grindLevel: 3,
      milkFoam: 80,
    },
    isFavorite: true,
    lastUsedAt: "2026-04-15T14:30:00",
    createdAt: "2026-03-18",
  },
  {
    id: "recipe-3",
    name: "週末摩卡",
    drinkId: "mocha",
    params: {
      temperature: 88,
      intensity: 3,
      volume: 240,
      grindLevel: 3,
      milkFoam: 50,
    },
    isFavorite: false,
    lastUsedAt: "2026-04-13T10:00:00",
    createdAt: "2026-03-20",
  },
];
