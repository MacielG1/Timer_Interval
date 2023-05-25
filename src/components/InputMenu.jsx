import { useEffect } from "react";
import useStore from "../store/useStore";
import InputNumber from "./inputs/InputNumber";
import InputColor from "./inputs/InputColor";
import ClearInput from "./ClearInput";

export default function CenterMenu() {
  const currentRound = useStore((state) => state.currentRound);

  const currentRoundIncrease = useStore((state) => state.currentRoundIncrease);

  const whichInterval = useStore((state) => state.whichInterval);
  const setWhichInterval = useStore((state) => state.setWhichInterval);

  const totalRounds = useStore((state) => state.Rounds);

  const workTime = useStore((state) => state.workTime);

  const restTime = useStore((state) => state.restTime);

  const prepTime = useStore((state) => state.prepTime);

  const timer = useStore((state) => state.timer);

  const time = useStore((state) => state.time);
  const setTime = useStore((state) => state.setTime);

  const workoutFullTime = useStore((state) => state.workoutFullTime);

  const increaseTotalTimePassed = useStore((state) => state.increaseTotalTimePassed);

  const setProgressBarValue = useStore((state) => state.setProgressBarValue);
  const setProgressBarMax = useStore((state) => state.setProgressBarMax);

  const setCurrentProgressColor = useStore((state) => state.setCurrentProgressColor);
  const setCurrentBackgroundColor = useStore((state) => state.setCurrentBackgroundColor);

  const workColor = useStore((state) => state.WorkColor);
  const restColor = useStore((state) => state.RestColor);
  const prepColor = useStore((state) => state.PrepColor);

  const skipLastRest = useStore((state) => state.skipLastRest);
  const resetTimer = useStore((state) => state.resetTimer);

  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  const setRemoveUIBorders = useStore((state) => state.setRemoveUIBorders);
  const setMainTimerBorder = useStore((state) => state.setMainTimerBorder);

  const prepareonEveryRound = useStore((state) => state.prepareonEveryRound);
  const enableSounds = useStore((state) => state.enableSounds);

  async function playSound() {
    if (enableSounds) {
      const module = await import("../assets/sounds/sound1.wav");
      const audio = new Audio(module.default);
      audio.play();
    }
  }

  useEffect(() => {
    if (timer) {
      if (workoutFullTime === "00:00") {
        timer.stop();
        resetTimer();
        return;
      }

      if (whichInterval === "prepare") {
        setProgressBarMax(prepTime);
        setCurrentProgressColor(prepColor);
        if (enableBackgroundColors) {
          setCurrentBackgroundColor(prepColor);
          setRemoveUIBorders(true);
        } else {
          setMainTimerBorder(prepColor);
        }
      } else if (whichInterval === "work") {
        setProgressBarMax(workTime);
        setCurrentProgressColor(workColor);
        if (enableBackgroundColors) {
          setCurrentBackgroundColor(workColor);
          setRemoveUIBorders(true);
        } else {
          setMainTimerBorder(workColor);
        }
      } else if (whichInterval === "rest") {
        setProgressBarMax(restTime);
        setCurrentProgressColor(restColor);
        if (enableBackgroundColors) {
          setCurrentBackgroundColor(restColor);
          setRemoveUIBorders(true);
        } else {
          setMainTimerBorder(restColor);
        }
      }
      if ((whichInterval === "prepare" && time == prepTime) || (whichInterval === "work" && time == workTime) || (whichInterval === "rest" && time == restTime)) {
        if (enableSounds) playSound();
      }
      if (whichInterval === "prepare" && time > prepTime) {
        setWhichInterval("work");
        setTime(0);
      } else if (whichInterval === "work" && time > workTime) {
        setWhichInterval("rest");
        setTime(0);

        if (currentRound === totalRounds && skipLastRest) {
          timer.stop();
          resetTimer();
          return;
        }
      } else if (whichInterval === "rest" && time > restTime) {
        if (currentRound === totalRounds) {
          timer.stop();
          resetTimer();
          return;
        } else {
          currentRoundIncrease();
          if (prepareonEveryRound) {
            setWhichInterval("prepare");
          } else {
            setWhichInterval("work");
          }
          setTime(0);
        }
      } else if (time !== 0 && (whichInterval === "work" || whichInterval === "rest") && currentRound <= totalRounds) {
        increaseTotalTimePassed();
      }
      setProgressBarValue(time);
    }
  }, [time]);

  return (
    <>
      <div className="mt-6 2xl:mt-8 flex flex-col justify-center mx-auto gap-2 2xl:gap-3 ">
        {/* Rounds */}

        <div className="flex  ">
          <InputNumber label="Rounds" className="w-32 xs:w-[9.8rem]" inputStoreType="Rounds" maxLength={8} />
          <ClearInput />
        </div>

        {/* Work */}
        <div className="flex items-center">
          <InputNumber label="Work" width="w-14" inputStoreType="WorkMinutes" />
          <InputNumber label=":" width="w-14" nogap inputStoreType="WorkSeconds" />
          <InputColor inputType="WorkColor" />
        </div>
        {/* Rest */}
        <div className="flex items-center">
          <InputNumber label="Rest" width="w-14" inputStoreType="RestMinutes" />
          <InputNumber label=":" width="w-14" nogap inputStoreType="RestSeconds" />
          <InputColor inputType="RestColor" />
        </div>
        {/* Prepare */}
        <div className="flex items-center">
          <InputNumber label="Prepare" width="w-14" inputStoreType="PrepareMinutes" />
          <InputNumber label=":" width="w-14" nogap inputStoreType="PrepareSeconds" />
          <InputColor inputType="PrepColor" />
        </div>
      </div>
    </>
  );
}
