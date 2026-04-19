import { create } from "zustand";
import type { User } from "../types/user";

const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

const DEFAULT_USER: User = {
  id: "user-default",
  name: "Bennett",
  avatarUrl: undefined,
  level: "connoisseur",
  totalBrews: 248,
  createdAt: new Date("2025-06-01").toISOString(),
};

interface UserStore {
  members: ReadonlyArray<User>;
  currentUserId: string;
  getCurrentUser: () => User;
  addMember: (
    member: Omit<User, "id" | "createdAt" | "level" | "totalBrews">
  ) => void;
  updateMember: (id: string, patch: Partial<User>) => void;
  removeMember: (id: string) => void;
  updateName: (name: string) => void;
  updateAvatar: (avatarUrl: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  members: [DEFAULT_USER],
  currentUserId: DEFAULT_USER.id,

  getCurrentUser: () => {
    const { members, currentUserId } = get();
    return members.find((m) => m.id === currentUserId) ?? members[0];
  },

  addMember: (member) => {
    const { members } = get();
    if (members.length >= 6) return;
    const newMember: User = {
      ...member,
      id: genId(),
      level: "beginner",
      totalBrews: 0,
      createdAt: new Date().toISOString(),
    };
    set({ members: [...members, newMember] });
  },

  updateMember: (id, patch) =>
    set((state) => ({
      members: state.members.map((m) =>
        m.id === id ? { ...m, ...patch } : m
      ),
    })),

  removeMember: (id) =>
    set((state) => {
      if (id === state.currentUserId) return state;
      return { members: state.members.filter((m) => m.id !== id) };
    }),

  updateName: (name) => {
    const { currentUserId, updateMember } = get();
    updateMember(currentUserId, { name });
  },

  updateAvatar: (avatarUrl) => {
    const { currentUserId, updateMember } = get();
    updateMember(currentUserId, { avatarUrl });
  },
}));
