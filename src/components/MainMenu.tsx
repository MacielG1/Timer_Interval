import { useEffect } from "react";
import useStore from "../store/useStore";
import InputNumber from "./inputs/InputNumber";
import InputColor from "./inputs/InputColor";
import ClearInput from "./ClearInput";
import vibrate from "../utils/Vibrate";
import sound1 from "../assets/sounds/sound1.mp3";
import sound2 from "../assets/sounds/sound2.mp3";
import start from "../assets/sounds/start.mp3";
import stop from "../assets/sounds/stop.mp3";
import { inputSettings as lang } from "../utils/lang";
import { changeFavicon } from "../utils/changeFavicon";
import convertSecToMinSec from "../utils/convertSecToMinSec";
import { useAudio } from "../utils/playSound";
import useScreenWake from "../utils/useScreenWake";

export default function MainMenu() {
  const [totalRounds, currentRound, currentRoundIncrease] = useStore((state) => [state.roundsSelected, state.currentRound, state.currentRoundIncrease]);
  const [whichInterval, setWhichInterval] = useStore((state) => [state.whichInterval, state.setWhichInterval]);

  const [workTime, restTime, prepTime] = useStore((state) => [state.workTime, state.restTime, state.prepTime]);
  const [timer, time, setTime] = useStore((state) => [state.timer, state.time, state.setTime]);

  const [workoutFullTime, increaseTotalTimePassed] = useStore((state) => [state.workoutFullTime, state.increaseTotalTimePassed]);
  const [setProgressBarValue, setProgressBarMax] = useStore((state) => [state.setProgressBarValue, state.setProgressBarMax]);

  const [setCurrentProgressColor, setCurrentBackgroundColor] = useStore((state) => [state.setCurrentProgressColor, state.setCurrentBackgroundColor]);
  const [workColor, restColor, prepColor] = useStore((state) => [state.WorkColor, state.RestColor, state.PrepColor]);

  const [skipLastRest, resetTimer] = useStore((state) => [state.skipLastRest, state.resetTimer]);
  const [enableBackgroundColors, setRemoveUIBorders, setMainTimerBorder] = useStore((state) => [
    state.enableBackgroundColors,
    state.setRemoveUIBorders,
    state.setMainTimerBorder,
  ]);

  const [enableSounds, enableVibrate, prepareonEveryRound] = useStore((state) => [state.enableSounds, state.enableVibrate, state.prepareonEveryRound]);
  const preferredLanguage = useStore((state) => state.preferredLanguage);
  const preferredSound = useStore((state) => state.preferredSound);

  const changeTitle = (title: string) => (document.title = title);

  let playSound = useAudio(start, stop, sound1, sound2);
  const { enableScreenWake, releaseScreenWake } = useScreenWake(); // Destructure the functions

  useEffect(() => {
    let isMounted = true; //  used in the cleanup function

    if (timer && isMounted) {
      enableScreenWake();

      if (workoutFullTime === "00:00") {
        timer?.stop();
        resetTimer();
        releaseScreenWake();
        return;
      }

      if (whichInterval === "prepare") {
        setProgressBarMax(prepTime);
        setCurrentProgressColor(prepColor);
        changeFavicon(prepColor);

        if (enableBackgroundColors) {
          setCurrentBackgroundColor(prepColor);
          setRemoveUIBorders(true);
        } else {
          setMainTimerBorder(prepColor);
        }
      } else if (whichInterval === "work") {
        setProgressBarMax(workTime);
        setCurrentProgressColor(workColor);
        changeFavicon(workColor);
        if (enableBackgroundColors) {
          setCurrentBackgroundColor(workColor);
          setRemoveUIBorders(true);
        } else {
          setMainTimerBorder(workColor);
        }
      } else if (whichInterval === "rest") {
        setProgressBarMax(restTime);
        setCurrentProgressColor(restColor);
        changeFavicon(restColor);
        changeTitle("Timer Interval");

        if (enableBackgroundColors) {
          setCurrentBackgroundColor(restColor);
          setRemoveUIBorders(true);
        } else {
          setMainTimerBorder(restColor);
        }
      }

      if (enableSounds) {
        if (whichInterval === "work" && time == 0) {
          if (preferredSound === "audio1") {
            playSound(sound1);
          } else if (preferredSound === "audio2") {
            playSound(start);
          }
        } else if (whichInterval === "work" && time == +workTime) {
          if (preferredSound === "audio1") playSound(sound2);
          else if (preferredSound === "audio2") playSound(stop);
        }
      }
      if (enableVibrate) {
        if ((whichInterval === "work" && time == 0) || (whichInterval === "work" && time == +workTime)) {
          vibrate();
        }
      }

      if (whichInterval === "prepare" && time > +prepTime) {
        setWhichInterval("work");
        setTime(0);
      } else if (whichInterval === "work" && time > +workTime) {
        setWhichInterval("rest");
        setTime(0);

        if (currentRound === totalRounds && skipLastRest) {
          timer?.stop();
          resetTimer();
          changeFavicon("#2361e8");
          changeTitle("Timer Interval");
          releaseScreenWake();
          return;
        }
      } else if (whichInterval === "rest" && time > +restTime) {
        if (currentRound === totalRounds) {
          timer?.stop();
          resetTimer();
          changeFavicon("#2361e8");
          changeTitle("Timer Interval");
          releaseScreenWake();

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
      changeTitle(convertSecToMinSec(time));

      setProgressBarValue(`${time}`);
    }

    return () => {
      isMounted = false;
      changeFavicon("#2361e8");
      changeTitle("Interval Timer");
      if (!timer) {
        releaseScreenWake();
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <>
      <div className="mt-6 flex flex-col justify-center gap-1.5 min-[350px]:mx-auto 2xl:mt-8 2xl:gap-3">
        <div className="flex">
          {/* Rounds */}
          <InputNumber label={lang.rounds[preferredLanguage]} className="w-[8rem] xs:w-[9.65rem]" inputStoreType="Rounds" maxLength={8} />
          <ClearInput />
        </div>

        <div className="flex items-center">
          {/* Work */}
          <InputNumber label={lang.work[preferredLanguage]} inputStoreType="WorkMinutes" />
          <InputNumber label=":" nogap inputStoreType="WorkSeconds" />
          <InputColor inputType="WorkColor" />
        </div>

        <div className="flex items-center">
          {/* Rest */}
          <InputNumber label={lang.rest[preferredLanguage]} inputStoreType="RestMinutes" />
          <InputNumber label=":" nogap inputStoreType="RestSeconds" />
          <InputColor inputType="RestColor" />
        </div>

        <div className="flex items-center">
          {/* Prepare */}
          <InputNumber label={lang.prepare[preferredLanguage]} inputStoreType="PrepareMinutes" />
          <InputNumber label=":" nogap inputStoreType="PrepareSeconds" />
          <InputColor inputType="PrepColor" />
        </div>
      </div>
    </>
  );
}
