import { Icons } from "../assets/Icons";
import useStore from "../store/useStore";

export default function ClearInput() {
  const clearInputFields = useStore((state) => state.clearInputFields);
  const preferredLanguage = useStore((state) => state.preferredLanguage);

  function handleClear() {
    clearInputFields();
  }

  let lang = {
    clear: {
      en: "Default",
      pt: "Restaurar",
      fr: "Défaut",
    },
  };
  return (
    <div className="group relative mx-3 flex items-center justify-center">
      <button onClick={handleClear} className="rounded py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-neutral-700">
        <Icons.clearIcon className="h-6 w-6 min-w-fit" />
      </button>

      <span className="absolute top-10 mx-1 scale-0 whitespace-nowrap rounded bg-transparent p-1 text-xs tracking-wide text-gray-300 transition-all duration-300 lg:group-hover:scale-100">
        {lang.clear[preferredLanguage]}
      </span>
    </div>
  );
}
