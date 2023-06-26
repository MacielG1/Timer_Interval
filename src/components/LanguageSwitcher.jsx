import useStore from "../store/useStore";
import arrowDownIcon from "../assets/icons/arrowDown.svg";
import brIcon from "../assets/flags/br.svg";
import ukIcon from "../assets/flags/uk.svg";
import frIcon from "../assets/flags/fr.svg";

const countries = [
  { name: "en", flag: ukIcon },
  { name: "pt", flag: brIcon },
  { name: "fr", flag: frIcon },
];

export default function Dropdown() {
  const preferredLanguage = useStore((state) => state.preferredLanguage);
  const setPreferredLanguage = useStore((state) => state.setPreferredLanguage);

  const selectedCountry = countries.find((country) => country.name === preferredLanguage);
  const FlagIcon = selectedCountry ? selectedCountry.flag : null;

  function handleLanguageSelection(lang) {
    localStorage.setItem("preferredLanguage", JSON.stringify(lang));
    setPreferredLanguage(lang);
  }

  return (
    <div className="flex  items-center justify-center pt-3">
      <div
        className=" group hover:border-b-none rounded-lg border border-gray-500 
           flex flex-col justify-center text-sm font-medium tracking-wide text-zinc-200  hover:text-white focus:outline-none  "
      >
        <span className="flex items-center justify-center rounded-lg  pr-1 py-6 w-16 relative ">
          <img src={FlagIcon} alt="Flag" width={28} height={28} className="absolute  border border-neutral-500" />
          <img src={arrowDownIcon} alt="Arrow Down" width={16} height={16} className="absolute right-0 transition-opacity duration-200 group-hover:opacity-0 " />
        </span>

        <div className=" hidden transform whitespace-nowrap rounded-md rounded-t-none bg-zinc-600 shadow-lg  group-hover:block  transition duration-1000">
          {countries.map((c) => {
            if (c.name !== preferredLanguage) {
              return (
                <button
                  onClick={handleLanguageSelection.bind(null, c.name)}
                  key={c.name}
                  className="flex w-full  items-center justify-center rounded-none px-4 py-2 text-sm text-white hover:bg-zinc-700 last:hover:rounded-b-md transition-colors duration-200 "
                >
                  <img src={c.flag} alt="Flag" width={28} height={28} className=" border border-neutral-500" />
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
