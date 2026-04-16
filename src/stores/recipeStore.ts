import { create } from "zustand";
import type { Recipe, BrewParams } from "../types";
import { INITIAL_RECIPES } from "../constants/recipes";

interface RecipeStore {
  recipes: Recipe[];
  addRecipe: (
    recipe: Omit<Recipe, "id" | "createdAt">,
  ) => void;
  updateRecipe: (id: string, updates: Partial<Omit<Recipe, "id">>) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [...INITIAL_RECIPES],

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        {
          ...recipe,
          id: `recipe-${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ],
    })),

  updateRecipe: (id, updates) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, ...updates } : r,
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r,
      ),
    })),
}));
