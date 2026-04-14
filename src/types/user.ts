export interface User {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl?: string;
  readonly level: CoffeeLevel;
  readonly totalBrews: number;
  readonly createdAt: string;
}

export type CoffeeLevel =
  | "beginner"
  | "enthusiast"
  | "connoisseur"
  | "master"
  | "legend";

export const LEVEL_NAMES: Record<CoffeeLevel, string> = {
  beginner: "新手",
  enthusiast: "愛好者",
  connoisseur: "鑑賞家",
  master: "大師",
  legend: "傳奇",
};
