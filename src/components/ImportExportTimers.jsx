import useStore from "../store/useStore";
import { useState, useEffect } from "react";

export default function ImportExportTimers() {
  const [isExportable, setIsExportable] = useState(false);

  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  const preferredLanguage = useStore((state) => state.preferredLanguage);

  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem("savedTimer"));

    if (savedTimers && savedTimers.length > 0) {
      setIsExportable(true);
    }

    return () => {
      setIsExportable(false);
    };
  }, []);

  // funciton that export the timers to a json file and create a download link with React
  function exportTimers() {
    const timers = localStorage.getItem("savedTimer");

    // Create a blob of the data
    const fileToSave = new Blob([timers], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(fileToSave);
    link.download = "savedTimers.json";

    link.click(); // Simulate a click on the anchor to start the download
  }

  function importTimers(event) {
    if (event.target.files[0].type !== "application/json") return;
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const fileContent = e.target.result;
      const jsonData = JSON.parse(fileContent);
      // validate the json file
      if (!Array.isArray(jsonData)) return;
      if (!jsonData.some((timer) => timer.id && timer.Rounds)) return;

      const currentSavedTimers = JSON.parse(localStorage.getItem("savedTimer")) || [];

      const mergedTimers = [...currentSavedTimers, ...jsonData].filter(
        (timer, index, self) => !self.slice(index + 1).some((otherTimer) => otherTimer.id === timer.id)
      );

      localStorage.setItem("savedTimer", JSON.stringify(mergedTimers));
      setSavedWorkouts(mergedTimers);
    };

    fileReader.readAsText(file); // triggers onload event above
  }

  let lang = {
    import: {
      en: "Import",
      fr: "Importer",
      pt: "Importar",
    },
    export: {
      en: "Export",
      fr: "Exporter",
      pt: "Exportar",
    },
  };

  return (
    <div className="flex justify-center gap-3 py-2 mx-auto">
      <div className="grid w-24 max-w-sm items-center justify-center gap-1.5">
        <label
          htmlFor="fileInput"
          className="text-base relative inline-flex items-center px-2 py-2 max-w-[5.2rem] text-white bg-neutral-800 hover:bg-neutral-900 hover:border border border-neutral-950 duration-300 rounded-md  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:border focus-visible:border-neutral-400 "
        >
          <span>{lang.import[preferredLanguage]}</span>
          <input type="file" id="fileInput" accept=".json" className="sr-only" onChange={importTimers} />
        </label>
      </div>
      {isExportable && (
        <button
          onClick={exportTimers}
          className=" max-w-[5.2rem]  px-2 py-2  h-10  bg-neutral-800 hover:bg-neutral-900 hover:border border border-neutral-950 duration-300 rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:border focus-visible:border-neutral-400 "
        >
          {lang.export[preferredLanguage]}
        </button>
      )}
    </div>
  );
}
