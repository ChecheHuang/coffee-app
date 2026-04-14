export interface Schedule {
  readonly id: string;
  readonly name: string;
  readonly drinkId: string;
  readonly time: string; // HH:mm
  readonly days: ReadonlyArray<number>; // 0=日, 1=一, ..., 6=六
  readonly isEnabled: boolean;
  readonly temperature?: number;
}
