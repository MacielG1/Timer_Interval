import { StateCreator } from "zustand";
import padTime from "../../utils/PadNum";
import convertMinSecToSec from "../../utils/convertMinSecToSec";

const restSlice: StateCreator<restType> = (set, get) => ({
  RestMinutes: "00",
  increaseRestMinutes: () => set((state) => ({ RestMinutes: padTime(Number(state.RestMinutes) + 1) })),
  decreaseRestMinutes: () => set((state) => ({ RestMinutes: padTime(Math.max(Number(state.RestMinutes) - 1, 0)) })),
  setRestMinutes: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ RestMinutes: newValue });
  },
  RestSeconds: "10",
  increaseRestSeconds: () => set((state) => ({ RestSeconds: padTime(Number(state.RestSeconds) + 1) })),
  decreaseRestSeconds: () => set((state) => ({ RestSeconds: padTime(Math.max(Number(state.RestSeconds) - 1, 0)) })),
  setRestSeconds: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ RestSeconds: newValue });
  },

  RestColor: "#DB0000",
  setRestColor: (value) => set({ RestColor: value }),
  getRestFullTimeInSeconds: () => {
    return convertMinSecToSec(`${get().RestMinutes}:${get().RestSeconds}`);
  },
});

export default restSlice;

export type restType = {
  RestMinutes: string;
  increaseRestMinutes: () => void;
  decreaseRestMinutes: () => void;
  setRestMinutes: (value: string) => void;
  RestSeconds: string;
  increaseRestSeconds: () => void;
  decreaseRestSeconds: () => void;
  setRestSeconds: (value: string) => void;
  RestColor: string;
  setRestColor: (value: string) => void;
  getRestFullTimeInSeconds: () => string;
};
