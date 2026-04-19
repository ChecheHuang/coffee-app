import { create } from "zustand";
import type { Schedule } from "../types/schedule";

const INITIAL_SCHEDULES: Schedule[] = [
  {
    id: "schedule-1",
    name: "早晨咖啡",
    drinkId: "espresso",
    time: "07:30",
    days: [1, 2, 3, 4, 5],
    temperature: 93,
    isEnabled: true,
  },
  {
    id: "schedule-2",
    name: "午後拿鐵",
    drinkId: "latte",
    time: "14:00",
    days: [1, 2, 3, 4, 5],
    temperature: 90,
    isEnabled: true,
  },
];

interface ScheduleStore {
  schedules: ReadonlyArray<Schedule>;
  addSchedule: (input: Omit<Schedule, "id">) => void;
  updateSchedule: (id: string, patch: Partial<Schedule>) => void;
  removeSchedule: (id: string) => void;
  toggleEnabled: (id: string) => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: INITIAL_SCHEDULES,

  addSchedule: (input) =>
    set((state) => ({
      schedules: [
        { ...input, id: `schedule-${Date.now()}` },
        ...state.schedules,
      ],
    })),

  updateSchedule: (id, patch) =>
    set((state) => ({
      schedules: state.schedules.map((s) =>
        s.id === id ? { ...s, ...patch } : s,
      ),
    })),

  removeSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((s) => s.id !== id),
    })),

  toggleEnabled: (id) =>
    set((state) => ({
      schedules: state.schedules.map((s) =>
        s.id === id ? { ...s, isEnabled: !s.isEnabled } : s,
      ),
    })),
}));
