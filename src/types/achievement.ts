export interface Achievement {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly isUnlocked: boolean;
  readonly unlockedAt?: string;
  readonly category: "badge" | "milestone";
}

export interface Milestone {
  readonly id: string;
  readonly title: string;
  readonly target: number;
  readonly current: number;
  readonly completedAt?: string;
}
