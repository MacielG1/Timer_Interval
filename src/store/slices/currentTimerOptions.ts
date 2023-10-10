import { StateCreator } from "zustand";
import convertMinSecToSec from "../../utils/convertMinSecToSec";
import { roundsType } from "./Rounds";
import { workType } from "./WorkMode";
import { restType } from "./RestMode";
import { prepareType } from "./PrepareMode";

const currentTimerOptionsSlice: StateCreator<currentTimerType & roundsType & workType & restType & prepareType, [], [], currentTimerType> = (set, get) => ({
  roundsSelected: 1,
  setRoundsSelected: () => {
    set({ roundsSelected: get().Rounds });
  },
  workTime: "00:00",
  setWorkTime: () => {
    let time = convertMinSecToSec(`${get().WorkMinutes}:${get().WorkSeconds}`);
    set({ workTime: time });
  },
  restTime: "00:00",
  setRestTime: () => {
    let time = convertMinSecToSec(`${get().RestMinutes}:${get().RestSeconds}`);
    set({ restTime: time });
  },
  prepTime: "00:00",
  setPrepTime: () => {
    let time = convertMinSecToSec(`${get().PrepareMinutes}:${get().PrepareSeconds}`);
    set({ prepTime: time });
  },
});

export default currentTimerOptionsSlice;

export type currentTimerType = {
  roundsSelected: number;
  setRoundsSelected: () => void;
  workTime: string;
  setWorkTime: () => void;
  restTime: string;
  setRestTime: () => void;
  prepTime: string;
  setPrepTime: () => void;
};
