import { useRef } from "react";
import useStore from "../../store/useStore";

let n = 0;
const generateUniqueId = () => {
  n++;
  return `id-${n}`;
};

export default function InputNumber({ label, className, nogap, inputStoreType }) {
  const uniqueId = generateUniqueId();

  const count = useStore((state) => state[inputStoreType]);
  const increase = useStore((state) => state[`increase${inputStoreType}`]);
  const decrease = useStore((state) => state[`decrease${inputStoreType}`]);
  const setCount = useStore((state) => state[`set${inputStoreType}`]);
  const isLoadSavedTimer = useStore((state) => state.isLoadSavedTimer);

  const timerRef = useRef(null);

  function incrementHold() {
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => increase(), 100);
    }, 100);
  }

  function decrementHold() {
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(
        // decrement only if count is greater than 0
        () => decrease(),
        100
      );
    }, 100);
  }

  function timeoutClear() {
    clearInterval(timerRef.current);
  }

  function incrementClick() {
    increase();
  }

  function decrementClick() {
    // decrement only if count is greater than 0

    if (count <= 0) return;
    decrease();
  }

  function handleChange(e) {
    setCount(e.target.value);
  }
  function handleOnBlur(e) {
    let value = e.target.value;
    // if the value is zero or lower set it to 1
    if (value === "" || value == 0) return setCount(1);
    // remove any leading zeros
  }

  function handleInvalidInput(e) {
    // const regex = /^[0-9\b]+$/;
    // if (!regex.test(e.key) && e.key !== "Backspace") {
    //   return;
    // }
  }

  return (
    <div
      className={`
    ${nogap ? "" : "gap-6"}
    flex items-center justify-center`}
    >
      <label
        className={` 
        ${nogap ? "px-2" : "w-20"}
          text-center
         text-2xl  text-gray-200 `}
        htmlFor={label}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          className={`
          ${className} 
          
          w-12
          text-xl text-center  h-12 px-2 bg-neutral-800
          border border-r border-neutral-600 rounded-l-lg 
          focus:outline-none focus:text-2xl focus:bg-[#313030]
          focus:border-gray-500`}
          style={{ backgroundColor: isLoadSavedTimer ? "#2b2a2a" : "#242424" }}
          type="number"
          id={label + uniqueId}
          name={label}
          value={count}
          onChange={handleChange}
          onKeyDown={handleInvalidInput}
          onBlur={handleOnBlur}
        />

        <div className=" border text-sm h-12 border-l-0 rounded-e-lg border-neutral-600">
          <button
            className="w-5 h-1/2 flex  items-center justify-center hover:bg-neutral-700 rounded-tr-md border-b border-neutral-600"
            onMouseLeave={timeoutClear}
            onMouseUp={timeoutClear}
            onMouseDown={incrementHold}
            onClick={incrementClick}
          >
            +
          </button>
          <button
            className="w-5 h-1/2 flex items-center justify-center hover:bg-neutral-700  rounded-br-md "
            onMouseLeave={timeoutClear}
            onMouseUp={timeoutClear}
            onMouseDown={decrementHold}
            onClick={decrementClick}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
