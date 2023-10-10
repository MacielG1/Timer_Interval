import useStore from "../store/useStore";
import convertSecToMinSec from "../utils/convertSecToMinSec";

export default function TimerDisplay() {
  const time = useStore((state) => state.time);
  const selectedRounds = useStore((state) => state.roundsSelected);
  const currentRound = useStore((state) => state.currentRound);
  const workoutFullTime = useStore((state) => state.workoutFullTime);
  const totalTimePassed = useStore((state) => state.totalTimePassed);

  return (
    <div className="mx-auto ">
      <span className="2xl:text[7.5rem] text-[14vw] leading-none text-gray-300	 sm:text-[6.5rem]">{convertSecToMinSec(time)}</span>
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
