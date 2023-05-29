// import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import Timer from "../utils/Timer";
import Button from "./Button";

export default function MenuButtons() {
  const setWorkTime = useStore((state) => state.setWorkTime);
  const setRestTime = useStore((state) => state.setRestTime);
  const setPrepTime = useStore((state) => state.setPrepTime);
  const setRoundsSelected = useStore((state) => state.setRoundsSelected);
  const setTimer = useStore((state) => state.setTimer);
  const timeIncrease = useStore((state) => state.timeIncrease);
  const updateWorkoutFullTime = useStore((state) => state.getWorkoutFullTime);
  const isPaused = useStore((state) => state.isPaused);
  const setIsPaused = useStore((state) => state.setIsPaused);
  const autoRestartonReset = useStore((state) => state.autoRestartonReset);
  const timer = useStore((state) => state.timer);
  const resetTimer = useStore((state) => state.resetTimer);
  const getTimer = useStore((state) => state.getTimer);
  const preferredLanguage = useStore((state) => state.preferredLanguage);

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
      })
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
    <div className="flex gap-1 xs:gap-2 sm:gap-4 mt-2 sm:mt-4 2xl:mt-10 justify-center items-center">
      <Button
        onClick={handleStart}
        // text="Start"
        // text={timer && isPaused ? "Resume" : "Start"}
        text={timer && isPaused ? lang.resumeButton[preferredLanguage] : lang.startButton[preferredLanguage]}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-700/90 disabled:text-neutral-900"
        disabled={timer && !isPaused}
      />
      <Button onClick={handlePause} text={lang.pauseButton[preferredLanguage]} className="bg-rose-700 hover:bg-rose-800" />
      <Button onClick={handleReset} text={lang.resetButton[preferredLanguage]} className="bg-sky-600 hover:bg-sky-700" />
    </div>
  );
}
