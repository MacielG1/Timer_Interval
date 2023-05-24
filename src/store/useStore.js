import { create } from "zustand";
import padTime from "../utils/PadNum";
import convert_MinSec_to_Sec from "../utils/Convert-MinSec-to-Sec";
import convert_Sec_to_MinSec from "../utils/Convert-Sec-to-MinSec";

const roundsSlice = (set) => ({
  Rounds: 2,
  increaseRounds: () => set((state) => ({ Rounds: Math.min(Number(state.Rounds) + 1, 10000000) })),
  decreaseRounds: () => set((state) => ({ Rounds: Math.max(state.Rounds - 1, 1) })),
  setRounds: (value) => {
    const newValue = value === "" ? "" : Math.min(Number(value), 10000000);
    set({ Rounds: newValue });
  },
});

const workSlice = (set, get) => ({
  WorkMinutes: "00",
  increaseWorkMinutes: () => set((state) => ({ WorkMinutes: padTime(Math.min(Number(state.WorkMinutes) + 1, 60)) })),
  decreaseWorkMinutes: () => set((state) => ({ WorkMinutes: padTime(Math.max(state.WorkMinutes - 1, 0)) })),
  setWorkMinutes: (value) => {
    const newValue = value === "" ? "" : Math.min(value, 60); // if the value is greater than 60, set it to 60
    set({ WorkMinutes: newValue });
  },
  WorkSeconds: "02",
  increaseWorkSeconds: () => set((state) => ({ WorkSeconds: padTime(Math.min(Number(state.WorkSeconds) + 1, 60)) })),
  decreaseWorkSeconds: () => set((state) => ({ WorkSeconds: padTime(Math.max(state.WorkSeconds - 1, 0)) })),
  setWorkSeconds: (value) => {
    const newValue = value === "" ? "" : Math.min(value, 60); // if the value is greater than 60, set it to 60
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
const restSlice = (set, get) => ({
  RestMinutes: "00",
  increaseRestMinutes: () => set((state) => ({ RestMinutes: padTime(Math.min(Number(state.RestMinutes) + 1, 60)) })),
  decreaseRestMinutes: () => set((state) => ({ RestMinutes: padTime(Math.max(state.RestMinutes - 1, 0)) })),
  setRestMinutes: (value) => {
    const newValue = value === "" ? "" : Math.min(value, 60); // if the value is greater than 60, set it to 60
    set({ RestMinutes: newValue });
  },
  RestSeconds: "02",
  increaseRestSeconds: () => set((state) => ({ RestSeconds: padTime(Math.min(Number(state.RestSeconds) + 1, 60)) })),
  decreaseRestSeconds: () => set((state) => ({ RestSeconds: padTime(Math.max(state.RestSeconds - 1, 0)) })),
  setRestSeconds: (value) => {
    const newValue = value === "" ? "" : Math.min(value, 60); // if the value is greater than 60, set it to 60
    set({ RestSeconds: newValue });
  },

  RestColor: "#DB0000",
  setRestColor: (value) => set({ RestColor: value }),
  getRestFullTimeInSeconds: () => {
    return convert_MinSec_to_Sec(`${get().RestMinutes}:${get().RestSeconds}`);
  },
});

const prepareSlice = (set, get) => ({
  PrepareMinutes: "00",
  increasePrepareMinutes: () => set((state) => ({ PrepareMinutes: padTime(Math.min(Number(state.PrepareMinutes) + 1, 60)) })),
  decreasePrepareMinutes: () => set((state) => ({ PrepareMinutes: padTime(Math.max(state.PrepareMinutes - 1, 0)) })),
  setPrepareMinutes: (value) => {
    const newValue = value === "" ? "" : Math.min(value, 60); // if the value is greater than 60, set it to 60
    set({ PrepareMinutes: newValue });
  },
  PrepareSeconds: "02",
  increasePrepareSeconds: () => set((state) => ({ PrepareSeconds: padTime(Math.min(Number(state.PrepareSeconds) + 1, 60)) })),
  decreasePrepareSeconds: () => set((state) => ({ PrepareSeconds: padTime(Math.max(state.PrepareSeconds - 1, 0)) })),
  setPrepareSeconds: (value) => {
    const newValue = value === "" ? "" : Math.min(value, 60); // if the value is greater than 60, set it to 60
    set({ PrepareSeconds: newValue });
  },

  PrepColor: "#2f498a",
  setPrepColor: (value) => set({ PrepColor: value }),

  getPrepareFullTimeInSeconds: () => {
    return convert_MinSec_to_Sec(`${get().PrepareMinutes}:${get().PrepareSeconds}`);
  },
});

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

const timerStatusSlice = (set, get) => ({
  timer: null,
  setTimer: (value) => set({ timer: value }),
  time: 0,
  setTime: (value) => set({ time: value }),
  timeIncrease: () => set((state) => ({ time: state.time + 1 })),

  whichInterval: "prepare",
  setWhichInterval: (value) => set({ whichInterval: value }),

  currentRound: 1,
  setCurrentRound: (value) => set({ currentRound: value }),
  currentRoundIncrease: () => set((state) => ({ currentRound: state.currentRound + 1 })),

  skipLastRest: false,
  setSkipLastRest: (value) => set({ skipLastRest: value }),
  isPaused: true,
  setIsPaused: (value) => set({ isPaused: value }),

  workoutFullTime: "00:00",
  getWorkoutFullTime: () => {
    let restRounds = get().skipLastRest ? get().Rounds - 1 : get().Rounds;
    let rounds = get().Rounds;
    let fullTime = get().getWorkFullTimeInSeconds() * rounds + get().getRestFullTimeInSeconds() * restRounds;
    set({ workoutFullTime: convert_Sec_to_MinSec(fullTime) });
  },

  totalTimePassed: 0,
  increaseTotalTimePassed: () => set((state) => ({ totalTimePassed: state.totalTimePassed + 1 })),
  setTotalTimePassed: (value) => set({ totalTimePassed: value }),

  currentBackgroundColor: "#0a0a0a",
  setCurrentBackgroundColor: (value) => set({ currentBackgroundColor: value }),
  removeUIBorders: false,
  setRemoveUIBorders: (value) => set({ removeUIBorders: value }),

  mainTimerBorder: "#787777",
  setMainTimerBorder: (value) => set({ mainTimerBorder: value }),

  isLoadSavedTimer: false,
  setIsLoadSavedTimer: (value) => set({ isLoadSavedTimer: value }),

  resetTimer: () => {
    set({
      time: 0,
      whichInterval: "prepare",
      currentRound: 1,
      isPaused: true,
      totalTimePassed: 0,
      progressBarValue: 0,
      currentProgressColor: "#737373",
      currentBackgroundColor: "#0a0a0a",
      removeUIBorders: false,
      mainTimerBorder: "#787777",
      workoutFullTime: "00:00",
    });
  },
  clearInputFields: () => {
    set({
      Rounds: 1,
      WorkMinutes: "00",
      WorkSeconds: "00",
      WorkColor: "#00993B",
      RestMinutes: "00",
      RestSeconds: "00",
      RestColor: "#DB0000",
      PrepareMinutes: "00",
      PrepareSeconds: "00",
    });
  },
});

const progressBarSlice = (set) => ({
  progressBarValue: 0,
  setProgressBarValue: (value) => set({ progressBarValue: value }),
  progressBarMax: 0,
  setProgressBarMax: (value) => set({ progressBarMax: value }),
  currentProgressColor: "#737373",
  setCurrentProgressColor: (value) => set({ currentProgressColor: value }),
});
const storageSlice = (set) => ({
  savedWorkouts: [],
  setSavedWorkouts: (value) => set({ savedWorkouts: value }),
});

// const savedSettingsSlice = (set) => ({
//   skipLastRest: true,
//   setSkipLastRest: () => set({ skipLastRest: !get().skipLastRest }),
//   enableBackgroundColors: false,
//   setEnableBackgroundColors: () => set({ enableBackgroundColors: !get().enableBackgroundColors }),
//   autoRestartonReset: false,
//   setAutoRestartonReset: () => set({ autoRestartonReset: !get().autoRestartonReset }),
//    prepareonEveryRound: false,
//   setPrepareonEveryRound: () => set({ prepareonEveryRound: !get().prepareonEveryRound }),
// });

const savedSettingsSlice = (set, get) => ({
  skipLastRest: true,
  setSkipLastRest: (value) => {
    set({ skipLastRest: value });
    // localStorage.setItem("skipLastRest", get().skipLastRest);
  },
  enableBackgroundColors: false,
  setEnableBackgroundColors: (value) => {
    set({ enableBackgroundColors: value });
    // localStorage.setItem("enableBackgroundColors", get().enableBackgroundColors);
  },
  autoRestartonReset: false,
  setAutoRestartonReset: (value) => {
    set({ autoRestartonReset: value });
    // localStorage.setItem("autoRestartonReset", get().autoRestartonReset);
  },

  prepareonEveryRound: false,
  setPrepareonEveryRound: (value) => {
    set({ prepareonEveryRound: value });
    // localStorage.setItem("prepareonEveryRound", get().prepareonEveryRound);
  },
});

const useStore = create((...args) => ({
  ...roundsSlice(...args),
  ...workSlice(...args),
  ...restSlice(...args),
  ...prepareSlice(...args),
  ...timerStatusSlice(...args),
  ...progressBarSlice(...args),
  ...currentTimerOptionsSlice(...args),
  ...storageSlice(...args),
  ...savedSettingsSlice(...args),
}));
export default useStore;
