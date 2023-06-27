import padTime from "../../utils/PadNum";
import convert_MinSec_to_Sec from "../../utils/Convert-MinSec-to-Sec";

const prepareSlice = (set, get) => ({
  PrepareMinutes: "00",
  increasePrepareMinutes: () => set((state) => ({ PrepareMinutes: padTime(Number(state.PrepareMinutes) + 1) })),
  decreasePrepareMinutes: () => set((state) => ({ PrepareMinutes: padTime(Math.max(state.PrepareMinutes - 1, 0)) })),
  setPrepareMinutes: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ PrepareMinutes: newValue });
  },
  PrepareSeconds: "03",
  increasePrepareSeconds: () => set((state) => ({ PrepareSeconds: padTime(Number(state.PrepareSeconds) + 1) })),
  decreasePrepareSeconds: () => set((state) => ({ PrepareSeconds: padTime(Math.max(state.PrepareSeconds - 1, 0)) })),
  setPrepareSeconds: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ PrepareSeconds: newValue });
  },

  PrepColor: "#2f498a",
  setPrepColor: (value) => set({ PrepColor: value }),

  getPrepareFullTimeInSeconds: () => {
    return convert_MinSec_to_Sec(`${get().PrepareMinutes}:${get().PrepareSeconds}`);
  },
});

export default prepareSlice;
