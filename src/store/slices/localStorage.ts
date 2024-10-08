import { StateCreator } from "zustand";
import { timerStatusType } from "./TimerStatus";

const storageSlice: StateCreator<localStorageType & timerStatusType, [], [], localStorageType> = (set, get) => ({
  // saved timers
  savedWorkouts: [],
  setSavedWorkouts: (value) => set({ savedWorkouts: value }),

  // saved settings
  skipLastRest: true,
  setSkipLastRest: (value) => {
    set({ skipLastRest: value });
    get().updateWorkoutFullTime();
  },

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

  preferredLanguage: "en",
  setPreferredLanguage: (value) => set({ preferredLanguage: value }),

  preferredSound: "audio1",
  setPreferredSound: (value) => set({ preferredSound: value }),
});

export default storageSlice;

export type localStorageType = {
  savedWorkouts: savedWorkoutType[];
  setSavedWorkouts: (value: savedWorkoutType[]) => void;

  skipLastRest: boolean;
  setSkipLastRest: (value: boolean) => void;
  enableBackgroundColors: boolean;
  setEnableBackgroundColors: (value: boolean) => void;
  autoRestartonReset: boolean;
  setAutoRestartonReset: (value: boolean) => void;
  prepareonEveryRound: boolean;
  setPrepareonEveryRound: (value: boolean) => void;
  enableSounds: boolean;
  setEnableSounds: (value: boolean) => void;
  enableVibrate: boolean;
  setEnableVibrate: (value: boolean) => void;
  preferredLanguage: "en" | "pt" | "fr";
  setPreferredLanguage: (value: "en" | "pt" | "fr") => void;
  preferredSound: "audio1" | "audio2";
  setPreferredSound: (value: "audio1" | "audio2") => void;
};

export type savedWorkoutType = {
  Title: string;
  id: string;
  Rounds: number;
  WorkMinutes: string;
  WorkSeconds: string;
  WorkColor: string;
  RestMinutes: string;
  RestSeconds: string;
  RestColor: string;
  PrepareMinutes: string;
  PrepareSeconds: string;
  PrepColor: string;
};
