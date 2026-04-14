import type { BrewParams } from "./drink";

export interface Recipe {
  readonly id: string;
  readonly name: string;
  readonly drinkId: string;
  readonly params: BrewParams;
  readonly isFavorite: boolean;
  readonly lastUsedAt?: string;
  readonly createdAt: string;
}
