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
import end from "../assets/sounds/end.mp3";
import { inputSettings as lang } from "../utils/lang";
import { changeFavicon } from "../utils/changeFavicon";
import convertSecToMinSec from "../utils/convertSecToMinSec";
import { useAudio } from "../utils/playSound";
import useScreenWake from "../utils/useScreenWake";
import { useShallow } from "zustand/shallow";

export default function MainMenu() {
  const [totalRounds, currentRound, currentRoundIncrease] = useStore(useShallow((state) => [state.roundsSelected, state.currentRound, state.currentRoundIncrease]));
  const [whichInterval, setWhichInterval] = useStore(useShallow((state) => [state.whichInterval, state.setWhichInterval]));

  const [workTime, restTime, prepTime] = useStore(useShallow((state) => [state.workTime, state.restTime, state.prepTime]));
  const [timer, time, setTime] = useStore(useShallow((state) => [state.timer, state.time, state.setTime]));

  const [workoutFullTime, increaseTotalTimePassed] = useStore(useShallow((state) => [state.workoutFullTime, state.increaseTotalTimePassed]));
  const [setProgressBarValue, setProgressBarMax] = useStore(useShallow((state) => [state.setProgressBarValue, state.setProgressBarMax]));

  const [setCurrentProgressColor, setCurrentBackgroundColor] = useStore(useShallow((state) => [state.setCurrentProgressColor, state.setCurrentBackgroundColor]));
  const [workColor, restColor, prepColor] = useStore(useShallow((state) => [state.WorkColor, state.RestColor, state.PrepColor]));

  const [skipLastRest, resetTimer] = useStore(useShallow((state) => [state.skipLastRest, state.resetTimer]));
  const [enableBackgroundColors, setRemoveUIBorders, setMainTimerBorder] = useStore(
    useShallow((state) => [state.enableBackgroundColors, state.setRemoveUIBorders, state.setMainTimerBorder]),
  );

  const [enableSounds, enableVibrate, prepareonEveryRound] = useStore(useShallow((state) => [state.enableSounds, state.enableVibrate, state.prepareonEveryRound]));
  const preferredLanguage = useStore(useShallow((state) => state.preferredLanguage));
  const preferredSound = useStore(useShallow((state) => state.preferredSound));

  const changeTitle = (title: string) => (document.title = title);

  let playSound = useAudio(start, stop, sound1, sound2, end);
  const { enableScreenWake, releaseScreenWake } = useScreenWake();

  useEffect(() => {
    let isMounted = true;

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
          if (enableVibrate) vibrate();
          if (preferredSound === "audio1") {
            playSound(sound1);
          } else if (preferredSound === "audio2") {
            playSound(start);
          }
        } else if (whichInterval === "work" && time == +workTime) {
          if (enableVibrate) vibrate();
          if (preferredSound === "audio1") {
            if (currentRound === totalRounds && skipLastRest) {
              playSound(end);
            } else {
              playSound(sound2);
            }
          } else if (preferredSound === "audio2") {
            if (currentRound === totalRounds && skipLastRest) {
              playSound(end);
            } else {
              playSound(stop);
            }
          }
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
          if (enableSounds) {
            if (enableVibrate) vibrate();
            playSound(end);
          }
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
