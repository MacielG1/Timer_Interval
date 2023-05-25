const progressBarSlice = (set) => ({
  progressBarValue: 0,
  setProgressBarValue: (value) => set({ progressBarValue: value }),
  progressBarMax: 0,
  setProgressBarMax: (value) => set({ progressBarMax: value }),
  currentProgressColor: "#737373",
  setCurrentProgressColor: (value) => set({ currentProgressColor: value }),
});

export default progressBarSlice;
