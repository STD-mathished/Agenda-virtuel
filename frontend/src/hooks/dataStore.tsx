// hooks/dataStore.ts (ou useDateStore.ts)
import { create } from 'zustand';

type DateState = {
  date: Date | null;
  setDate: (value: Date | string | number | null | undefined) => void;
  setToday: () => void;
  resetDate: () => void;
  getDate: () => Date | null;
};

export const useDateStore = create<DateState>((set, get) => ({
  date: null,

  setDate: (value) => {
    if (value === null || value === undefined) {
      set({ date: null });
      return;
    }
    const next = value instanceof Date ? value : new Date(value);
    set({ date: next });
  },

  setToday: () => set({ date: new Date() }),
  resetDate: () => set({ date: null }),
  getDate: () => get().date,
}));
