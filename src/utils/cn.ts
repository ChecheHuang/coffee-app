import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** 合併 TailwindCSS 類別名稱，處理衝突 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
