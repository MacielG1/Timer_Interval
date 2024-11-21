import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";
import convertSecToMinSec from "../utils/convertSecToMinSec";

export default function TimerDisplay() {
  const time = useStore(useShallow((state) => state.time));
  const selectedRounds = useStore(useShallow((state) => state.roundsSelected));
  const currentRound = useStore(useShallow((state) => state.currentRound));
  const workoutFullTime = useStore(useShallow((state) => state.workoutFullTime));
  const totalTimePassed = useStore(useShallow((state) => state.totalTimePassed));

  return (
    <div className="mx-auto">
      <span className="2xl:text[7.5rem] text-[14vw] leading-none text-gray-300 sm:text-[6.5rem]">{convertSecToMinSec(time)}</span>
      <div className="right-0 top-0 mt-1 flex flex-col overflow-hidden whitespace-normal break-words text-xl sm:absolute sm:max-w-[10rem] sm:p-3 md:text-xl lg:max-w-[12rem] lg:text-2xl 2xl:text-[3xl]">
        <span>
          {currentRound}/{selectedRounds}
        </span>
        <span>
          {convertSecToMinSec(totalTimePassed)}/{workoutFullTime}
        </span>
      </div>
    </div>
  );
}
