import useStore from "../store/useStore";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SaveTimer() {
  const [timerName, setTimerName] = useState("");

  const Rounds = useStore((state) => state.Rounds);
  const workMin = useStore((state) => state.WorkMinutes);
  const workSec = useStore((state) => state.WorkSeconds);
  const workColor = useStore((state) => state.WorkColor);
  const restMin = useStore((state) => state.RestMinutes);
  const restSec = useStore((state) => state.RestSeconds);
  const restColor = useStore((state) => state.RestColor);
  const prepMin = useStore((state) => state.PrepareMinutes);
  const prepSec = useStore((state) => state.PrepareSeconds);
  const prepColor = useStore((state) => state.PrepColor);
  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  const preferredLanguage = useStore((state) => state.preferredLanguage);

  useEffect(() => {
    let timerStorage = JSON.parse(localStorage.getItem("savedTimer")) || [];

    setSavedWorkouts(timerStorage); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSaveTimer() {
    let timerStorage = JSON.parse(localStorage.getItem("savedTimer")) || [];

    let data = {
      Title: `Timer ${timerStorage.length + 1}`,
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
    setTimerName("");
  }

  let lang = {
    placeholder: {
      en: "Timer Name",
      pt: "Nome do Timer",
      fr: "Nom du minuteur",
    },
    save: {
      en: "Save",
      pt: "Salvar",
      fr: "Enregistrer",
    },
  };

  return (
    <div className="mt-7 flex justify-center gap-4 ">
      <input
        type="text"
        className="placeholder:text-text-gray-300 w-2/4  xs:w-5/12 sm:w-3/12  ml-2 text-white bg-black border-2 text-ellipsis border-gray-600 rounded-2xl py-2 px-1 text-center focus-visible:bg-neutral-800  hover:bg-neutral-900 focus-visible:outline-none focus-visible:border-gray-500 focus-visible:placeholder:text-transparent transition duration-300
      } "
        id="workout-name"
        maxLength="25"
        placeholder={lang.placeholder[preferredLanguage]}
        value={timerName}
        onChange={(e) => setTimerName(e.target.value)}
      />
      <button
        onClick={handleSaveTimer}
        className="rounded-2xl px-2 text-center text-blue-400 hover:text-blue-500/90 text-md sm:text-xl bg-neutral-800 cursor-pointer hover:bg-neutral-700/70 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      >
        {lang.save[preferredLanguage]}
      </button>
    </div>
  );
}
