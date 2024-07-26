import useStore from "../store/useStore";
import Timer from "../utils/Timer";

export default function Progress() {
  const [progressBarValue, progressBarMax, currentProgressColor] = useStore((state) => [state.progressBarValue, state.progressBarMax, state.currentProgressColor]);
  const [setTotalTimePassed, totalTimePassed] = useStore((state) => [state.setTotalTimePassed, state.totalTimePassed]);

  const [currentRound, setCurrentRound] = useStore((state) => [state.currentRound, state.setCurrentRound]);
  const [whichInterval, setWhichInterval] = useStore((state) => [state.whichInterval, state.setWhichInterval]);

  const [isPaused, totalRounds] = useStore((state) => [state.isPaused, state.roundsSelected]);
  const [time, setTime] = useStore((state) => [state.time, state.setTime]);

  const [timer, resetTimer, setTimer] = useStore((state) => [state.timer, state.resetTimer, state.setTimer]);
  const [workTime, restTime] = useStore((state) => [state.workTime, state.restTime]);
  const [prepareonEveryRound, skipLastRest] = useStore((state) => [state.prepareonEveryRound, state.skipLastRest]);
  const [timeIncrease, changeInterval] = useStore((state) => [state.timeIncrease, state.changeInterval]);

  function handlePrev() {
    if (isPaused) return;
    timer?.stop();
    setTimer(null);
    if (whichInterval === "prepare") {
      if (currentRound === 1) {
        setTotalTimePassed(0);
        changeInterval();
        setTimer(
          new Timer(1000, () => {
            timeIncrease();
          }),
        );
      } else if (prepareonEveryRound) {
        setWhichInterval("rest");
        setTotalTimePassed(totalTimePassed - +restTime);
        setCurrentRound(currentRound - 1);
        changeInterval();
        setTimer(
          new Timer(1000, () => {
            timeIncrease();
          }),
        );
      }
    } else if (whichInterval === "work" && currentRound == 1) {
      setTotalTimePassed(0);
      setWhichInterval("prepare");
      setCurrentRound(1);
      changeInterval();
      setTimer(
        new Timer(1000, () => {
          timeIncrease();
        }),
      );
    }
    if (currentRound > 1 || (whichInterval === "rest" && currentRound == 1)) {
      if (whichInterval === "work") {
        setTotalTimePassed(totalTimePassed - time - +restTime);
        setCurrentRound(currentRound - 1);
        setWhichInterval("rest");
        changeInterval();
        setTimer(
          new Timer(1000, () => {
            timeIncrease();
          }),
        );
      } else if (whichInterval === "rest") {
        setTotalTimePassed(totalTimePassed - time - +workTime);
        setWhichInterval("work");
        changeInterval();
        setTimer(
          new Timer(1000, () => {
            timeIncrease();
          }),
        );
      }
    }
  }
  function handleNext() {
    if (isPaused) return;
    timer?.stop();
    setTimer(null);
    if (currentRound <= totalRounds) {
      if (whichInterval === "prepare") {
        setTotalTimePassed(0);
        setWhichInterval("work");
        changeInterval();
        setTimer(
          new Timer(1000, () => {
            timeIncrease();
          }),
        );
      } else if (whichInterval === "work") {
        setTotalTimePassed(+workTime * currentRound + +restTime * (currentRound - 1));
        setWhichInterval("rest");
        changeInterval();

        setTimer(
          new Timer(1000, () => {
            timeIncrease();
          }),
        );

        if (currentRound === totalRounds && skipLastRest) {
          timer?.stop();
          resetTimer();
          return;
        }
      } else if (whichInterval === "rest") {
        setCurrentRound(currentRound + 1);
        if (currentRound === totalRounds) {
          timer?.stop();
          resetTimer();
          return;
        } else {
          setTotalTimePassed(+workTime * currentRound + +restTime * currentRound);
          changeInterval();

          setTimer(
            new Timer(1000, () => {
              timeIncrease();
            }),
          );

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

  return (
    <div className="mt-1 flex items-center justify-center gap-4 text-5xl sm:px-4 2xl:mt-10">
      <button
        onClick={handlePrev}
        type="button"
        className={`${isPaused || !timer ? "invisible" : "visible"} rounded-lg py-2 text-gray-300 transition duration-300 hover:scale-105 sm:px-3`}
        id="previousBtn"
      >
        <span>◀</span>
      </button>

      <div className="h-9 w-full max-w-lg overflow-hidden rounded-xl bg-neutral-500">
        <div className="h-9 rounded-xl" style={{ width: `${(+progressBarValue / +progressBarMax) * 100 || 0}%`, backgroundColor: currentProgressColor }}></div>
      </div>

      <button
        onClick={handleNext}
        type="button"
        className={`${isPaused || !timer ? "invisible" : "visible"} rounded-lg py-2 text-gray-300 transition duration-300 hover:scale-105 sm:px-3`}
        id="nextBtn"
      >
        <span>▶</span>
      </button>
    </div>
  );
}
