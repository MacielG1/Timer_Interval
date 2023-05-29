import useStore from "../store/useStore";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SaveTimer() {
  let [timerName, setTimerName] = useState("");

  let Rounds = useStore((state) => state.Rounds);
  let workMin = useStore((state) => state.WorkMinutes);
  let workSec = useStore((state) => state.WorkSeconds);
  let workColor = useStore((state) => state.WorkColor);
  let restMin = useStore((state) => state.RestMinutes);
  let restSec = useStore((state) => state.RestSeconds);
  let restColor = useStore((state) => state.RestColor);
  let prepMin = useStore((state) => state.PrepareMinutes);
  let prepSec = useStore((state) => state.PrepareSeconds);
  let prepColor = useStore((state) => state.PrepColor);
  let setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  let preferredLanguage = useStore((state) => state.preferredLanguage);

  useEffect(() => {
    let timerStorage = JSON.parse(localStorage.getItem("savedTimer")) || [];

    setSavedWorkouts(timerStorage); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSaveTimer() {
    let timerStorage = JSON.parse(localStorage.getItem("savedTimer")) || [];
    let data = {
      Title: timerName,
      id: uuidv4(),
      Rounds: Rounds,
      WorkMinutes: workMin,
      WorkSeconds: workSec,
      WorkColor: workColor,
      RestMinutes: restMin,
      RestSeconds: restSec,
      RestColor: restColor,
      PrepareMinutes: prepMin,
      PrepareSeconds: prepSec,
      PrepColor: prepColor,
    };

    localStorage.setItem("savedTimer", JSON.stringify([...timerStorage, data]));
    setSavedWorkouts([...timerStorage, data]);
  }

  let lang = {
    placeholder: {
      en: "Timer Name",
      pt: "Nome do Timer",
      fr: "Nom du minuteur",
    },
  };

  return (
    <div className="mt-7 flex justify-center gap-4 ">
      <input
        type="text"
        className="placeholder:text-text-gray-300 w-2/4  xs:w-5/12 sm:w-3/12  ml-2 text-white bg-black border-2 text-ellipsis border-gray-600 rounded-2xl py-2 px-1 text-center focus:bg-neutral-800  hover:bg-neutral-900 focus:outline-none focus:border-gray-500 focus:placeholder:text-transparent transition duration-300
      } "
        id="workout-name"
        maxLength="25"
        placeholder={lang.placeholder[preferredLanguage]}
        value={timerName}
        onChange={(e) => setTimerName(e.target.value)}
      />
      <button
        onClick={handleSaveTimer}
        className="rounded-2xl px-2 text-center text-blue-400 text-md  sm:text-xl bg-neutral-800  cursor-pointer hover:bg-neutral-700/70 transition duration-300"
      >
        Save
      </button>
    </div>
  );
}
