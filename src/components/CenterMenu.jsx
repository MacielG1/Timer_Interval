import Button from "./Button";
import { useState, useEffect } from "react";
import convert_MinSec_to_Sec from "../utils/Convert-MinSec-to-Sec";
import Timer from "../utils/Timer";

import useStore from "../store/useStore";
import InputNumber from "./inputs/InputNumber";
import InputColor from "./inputs/InputColor";
import ClearInput from "./ClearInput";
export default function CenterMenu() {
  const currentRound = useStore((state) => state.currentRound);

  const currentRoundIncrease = useStore((state) => state.currentRoundIncrease);

  // const [whichInterval, setWhichInterval] = useState("prepare");
  const whichInterval = useStore((state) => state.whichInterval);
  const setWhichInterval = useStore((state) => state.setWhichInterval);

  const totalRounds = useStore((state) => state.Rounds);
  // const workMin = useStore((state) => state.WorkMinutes);
  // const workSec = useStore((state) => state.WorkSeconds);
  // const restMin = useStore((state) => state.RestMinutes);
  // const restSec = useStore((state) => state.RestSeconds);
  // const prepMin = useStore((state) => state.PrepareMinutes);
  // const prepSec = useStore((state) => state.PrepareSeconds);

  const workTime = useStore((state) => state.workTime);
  const setWorkTime = useStore((state) => state.setWorkTime);
  const restTime = useStore((state) => state.restTime);
  const setRestTime = useStore((state) => state.setRestTime);
  const prepTime = useStore((state) => state.prepTime);
  const setPrepTime = useStore((state) => state.setPrepTime);

  // const [timer, setTimer] = useState(null);
  const timer = useStore((state) => state.timer);
  const setTimer = useStore((state) => state.setTimer);

  const time = useStore((state) => state.time);
  const setTime = useStore((state) => state.setTime);
  const timeIncrease = useStore((state) => state.timeIncrease);

  const isPaused = useStore((state) => state.isPaused);
  const setIsPaused = useStore((state) => state.setIsPaused);

  const workoutFullTime = useStore((state) => state.workoutFullTime);
  const updateWorkoutFullTime = useStore((state) => state.getWorkoutFullTime);

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

  const autoRestartonReset = useStore((state) => state.autoRestartonReset);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  const setRemoveUIBorders = useStore((state) => state.setRemoveUIBorders);
  const setMainTimerBorder = useStore((state) => state.setMainTimerBorder);

  const prepareonEveryRound = useStore((state) => state.prepareonEveryRound);

  function handleStart() {
    if (isPaused) {
      setIsPaused(false);
    }
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

  // useEffect(() => {
  //   if (timer) {
  //     if (workoutFullTime === "00:00") {
  //       timer.stop();
  //       resetTimer();
  //       return;
  //     }

  //     if (whichInterval === "prepare") {
  //       setProgressBarMax(prepTime);
  //       setCurrentProgressColor("#2f498a");
  //     } else if (whichInterval === "work") {
  //       setProgressBarMax(workTime);
  //       setCurrentProgressColor(workColor);
  //       if (enableBackgroundColors) {
  //         setCurrentBackgroundColor(workColor);
  //         setRemoveUIBorders(true);
  //       } else {
  //         setMainTimerBorder(workColor);
  //       }
  //     } else if (whichInterval === "rest") {
  //       setProgressBarMax(restTime);
  //       setCurrentProgressColor(restColor);
  //       if (enableBackgroundColors) {
  //         setCurrentBackgroundColor(restColor);
  //         setRemoveUIBorders(true);
  //       } else {
  //         setMainTimerBorder(restColor);
  //       }
  //     }

  //     if (whichInterval === "prepare" && time > prepTime) {
  //       setWhichInterval("work");
  //       setTime(0);
  //     } else if (whichInterval === "work" && time > workTime) {
  //       setWhichInterval("rest");
  //       setTime(0);
  //       if (currentRound === totalRounds && skipLastRest) {
  //         timer.stop();
  //         resetTimer();
  //         return;
  //       }
  //     } else if (whichInterval === "rest" && time > restTime) {
  //       setWhichInterval("work");
  //       setTime(0);

  //       if (currentRound === totalRounds) {
  //         timer.stop();
  //         resetTimer();
  //         return;
  //       } else {
  //         currentRoundIncrease();
  //       }
  //     } else if (time !== 0 && (whichInterval === "work" || whichInterval === "rest") && currentRound <= totalRounds) {
  //       increaseTotalTimePassed();
  //     }
  //     setProgressBarValue(time);
  //   }
  // }, [time]);
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
            setTime(0);
          } else {
            setWhichInterval("work");
            setTime(0);
          }
        }
      } else if (time !== 0 && (whichInterval === "work" || whichInterval === "rest") && currentRound <= totalRounds) {
        increaseTotalTimePassed();
      }
      setProgressBarValue(time);
    }
  }, [time]);

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
    <>
      <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4 2xl:mt-10   justify-center items-center">
        <Button onClick={handleStart} text="Start" color="bg-green-600" hoverColor="hover:bg-green-700" />
        <Button onClick={handlePause} text="Pause" color="bg-rose-700" hoverColor="hover:bg-rose-800" />
        <Button onClick={handleReset} text="Reset" color="bg-sky-600" hoverColor="hover:bg-sky-700" />
      </div>
      <div className="mt-6 2xl:mt-8 flex flex-col justify-center mx-auto gap-2 2xl:gap-3 ">
        {/* Rounds */}

        <div className="flex  ">
          <InputNumber label="Rounds" className="w-28 xs:w-[8.8rem]" inputStoreType="Rounds" />
          <ClearInput />
        </div>

        {/* Work */}
        <div className="flex items-center">
          <InputNumber label="Work" width="w-12" inputStoreType="WorkMinutes" />
          <InputNumber label=":" width="w-12" nogap inputStoreType="WorkSeconds" />
          <InputColor inputType="WorkColor" />
        </div>
        {/* Rest */}
        <div className="flex items-center">
          <InputNumber label="Rest" width="w-12" inputStoreType="RestMinutes" />
          <InputNumber label=":" width="w-12" nogap inputStoreType="RestSeconds" />
          <InputColor inputType="RestColor" />
        </div>
        {/* Prepare */}
        <div className="flex items-center">
          <InputNumber label="Prepare" width="w-12" inputStoreType="PrepareMinutes" />
          <InputNumber label=":" width="w-12" nogap inputStoreType="PrepareSeconds" />
          <InputColor inputType="PrepColor" />
        </div>
      </div>
    </>
  );
}
