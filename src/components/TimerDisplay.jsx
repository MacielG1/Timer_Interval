import useStore from "../store/useStore";
import convert_Sec_to_MinSec from "../utils/Convert-Sec-to-MinSec";

export default function TimerDisplay() {
  let time = useStore((state) => state.time);
  let totalRounds = useStore((state) => state.Rounds);
  let currentRound = useStore((state) => state.currentRound);
  let workoutFullTime = useStore((state) => state.workoutFullTime);
  let totalTimePassed = useStore((state) => state.totalTimePassed);

  return (
    <div className="mx-auto ">
      <span className="text-[14vw] sm:text-[6.5rem] 2xl:text[7.5rem] leading-none	 text-gray-300">{convert_Sec_to_MinSec(time)}</span>
      <div className="right-0 sm:p-3 top-0 mt-1 flex flex-col text-xl md:text-xl lg:text-2xl 2xl:text-[3xl] sm:absolute sm:max-w-[10rem] lg:max-w-[12rem] whitespace-normal overflow-hidden break-words">
        <span className="">
          {currentRound}/{totalRounds}
        </span>
        <span>
          {convert_Sec_to_MinSec(totalTimePassed)}/{workoutFullTime}
        </span>
      </div>
    </div>
  );
}
