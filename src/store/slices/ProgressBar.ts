import { StateCreator } from "zustand";

const progressBarSlice: StateCreator<progressBarType> = (set) => ({
  progressBarValue: "0",
  setProgressBarValue: (value) => set({ progressBarValue: value }),
  progressBarMax: "0",
  setProgressBarMax: (value) => set({ progressBarMax: value }),
  currentProgressColor: "#737373",
  setCurrentProgressColor: (value) => set({ currentProgressColor: value }),
});

export default progressBarSlice;

export type progressBarType = {
  progressBarValue: string;
  setProgressBarValue: (value: string) => void;
  progressBarMax: string;
  setProgressBarMax: (value: string) => void;
  currentProgressColor: string;
  setCurrentProgressColor: (value: string) => void;
};
