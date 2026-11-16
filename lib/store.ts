"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Draft = {
  step: 1 | 2 | 3 | 4;
  treatment: string;
  date: string | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
  setDraft: (patch: Partial<Omit<Draft, "setDraft" | "reset">>) => void;
  reset: () => void;
};

const initial = {
  step: 1 as const,
  treatment: "",
  date: null,
  time: null,
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export const useBookingDraft = create<Draft>()(
  persist(
    (set) => ({
      ...initial,
      setDraft: (patch) => set(patch),
      reset: () => set(initial),
    }),
    {
      name: "dentwell-booking",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        step: state.step,
        treatment: state.treatment,
        date: state.date,
        time: state.time,
        name: state.name,
        phone: state.phone,
        email: state.email,
        notes: state.notes,
      }),
    },
  ),
);

type UiState = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));
