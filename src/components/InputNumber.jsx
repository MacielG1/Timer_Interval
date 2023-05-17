import { useState, useRef } from "react";
import { useInputStore } from "../store/inputStore";
export default function InputNumber({
  label,
  className,
  max,
  defaultValue,
  nogap,
  inputStoreType,
}) {
  const count = useInputStore((state) => state[inputStoreType]);
  const setCount = useInputStore((state) => state[`set${inputStoreType}`]);
  const increaseCount = useInputStore(
    (state) => state[`increase${inputStoreType}`]
  );
  const decreaseCount = useInputStore(
    (state) => state[`decrease${inputStoreType}`]
  );

  const timerRef = useRef(null);

  function incrementHold() {
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => increaseCount(), 100);
    }, 100);
  }

  function decrementHold() {
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(
        // decrement only if count is greater than 0
        () => setCount((prev) => (prev <= 0 ? prev : prev - 1)),
        100
      );
    }, 100);
  }

  function timeoutClear() {
    clearInterval(timerRef.current);
  }

  function incrementClick() {
    setCount((prev) => prev + 1);
  }

  function decrementClick() {
    // decrement only if count is greater than 0
    setCount((prev) => (prev <= 0 ? prev : prev - 1));
  }

  function handleChange(e) {
    // if input is greater than max, set to max
    const value = parseInt(e.target.value, 10); // Parse the value as an integer

    // Check if the parsed value is NaN
    if (isNaN(value)) {
      setCount(0); // or any other default value you prefer
      return;
    }
    // If input is greater than max, set to max
    if (max && value > max) {
      setCount(Number(max));
      return;
    }

    setCount(value);
  }

  function handleInvalidInput(e) {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
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
          type="number"
          id={label}
          name={label}
          value={count}
          onChange={handleChange}
          onKeyDown={handleInvalidInput}
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
