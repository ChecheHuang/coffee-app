export interface Drink {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly category: DrinkCategory;
  readonly color: string;
  readonly defaultParams: BrewParams;
  readonly hasMilk: boolean;
}

export type DrinkCategory = "espresso" | "milk" | "specialty" | "iced";

export interface BrewParams {
  readonly temperature: number; // 85-96°C
  readonly intensity: number; // 1-5
  readonly volume: number; // 25-350ml
  readonly grindLevel: number; // 1-5
  readonly milkFoam: number; // 0-100%
}
