export interface PresetAvatar {
  readonly id: string;
  readonly icon: "Smile" | "Cat" | "Dog" | "Coffee" | "Leaf" | "Flame";
  readonly label: string;
}

export const PRESET_AVATARS: ReadonlyArray<PresetAvatar> = [
  { id: "smile", icon: "Smile", label: "笑臉" },
  { id: "cat", icon: "Cat", label: "貓咪" },
  { id: "dog", icon: "Dog", label: "狗狗" },
  { id: "coffee", icon: "Coffee", label: "咖啡" },
  { id: "leaf", icon: "Leaf", label: "葉子" },
  { id: "flame", icon: "Flame", label: "火焰" },
];

export const DEFAULT_AVATAR_ID: string = "smile";
