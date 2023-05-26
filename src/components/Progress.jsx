import useStore from "../store/useStore";

export default function Progress() {
  const progressBarValue = useStore((state) => state.progressBarValue);
  const progressBarMax = useStore((state) => state.progressBarMax);
  const currentProgressColor = useStore((state) => state.currentProgressColor);

  const setTotalTimePassed = useStore((state) => state.setTotalTimePassed);
  const totalTimePassed = useStore((state) => state.totalTimePassed);

  const currentRound = useStore((state) => state.currentRound);
  const setCurrentRound = useStore((state) => state.setCurrentRound);

  const whichInterval = useStore((state) => state.whichInterval);
  const setWhichInterval = useStore((state) => state.setWhichInterval);

  const isPaused = useStore((state) => state.isPaused);
  const totalRounds = useStore((state) => state.roundsSelected);

  const time = useStore((state) => state.time);
  const setTime = useStore((state) => state.setTime);

  const timer = useStore((state) => state.timer);
  const resetTimer = useStore((state) => state.resetTimer);

  const workTime = useStore((state) => state.workTime);
  const restTime = useStore((state) => state.restTime);

  const prepareonEveryRound = useStore((state) => state.prepareonEveryRound);
  const skipLastRest = useStore((state) => state.skipLastRest);

  function handlePrev() {
    if (!isPaused) {
      if (whichInterval === "prepare") {
        if (currentRound === 1) {
          setTime(0);
          setTotalTimePassed(0);
        } else if (prepareonEveryRound) {
          setWhichInterval("rest");
          setTime(0);
          setTotalTimePassed(totalTimePassed - restTime);
          setCurrentRound(currentRound - 1);
        }
      }
      if (whichInterval === "work" && currentRound == 1) {
        setTotalTimePassed(0);
        setWhichInterval("prepare");
        setTime(0);
        setCurrentRound(1);
      }
      if (currentRound > 1 || (whichInterval === "rest" && currentRound == 1)) {
        if (whichInterval === "work") {
          setTotalTimePassed(totalTimePassed - time - restTime);
          setCurrentRound(currentRound - 1);
          setWhichInterval("rest");
          setTime(0);
        } else if (whichInterval === "rest") {
          setTotalTimePassed(totalTimePassed - time - workTime);
          setWhichInterval("work");
          setTime(0);
        }
      }
    }
  }
  function handleNext() {
    if (!isPaused) {
      if (currentRound <= totalRounds) {
        if (whichInterval === "prepare") {
          setTotalTimePassed(0);
          setWhichInterval("work");
          setTime(0);
        }
        if (whichInterval === "work") {
          setTotalTimePassed(workTime * currentRound + restTime * (currentRound - 1));
          setWhichInterval("rest");
          setTime(0);

          if (currentRound === totalRounds && skipLastRest) {
            timer.stop();
            resetTimer();
            return;
          }
        } else if (whichInterval === "rest") {
          setCurrentRound(currentRound + 1);

          if (currentRound === totalRounds) {
            timer.stop;
            resetTimer();
            return;
          } else {
            setTotalTimePassed(workTime * currentRound + restTime * currentRound);

            if (prepareonEveryRound) {
              setWhichInterval("prepare");
              setTime(0);
            } else {
              setWhichInterval("work");
              setTime(0);
            }
          }
        }
      }
    }
  }

  return (
    <div className="mt-1 2xl:mt-10  flex justify-center items-center text-5xl gap-4 sm:px-4 ">
      <button
        onClick={handlePrev}
        type="button"
        className="
       rounded-lg  sm:px-3  py-2 text-gray-300 hover:scale-110
        transition duration-300"
        id="previousBtn"
      >
        <span>◀</span>
      </button>

      <div className="w-full h-9 bg-neutral-500 rounded-xl overflow-hidden  ">
        <div className="h-9  rounded-xl " style={{ width: `${(progressBarValue / progressBarMax) * 100 || 0}%`, backgroundColor: currentProgressColor }}></div>
      </div>

      <button
        onClick={handleNext}
        type="button"
        className="
      rounded-lg sm:px-3 py-2 text-gray-300 hover:scale-110
       transition duration-300"
        id="nextBtn"
      >
        <span>▶</span>
      </button>
    </div>
  );
}
