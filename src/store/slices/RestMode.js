import padTime from "../../utils/PadNum";
import convert_MinSec_to_Sec from "../../utils/Convert-MinSec-to-Sec";

const restSlice = (set, get) => ({
  RestMinutes: "00",
  increaseRestMinutes: () => set((state) => ({ RestMinutes: padTime(Number(state.RestMinutes) + 1) })),
  decreaseRestMinutes: () => set((state) => ({ RestMinutes: padTime(Math.max(state.RestMinutes - 1, 0)) })),
  setRestMinutes: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ RestMinutes: newValue });
  },
  RestSeconds: "10",
  increaseRestSeconds: () => set((state) => ({ RestSeconds: padTime(Number(state.RestSeconds) + 1) })),
  decreaseRestSeconds: () => set((state) => ({ RestSeconds: padTime(Math.max(state.RestSeconds - 1, 0)) })),
  setRestSeconds: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ RestSeconds: newValue });
  },

  RestColor: "#DB0000",
  setRestColor: (value) => set({ RestColor: value }),
  getRestFullTimeInSeconds: () => {
    return convert_MinSec_to_Sec(`${get().RestMinutes}:${get().RestSeconds}`);
  },
});

export default restSlice;
