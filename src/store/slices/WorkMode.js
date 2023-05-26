import padTime from "../../utils/PadNum";
import convert_MinSec_to_Sec from "../../utils/Convert-MinSec-to-Sec";

const workSlice = (set, get) => ({
  WorkMinutes: "00",
  increaseWorkMinutes: () => set((state) => ({ WorkMinutes: padTime(Number(state.WorkMinutes) + 1) })),
  decreaseWorkMinutes: () => set((state) => ({ WorkMinutes: padTime(Math.max(state.WorkMinutes - 1, 0)) })),
  setWorkMinutes: (value) => {
    const newValue = value === "" ? "" : value; // if the value is greater than 60, set it to 60
    set({ WorkMinutes: newValue });
  },
  WorkSeconds: "02",
  increaseWorkSeconds: () => set((state) => ({ WorkSeconds: padTime(Number(state.WorkSeconds) + 1) })),
  decreaseWorkSeconds: () => set((state) => ({ WorkSeconds: padTime(Math.max(state.WorkSeconds - 1, 0)) })),
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
    return convert_MinSec_to_Sec(get().getWorkFullTime());
  },
});

export default workSlice;
