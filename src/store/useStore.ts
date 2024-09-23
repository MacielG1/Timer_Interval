import { create } from "zustand";
import roundsSlice, { roundsType } from "./slices/Rounds.js";
import workSlice, { workType } from "./slices/WorkMode.js";
import restSlice, { restType } from "./slices/RestMode.js";
import prepareSlice, { prepareType } from "./slices/PrepareMode.js";
import timerStatusSlice, { timerStatusType } from "./slices/TimerStatus.js";
import progressBarSlice, { progressBarType } from "./slices/ProgressBar.js";
import currentTimerOptionsSlice, { currentTimerType } from "./slices/currentTimerOptions.js";
import storageSlice, { localStorageType } from "./slices/localStorage.js";

type Slices = currentTimerType & timerStatusType & roundsType & workType & restType & prepareType & progressBarType & localStorageType;

type WakeLockSlice = {
  wakeLock: WakeLockSentinel | null;
  setWakeLock: (wakeLock: WakeLockSentinel | null) => void;
};

const useStore = create<Slices & WakeLockSlice>()((...args) => ({
  ...roundsSlice(...args),
  ...workSlice(...args),
  ...restSlice(...args),
  ...prepareSlice(...args),
  ...timerStatusSlice(...args),
  ...progressBarSlice(...args),
  ...currentTimerOptionsSlice(...args),
  ...storageSlice(...args),
  wakeLock: null,
  setWakeLock: (wakeLock) => args[0]({ wakeLock }),
}));

export default useStore;
