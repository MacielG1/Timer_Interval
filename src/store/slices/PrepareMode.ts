import padTime from "../../utils/PadNum";
import convertMinSecToSec from "../../utils/convertMinSecToSec";
import { StateCreator } from "zustand";

const prepareSlice: StateCreator<prepareType> = (set, get) => ({
  PrepareMinutes: "00",
  increasePrepareMinutes: () => set((state) => ({ PrepareMinutes: padTime(Number(state.PrepareMinutes) + 1) })),
  decreasePrepareMinutes: () => set((state) => ({ PrepareMinutes: padTime(Math.max(Number(state.PrepareMinutes) - 1, 0)) })),
  setPrepareMinutes: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ PrepareMinutes: newValue });
  },
  PrepareSeconds: "03",
  increasePrepareSeconds: () => set((state) => ({ PrepareSeconds: padTime(Number(state.PrepareSeconds) + 1) })),
  decreasePrepareSeconds: () => set((state) => ({ PrepareSeconds: padTime(Math.max(Number(state.PrepareSeconds) - 1, 0)) })),
  setPrepareSeconds: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ PrepareSeconds: newValue });
  },

  PrepColor: "#2f498a",
  setPrepColor: (value) => set({ PrepColor: value }),

  getPrepareFullTimeInSeconds: () => {
    return convertMinSecToSec(`${get().PrepareMinutes}:${get().PrepareSeconds}`);
  },
});

export default prepareSlice;

export type prepareType = {
  PrepareMinutes: string;
  increasePrepareMinutes: () => void;
  decreasePrepareMinutes: () => void;
  setPrepareMinutes: (value: string) => void;
  PrepareSeconds: string;
  increasePrepareSeconds: () => void;
  decreasePrepareSeconds: () => void;
  setPrepareSeconds: (value: string) => void;
  PrepColor: string;
  setPrepColor: (value: string) => void;
  getPrepareFullTimeInSeconds: () => string;
};
