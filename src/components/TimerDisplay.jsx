import useStore from "../store/useStore";
import convert_Sec_to_MinSec from "../utils/Convert-Sec-to-MinSec";

export default function TimerDisplay() {
  const time = useStore((state) => state.time);

  const selectedRounds = useStore((state) => state.roundsSelected);
  const currentRound = useStore((state) => state.currentRound);
  const workoutFullTime = useStore((state) => state.workoutFullTime);
  const totalTimePassed = useStore((state) => state.totalTimePassed);

  return (
    <div className="mx-auto ">
      <span className="text-[14vw] sm:text-[6.5rem] 2xl:text[7.5rem] leading-none	 text-gray-300">{convert_Sec_to_MinSec(time)}</span>
      <div className="right-0 sm:p-3 top-0 mt-1 flex flex-col text-xl md:text-xl lg:text-2xl 2xl:text-[3xl] sm:absolute sm:max-w-[10rem] lg:max-w-[12rem] whitespace-normal overflow-hidden break-words">
        <span>
          {currentRound}/{selectedRounds}
        </span>
        <span>
          {convert_Sec_to_MinSec(totalTimePassed)}/{workoutFullTime}
        </span>
      </div>
    </div>
  );
}
