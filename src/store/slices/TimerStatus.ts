import { StateCreator } from "zustand";
import convertSecToMinSec from "../../utils/convertSecToMinSec";
import { workType } from "./WorkMode";
import { restType } from "./RestMode";
import { roundsType } from "./Rounds";
import { localStorageType } from "./localStorage";
import { progressBarType } from "./ProgressBar";
import { prepareType } from "./PrepareMode";

const timerStatusSlice: StateCreator<
  timerStatusType & workType & restType & roundsType & localStorageType & progressBarType & prepareType,
  [],
  [],
  timerStatusType
> = (set, get) => ({
  timer: null,
  setTimer: (value) => set({ timer: value }),
  getTimer: () => {
    return get().timer;
  },

  time: 0,
  setTime: (value) => set({ time: value }),
  timeIncrease: () => set((state) => ({ time: state.time + 1 })),

  whichInterval: "prepare",
  setWhichInterval: (value) => set({ whichInterval: value }),

  currentRound: 1,
  setCurrentRound: (value) => set({ currentRound: value }),
  currentRoundIncrease: () => set((state) => ({ currentRound: state.currentRound + 1 })),

  isPaused: true,
  setIsPaused: (value) => set({ isPaused: value }),

  workoutFullTime: "00:00",
  setWorkoutFullTime: (value) => set({ workoutFullTime: value }),
  updateWorkoutFullTime: () => {
    let restRounds = get().skipLastRest ? get().Rounds - 1 : get().Rounds;
    let rounds = get().Rounds;
    let fullTime = get().getWorkFullTimeInSeconds() * rounds + Number(get().getRestFullTimeInSeconds()) * restRounds;
    set({ workoutFullTime: convertSecToMinSec(fullTime) });
  },

  totalTimePassed: 0,
  increaseTotalTimePassed: () => set((state) => ({ totalTimePassed: state.totalTimePassed + 1 })),
  setTotalTimePassed: (value) => set({ totalTimePassed: value }),

  currentBackgroundColor: "#0a0a0a",
  setCurrentBackgroundColor: (value) => set({ currentBackgroundColor: value }),
  removeUIBorders: false,
  setRemoveUIBorders: (value) => set({ removeUIBorders: value }),

  mainTimerBorder: "#4d4d4d",
  setMainTimerBorder: (value) => set({ mainTimerBorder: value }),

  isLoadingSavedTimer: false,
  SetIsLoadingSavedTimer: (value) => set({ isLoadingSavedTimer: value }),

  resetTimer: () => {
    set({
      time: 0,
      whichInterval: "prepare",
      currentRound: 1,
      isPaused: true,
      totalTimePassed: 0,
      progressBarValue: "0",
      currentProgressColor: "#737373",
      currentBackgroundColor: "#0a0a0a",
      removeUIBorders: false,
      mainTimerBorder: "#787777",
      workoutFullTime: "00:00",
      timer: null,
    });
  },
  changeInterval: () => {
    set({
      time: -1,
      progressBarValue: "0",
      currentBackgroundColor: "#0a0a0a",
      mainTimerBorder: get().whichInterval === "work" ? get().WorkColor : get().RestColor,
    });
  },

  clearInputFields: () => {
    set({
      Rounds: 1,
      WorkMinutes: "00",
      WorkSeconds: "10",
      WorkColor: "#00993B",
      RestMinutes: "00",
      RestSeconds: "10",
      RestColor: "#DB0000",
      PrepareMinutes: "00",
      PrepareSeconds: "03",
      PrepColor: "#2f498a",
    });
  },
});

export default timerStatusSlice;

export type timerStatusType = {
  timer: any;
  setTimer: (value: any) => void;
  getTimer: () => any;
  time: number;
  setTime: (value: number) => void;
  timeIncrease: () => void;
  whichInterval: "work" | "rest" | "prepare";
  setWhichInterval: (value: "work" | "rest" | "prepare") => void;
  currentRound: number;
  setCurrentRound: (value: number) => void;
  currentRoundIncrease: () => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
  workoutFullTime: string;
  setWorkoutFullTime: (value: string) => void;
  updateWorkoutFullTime: () => void;
  totalTimePassed: number;
  increaseTotalTimePassed: () => void;
  setTotalTimePassed: (value: number) => void;
  currentBackgroundColor: string;
  setCurrentBackgroundColor: (value: string) => void;
  removeUIBorders: boolean;
  setRemoveUIBorders: (value: boolean) => void;
  mainTimerBorder: string;
  setMainTimerBorder: (value: string) => void;
  isLoadingSavedTimer: boolean;
  SetIsLoadingSavedTimer: (value: boolean) => void;
  resetTimer: () => void;
  clearInputFields: () => void;
  changeInterval: () => void;
};
