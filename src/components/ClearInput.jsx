import useStore from "../store/useStore";

let clearIcon = (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3H15V4H20V6H4V4H9V3ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H10V17H8V9ZM14 9H16V17H14V9Z" fill="#8f9296" />
  </svg>
);

export default function ClearInput() {
  const clearInputFields = useStore((state) => state.clearInputFields);

  function handleClear() {
    clearInputFields();
  }

  return (
    <div className="group relative flex justify-center items-center mx-1">
      <button onClick={handleClear} className="rounded px-1 py-1 text-sm shadow-sm focus:outline-none">
        {clearIcon}
      </button>

      <span className=" absolute top-10 scale-0 transition-all duration-300 rounded bg-transparent mx-1 p-1 text-xs tracking-wide  text-gray-300 group-hover:scale-100 whitespace-nowrap ">
        Reset Inputs
      </span>
    </div>
  );
}
