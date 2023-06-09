const storageSlice = (set) => ({
  // saved timers
  savedWorkouts: [],
  setSavedWorkouts: (value) => set({ savedWorkouts: value }),

  // saved settings
  skipLastRest: true,
  setSkipLastRest: (value) => set({ skipLastRest: value }),

  enableBackgroundColors: false,
  setEnableBackgroundColors: (value) => set({ enableBackgroundColors: value }),

  autoRestartonReset: false,
  setAutoRestartonReset: (value) => set({ autoRestartonReset: value }),

  prepareonEveryRound: false,
  setPrepareonEveryRound: (value) => set({ prepareonEveryRound: value }),

  enableSounds: false,
  setEnableSounds: (value) => set({ enableSounds: value }),

  enableVibrate: false,
  setEnableVibrate: (value) => set({ enableVibrate: value }),

  // language
  // preferredLanguage: navigator.language.slice(0, 2),
  preferredLanguage: "en",
  setPreferredLanguage: (value) => set({ preferredLanguage: value }),
});

export default storageSlice;
