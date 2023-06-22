import { useEffect } from "react";
import useStore from "../store/useStore";
import InputNumber from "./inputs/InputNumber";
import InputColor from "./inputs/InputColor";
import ClearInput from "./ClearInput";
import playSound from "../utils/playSound";
import vibrate from "../utils/Vibrate";
import sound1 from "../assets/sounds/sound1.mp3";
import sound2 from "../assets/sounds/sound2.mp3";

export default function CenterMenu() {
  const totalRounds = useStore((state) => state.roundsSelected);
  const currentRound = useStore((state) => state.currentRound);
  const currentRoundIncrease = useStore((state) => state.currentRoundIncrease);

  const whichInterval = useStore((state) => state.whichInterval);
  const setWhichInterval = useStore((state) => state.setWhichInterval);

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
  const enableVibrate = useStore((state) => state.enableVibrate);

  const preferredLanguage = useStore((state) => state.preferredLanguage);

  useEffect(() => {
    let isMounted = true; //  used in the cleanup function
    if (timer && isMounted) {
      if (workoutFullTime === "00:00") {
        timer?.stop();
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
      if (enableSounds) {
        if (whichInterval === "work" && time == 0) {
          playSound(sound1);
        } else if (whichInterval === "work" && time == workTime) {
          playSound(sound2);
        }
      }
      if (enableVibrate) {
        if ((whichInterval === "work" && time == 0) || (whichInterval === "work" && time == workTime)) {
          vibrate();
        }
      }

      if (whichInterval === "prepare" && time > prepTime) {
        setWhichInterval("work");
        setTime(0);
      } else if (whichInterval === "work" && time > workTime) {
        setWhichInterval("rest");
        setTime(0);

        if (currentRound === totalRounds && skipLastRest) {
          timer?.stop();
          resetTimer();
          return;
        }
      } else if (whichInterval === "rest" && time > restTime) {
        if (currentRound === totalRounds) {
          timer?.stop();
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      isMounted = false;
    };
  }, [time]);

  let lang = {
    rounds: {
      en: "Rounds",
      pt: "Rodadas",
      fr: "Tours",
    },
    work: {
      en: "Work",
      pt: "Trabalho",
      fr: "Travail",
    },
    rest: {
      en: "Rest",
      pt: "Descanso",
      fr: "Repos",
    },
    prepare: {
      en: "Prepare",
      pt: "Preparo",
      fr: "Préparer",
    },
  };

  return (
    <>
      <div className=" mt-6 2xl:mt-8 flex flex-col justify-center min-[350px]:mx-auto gap-2 2xl:gap-3 ">
        <div className="flex ">
          {/* Rounds */}
          <InputNumber label={lang.rounds[preferredLanguage]} className="w-[7rem] xs:w-[9.8rem] max-w-[9.8rem]" inputStoreType="Rounds" maxLength={8} />
          <ClearInput />
        </div>

        <div className="flex items-center">
          {/* Work */}
          <InputNumber label={lang.work[preferredLanguage]} width="w-14" inputStoreType="WorkMinutes" />
          <InputNumber label=":" width="w-14" nogap inputStoreType="WorkSeconds" />
          <InputColor inputType="WorkColor" />
        </div>

        <div className="flex items-center">
          {/* Rest */}
          <InputNumber label={lang.rest[preferredLanguage]} width="w-14" inputStoreType="RestMinutes" />
          <InputNumber label=":" width="w-14" nogap inputStoreType="RestSeconds" />
          <InputColor inputType="RestColor" />
        </div>

        <div className="flex items-center">
          {/* Prepare */}
          <InputNumber label={lang.prepare[preferredLanguage]} width="w-14" inputStoreType="PrepareMinutes" />
          <InputNumber label=":" width="w-14" nogap inputStoreType="PrepareSeconds" />
          <InputColor inputType="PrepColor" />
        </div>
      </div>
    </>
  );
}
