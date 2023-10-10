import { StateCreator } from "zustand";

const roundsSlice: StateCreator<roundsType> = (set) => ({
  Rounds: 5,
  increaseRounds: () => set((state) => ({ Rounds: Math.min(Number(state.Rounds) + 1, 100000000) })),
  decreaseRounds: () => set((state) => ({ Rounds: Math.max(state.Rounds - 1, 1) })),
  setRounds: (value) => {
    const newValue = value === "" ? "" : Math.max(1, Math.min(Number(value), 100000000));
    set({ Rounds: newValue as number });
  },
});

export default roundsSlice;

export type roundsType = {
  Rounds: number;
  increaseRounds: () => void;
  decreaseRounds: () => void;
  setRounds: (value: string) => void;
};
