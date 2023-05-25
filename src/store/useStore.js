import { create } from "zustand";
import roundsSlice from "./slices/Rounds";
import workSlice from "./slices/WorkMode";
import restSlice from "./slices/RestMode";
import prepareSlice from "./slices/PrepareMode";
import timerStatusSlice from "./slices/TimerStatus";
import progressBarSlice from "./slices/ProgressBar";
import currentTimerOptionsSlice from "./slices/currentTimerOptions";
import storageSlice from "./slices/localStorage";

const useStore = create((...args) => ({
  ...roundsSlice(...args),
  ...workSlice(...args),
  ...restSlice(...args),
  ...prepareSlice(...args),
  ...timerStatusSlice(...args),
  ...progressBarSlice(...args),
  ...currentTimerOptionsSlice(...args),
  ...storageSlice(...args),
}));
export default useStore;
