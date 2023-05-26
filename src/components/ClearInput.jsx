import useStore from "../store/useStore";
import ClearIcon from "../assets/ClearIcon.svg";

export default function ClearInput() {
  const clearInputFields = useStore((state) => state.clearInputFields);

  function handleClear() {
    clearInputFields();
  }

  return (
    <div className="group relative flex justify-center items-center mx-3">
      <button onClick={handleClear} className="rounded  py-1 text-sm shadow-sm focus:outline-none">
        <img src={ClearIcon} alt="Clear Icon" className="min-w-fit w-6" width="24" height="24" />
      </button>

      <span className=" absolute top-10 scale-0 transition-all duration-300 rounded bg-transparent mx-1 p-1 text-xs tracking-wide  text-gray-300 lg:group-hover:scale-100 whitespace-nowrap ">
        Clear
      </span>
    </div>
  );
}
