import useStore from "../store/useStore";
import Timer from "../utils/Timer";
import Button from "./Button";

export default function MenuButtons() {
  const setWorkTime = useStore((state) => state.setWorkTime);
  const setRestTime = useStore((state) => state.setRestTime);
  const setPrepTime = useStore((state) => state.setPrepTime);
  const setTimer = useStore((state) => state.setTimer);
  const timeIncrease = useStore((state) => state.timeIncrease);
  const updateWorkoutFullTime = useStore((state) => state.getWorkoutFullTime);
  const isPaused = useStore((state) => state.isPaused);
  const setIsPaused = useStore((state) => state.setIsPaused);
  const autoRestartonReset = useStore((state) => state.autoRestartonReset);
  const timer = useStore((state) => state.timer);
  const resetTimer = useStore((state) => state.resetTimer);

  function handleStart() {
    if (isPaused) setIsPaused(false);

    setWorkTime();
    setRestTime();
    setPrepTime();
    updateWorkoutFullTime();

    setTimer(
      new Timer(1000, () => {
        timeIncrease();
      })
    );
  }

  function handlePause() {
    setIsPaused(true);
    if (timer) {
      timer.stop();
    }
  }

  function handleReset() {
    if (timer) {
      timer.stop();
    }
    resetTimer();

    if (autoRestartonReset) {
      handleStart();
    }
  }

  return (
    <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4 2xl:mt-10 justify-center items-center">
      <Button
        onClick={handleStart}
        text="Start"
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:text-neutral-900"
        disabled={timer && !isPaused}
      />
      <Button onClick={handlePause} text="Pause" className="bg-rose-700 hover:bg-rose-800" />
      <Button onClick={handleReset} text="Reset" className="bg-sky-600 hover:bg-sky-700" />
    </div>
  );
}
