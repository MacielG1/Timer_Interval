import convert_Sec_to_MinSec from "../../utils/Convert-Sec-to-MinSec";

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
      timer: null,
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

export default timerStatusSlice;
