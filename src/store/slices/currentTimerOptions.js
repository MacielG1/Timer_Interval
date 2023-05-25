import convert_MinSec_to_Sec from "../../utils/Convert-MinSec-to-Sec";

const currentTimerOptionsSlice = (set, get) => ({
  workTime: "00:00",
  setWorkTime: () => {
    let time = convert_MinSec_to_Sec(`${get().WorkMinutes}:${get().WorkSeconds}`);
    set({ workTime: time });
  },
  restTime: "00:00",
  setRestTime: () => {
    let time = convert_MinSec_to_Sec(`${get().RestMinutes}:${get().RestSeconds}`);
    set({ restTime: time });
  },
  prepTime: "00:00",
  setPrepTime: () => {
    let time = convert_MinSec_to_Sec(`${get().PrepareMinutes}:${get().PrepareSeconds}`);
    set({ prepTime: time });
  },
});

export default currentTimerOptionsSlice;
