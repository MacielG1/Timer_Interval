import { create } from "zustand";

export const useInputStore = create((set) => ({
  rounds: 10,
  setRounds: (rounds) => set(() => ({ rounds })),

  // increaseRounds: () => set((state) => ({ rounds: state.rounds + 1 })),
  // decreaseRounds: () => set((state) => ({ rounds: state.rounds - 1 })),
  // setRounds: (rounds) => set({ rounds }),
  // workMinutes: 00,
  // workMinutesIncrease: () =>
  //   set((state) => ({ workMinutes: state.workMinutes + 1 })),
  // workMinutesDecrease: () =>
  //   set((state) => ({ workMinutes: state.workMinutes - 1 })),
  // setWorkMinutes: (workMinutes) => set({ workMinutes }),
  // workSeconds: 00,
  // workSecondsIncrease: () =>
  //   set((state) => ({ workSeconds: state.workSeconds + 1 })),
  // workSecondsDecrease: () =>
  //   set((state) => ({ workSeconds: state.workSeconds - 1 })),
  // setWorkSeconds: (workSeconds) => set({ workSeconds }),
  // restMinutes: 00,
  // restMinutesIncrease: () =>
  //   set((state) => ({ restMinutes: state.restMinutes + 1 })),
  // restMinutesDecrease: () =>
  //   set((state) => ({ restMinutes: state.restMinutes - 1 })),
  // setRestMinutes: (restMinutes) => set({ restMinutes }),
  // restSeconds: 00,
  // restSecondsIncrease: () =>
  //   set((state) => ({ restSeconds: state.restSeconds + 1 })),
  // restSecondsDecrease: () =>
  //   set((state) => ({ restSeconds: state.restSeconds - 1 })),
  // setRestSeconds: (restSeconds) => set({ restSeconds }),
  // prepareMinutes: 00,
  // prepareMinutesIncrease: () =>
  //   set((state) => ({ prepareMinutes: state.prepareMinutes + 1 })),
  // prepareMinutesDecrease: () =>
  //   set((state) => ({ prepareMinutes: state.prepareMinutes - 1 })),
  // setPrepareMinutes: (prepareMinutes) => set({ prepareMinutes }),
  // prepareSeconds: 00,
  // prepareSecondsIncrease: () =>
  //   set((state) => ({ prepareSeconds: state.prepareSeconds + 1 })),
  // prepareSecondsDecrease: () =>
  //   set((state) => ({ prepareSeconds: state.prepareSeconds - 1 })),
  // setPrepareSeconds: (prepareSeconds) => set({ prepareSeconds }),
}));
