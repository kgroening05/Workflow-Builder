import { create } from "zustand";

type UIState = {
  activePanel: "config" | "results";
  setActivePanel: (panel: "config" | "results") => void;
};

export const useUIStore = create<UIState>((set) => ({
  activePanel: "config", // or "results"
  setActivePanel: (panel) => set({ activePanel: panel }),
}));