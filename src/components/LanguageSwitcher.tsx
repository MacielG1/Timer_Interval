import useStore from "../store/useStore";

import { localStorageType } from "../store/slices/localStorage";
import { Icons } from "../assets/Icons";

const countries = [
  { name: "en", flag: <Icons.uk className="w-7" /> },
  { name: "pt", flag: <Icons.br className="w-7 " /> },
  { name: "fr", flag: <Icons.fr className="w-7 " /> },
];

export default function Dropdown() {
  const preferredLanguage = useStore((state) => state.preferredLanguage);
  const setPreferredLanguage = useStore((state) => state.setPreferredLanguage);

  const selectedCountry = countries.find((country) => country.name === preferredLanguage);
  const FlagIcon = selectedCountry ? selectedCountry.flag : null;

  function handleLanguageSelection(lang: localStorageType["preferredLanguage"]) {
    localStorage.setItem("preferredLanguage", JSON.stringify(lang));
    setPreferredLanguage(lang);
  }

  return (
    <div className="flex items-center justify-center pt-3">
      <div
        className="hover:border-b-none group flex flex-col justify-center 
           rounded-lg border border-gray-500 text-sm font-medium tracking-wide text-zinc-200 hover:text-white focus:outline-none  "
      >
        <span className="relative flex w-16 items-center  justify-center rounded-lg py-6 pr-1 ">
          <span className="absolute p-4">{FlagIcon}</span>
          <Icons.arrowDown className="absolute right-0 h-5 w-5 transition-opacity duration-200 group-hover:opacity-100 " />
        </span>

        <div className=" hidden transform whitespace-nowrap rounded-md rounded-t-none bg-zinc-600 shadow-lg  transition  duration-1000 group-hover:block">
          {countries.map((c) => {
            if (c.name !== preferredLanguage) {
              return (
                <button
                  onClick={handleLanguageSelection.bind(null, c.name as localStorageType["preferredLanguage"])}
                  key={c.name}
                  className="flex w-full items-center justify-center rounded-none px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-zinc-700 last:hover:rounded-b-md "
                >
                  <span className="border border-neutral-500">{c.flag}</span>
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
