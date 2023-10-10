import useStore from "../store/useStore";
import Timer from "../utils/Timer";
import Button from "./Button";

export default function MenuButtons() {
  const [setWorkTime, setRestTime, setPrepTime] = useStore((state) => [state.setWorkTime, state.setRestTime, state.setPrepTime]);
  const [setRoundsSelected, setTimer, timeIncrease] = useStore((state) => [state.setRoundsSelected, state.setTimer, state.timeIncrease]);

  const [timer, resetTimer, getTimer] = useStore((state) => [state.timer, state.resetTimer, state.getTimer]);
  const [updateWorkoutFullTime, isPaused, setIsPaused] = useStore((state) => [state.updateWorkoutFullTime, state.isPaused, state.setIsPaused]);
  const [autoRestartonReset, preferredLanguage] = useStore((state) => [state.autoRestartonReset, state.preferredLanguage]);

  function handleStart() {
    if (isPaused) setIsPaused(false);

    if (!getTimer()) {
      setRoundsSelected();
      setWorkTime();
      setRestTime();
      setPrepTime();
      updateWorkoutFullTime();
    }

    setTimer(
      new Timer(1000, () => {
        timeIncrease();
      }),
    );
  }

  function handlePause() {
    setIsPaused(true);
    timer?.stop();
  }

  function handleReset() {
    timer?.stop();
    resetTimer();
    if (autoRestartonReset) {
      setTimeout(() => {
        handleStart();
      }, 1000);
    }
  }

  let lang = {
    startButton: {
      en: "Start",
      pt: "Começar",
      fr: "Démarrer",
    },
    resumeButton: {
      en: "Resume",
      pt: "Continuar",
      fr: "Reprendre",
    },
    pauseButton: {
      en: "Pause",
      pt: "Pausar",
      fr: "Arrêter",
    },
    resetButton: {
      en: "Reset",
      pt: "Reiniciar",
      fr: "Reset",
    },
  };

  return (
    <div className="mt-2 flex items-center justify-center gap-1 xs:gap-2 sm:mt-4 sm:gap-4 2xl:mt-10">
      <Button
        onClick={handleStart}
        text={timer && isPaused ? lang.resumeButton[preferredLanguage] : lang.startButton[preferredLanguage]}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-700/90 disabled:text-neutral-900"
        disabled={timer && !isPaused}
      />
      <Button onClick={handlePause} text={lang.pauseButton[preferredLanguage]} className="bg-rose-700 hover:bg-rose-800" />
      <Button onClick={handleReset} text={lang.resetButton[preferredLanguage]} className="bg-sky-600 hover:bg-sky-700" />
    </div>
  );
}
