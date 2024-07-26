import useStore from "../store/useStore";
import { useState, useEffect, ChangeEvent } from "react";

export default function ImportExportTimers() {
  const [isExportable, setIsExportable] = useState(false);

  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  const preferredLanguage = useStore((state) => state.preferredLanguage);

  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem("savedTimer") || "[]");

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

    if (!timers) return;
    // Create a blob of the data
    const fileToSave = new Blob([timers], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(fileToSave);
    link.download = "savedTimers.json";

    link.click(); // Simulate a click on the anchor to start the download
  }

  function importTimers(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/json") return;

    const fileReader = new FileReader();

    fileReader.onload = (e: ProgressEvent<FileReader>): void => {
      if (e.target) {
        const fileContent = (e.target as FileReader).result as string;
        const jsonData = JSON.parse(fileContent);
        // validate the json file
        if (!Array.isArray(jsonData)) return;
        if (!jsonData.some((timer) => timer.id && timer.Rounds)) return;

        const currentSavedTimers = JSON.parse(localStorage.getItem("savedTimer") || "[]");

        const mergedTimers = [...currentSavedTimers, ...jsonData].filter(
          (timer, index, self) => !self.slice(index + 1).some((otherTimer) => otherTimer.id === timer.id),
        );

        localStorage.setItem("savedTimer", JSON.stringify(mergedTimers));
        setSavedWorkouts(mergedTimers);
      }

      fileReader.readAsText(file); // triggers onload event above
    };
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
    <div className="mx-auto flex justify-center gap-3 py-2">
      <div className="grid w-24 max-w-sm items-center justify-center gap-1.5">
        <label
          htmlFor="fileInput"
          className="ring-offset-background relative inline-flex max-w-[5.2rem] cursor-pointer items-center rounded-md border border-neutral-950 bg-neutral-800 px-2 py-2 text-base font-medium text-white transition-colors duration-300 hover:border hover:bg-neutral-900 focus-visible:border focus-visible:border-neutral-400 focus-visible:outline-none"
        >
          <span>{lang.import[preferredLanguage]}</span>
          <input type="file" id="fileInput" accept=".json" className="sr-only" onChange={importTimers} />
        </label>
      </div>
      {isExportable && (
        <button
          onClick={exportTimers}
          className="ring-offset-background h-10 max-w-[5.2rem] rounded-md border border-neutral-950 bg-neutral-800 px-2 py-2 text-base font-medium transition-colors duration-300 hover:border hover:bg-neutral-900 focus-visible:border focus-visible:border-neutral-400 focus-visible:outline-none"
        >
          {lang.export[preferredLanguage]}
        </button>
      )}
    </div>
  );
}
