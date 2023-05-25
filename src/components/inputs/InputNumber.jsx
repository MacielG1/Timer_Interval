import { useRef, useState } from "react";
import useStore from "../../store/useStore";
import pad from "../../utils/PadNum";
import generateUniqueId from "../../utils/generateUniqueID";

export default function InputNumber({ label, className, nogap, inputStoreType, maxLength = 3, width }) {
  const uniqueId = generateUniqueId();
  const [isFocused, setIsFocused] = useState(false);
  const count = useStore((state) => state[inputStoreType]);
  const increase = useStore((state) => state[`increase${inputStoreType}`]);
  const decrease = useStore((state) => state[`decrease${inputStoreType}`]);
  const setCount = useStore((state) => state[`set${inputStoreType}`]);
  const isLoadSavedTimer = useStore((state) => state.isLoadSavedTimer);

  const timerRef = useRef(null);

  function incrementHold() {
    setIsFocused(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => increase(), 100);
    }, 100);
  }

  function decrementHold() {
    setIsFocused(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(
        // decrement only if count is greater than 0
        () => decrease(),
        100
      );
    }, 100);
  }

  function timeoutClear() {
    setIsFocused(false);
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
    let inputValue = e.target.value;

    // stops the input if reaches max length
    if (inputValue.length <= maxLength) {
      setCount(inputValue);
    }
  }
  function handleOnBlur(e) {
    let value = e.target.value;
    // if the value is zero or lower set it to 00
    if (value === "" || value == 0) return setCount("00");

    // else pad and set the value
    setCount(pad(value));
  }

  function handleInvalidInput(e) {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  }

  return (
    <div
      className={`
    ${nogap ? "" : "gap-6"}
    flex items-center justify-center
    max-[360px]:gap-2
    `}
    >
      <label
        className={` 
        ${nogap ? "px-2 max-[360px]:pr-1 " : "w-20 max-[360px]:w-16"}
          text-center text-2xl  text-gray-200 max-[360px]:text-lg `}
        htmlFor={label + uniqueId}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          className={`
          ${className} 
          ${width ? width : "w-14 "}
          text-xl text-center  h-12 px-2 bg-neutral-800
          border border-r border-neutral-600 rounded-l-lg 
          focus:outline-none focus:font-medium focus:bg-[#313030]
          focus:border-gray-500
          max-[360px]:text-base max-[360px]:w-12 `}
          style={{ backgroundColor: isLoadSavedTimer ? "#2b2a2a" : "#242424", fontWeight: isFocused ? "500" : null }}
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
