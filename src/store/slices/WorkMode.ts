import { StateCreator } from "zustand";
import padTime from "../../utils/PadNum";
import convertMinSecToSec from "../../utils/convertMinSecToSec";

const workSlice: StateCreator<workType> = (set, get) => ({
  WorkMinutes: "00",
  increaseWorkMinutes: () => set((state) => ({ WorkMinutes: padTime(Number(state.WorkMinutes) + 1) })),
  decreaseWorkMinutes: () => set((state) => ({ WorkMinutes: padTime(Math.max(Number(state.WorkMinutes) - 1, 0)) })),
  setWorkMinutes: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ WorkMinutes: newValue });
  },
  WorkSeconds: "10",
  increaseWorkSeconds: () => set((state) => ({ WorkSeconds: padTime(Number(state.WorkSeconds) + 1) })),
  decreaseWorkSeconds: () => set((state) => ({ WorkSeconds: padTime(Math.max(Number(state.WorkSeconds) - 1, 0)) })),
  setWorkSeconds: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ WorkSeconds: newValue });
  },
  WorkColor: "#00993B",
  setWorkColor: (value) => set({ WorkColor: value }),
  getWorkFullTime: () => {
    return `${get().WorkMinutes}:${get().WorkSeconds}`;
  },
  getWorkFullTimeInSeconds: () => {
    return Number(convertMinSecToSec(get().getWorkFullTime()));
  },
});

export default workSlice;

export type workType = {
  WorkMinutes: string;
  increaseWorkMinutes: () => void;
  decreaseWorkMinutes: () => void;
  setWorkMinutes: (value: string) => void;
  WorkSeconds: string;
  increaseWorkSeconds: () => void;
  decreaseWorkSeconds: () => void;
  setWorkSeconds: (value: string) => void;
  WorkColor: string;
  setWorkColor: (value: string) => void;
  getWorkFullTime: () => string;
  getWorkFullTimeInSeconds: () => number;
};
