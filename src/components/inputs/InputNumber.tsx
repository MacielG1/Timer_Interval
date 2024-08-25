import { useEffect, useRef, useState } from "react";
import useStore from "../../store/useStore";
import pad from "../../utils/PadNum";

type InputNumberProps = {
  label: string;
  className?: string;
  nogap?: boolean;
  inputStoreType: "WorkMinutes" | "WorkSeconds" | "RestMinutes" | "RestSeconds" | "PrepareMinutes" | "PrepareSeconds" | "Rounds";
  maxLength?: number;
};
export default function InputNumber(props: InputNumberProps) {
  const { label, className, nogap, inputStoreType, maxLength = 3 } = props;

  const [isFocused, setIsFocused] = useState(false);
  let count = useStore((state) => state[inputStoreType]);
  const increase = useStore((state) => state[`increase${inputStoreType}`]);
  const decrease = useStore((state) => state[`decrease${inputStoreType}`]);
  const setCount = useStore((state) => state[`set${inputStoreType}`]);
  const isLoadingSavedTimer = useStore((state) => state.isLoadingSavedTimer);

  useEffect(() => {
    const latestTimer = localStorage.getItem("latestTimer");

    if (latestTimer) {
      const parsedTimer = JSON.parse(latestTimer);
      setCount(parsedTimer[inputStoreType]);
    }
  }, []);

  const timerRef = useRef<number | null>(null);

  function incrementHold() {
    setIsFocused(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => increase(), 80);
    }, 100);
  }

  function decrementHold() {
    setIsFocused(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(
        // decrement only if count is greater than 0
        () => decrease(),
        80,
      );
    }, 100);
  }

  function timeoutClear() {
    setIsFocused(false);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null; // Reset to null after clearing the interval
    }
  }

  function incrementClick() {
    increase();
  }

  function decrementClick() {
    // decrement only if count is greater than 0
    if (+count <= 0) return;
    decrease();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = e.target.value;

    // stops the input if reaches max length
    if (inputValue.length <= maxLength) {
      setCount(inputValue);
    }
  }
  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    let value = e.target.value;
    // if the value is zero or lower set it to 00
    if (value === "" || +value == 0) return setCount("00");

    // else pad and set the value
    setCount(pad(value));
  }

  function handleInvalidInput(e: React.KeyboardEvent<HTMLInputElement>) {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  }

  return (
    <div className={`${nogap ? "" : "xs:gap-3 lg:gap-4"} flex items-center justify-center max-[360px]:gap-1`}>
      <label
        htmlFor={label + Math.random()}
        className={`${nogap ? "px-2 max-[360px]:pr-1" : "w-24 max-[360px]:w-16"} text-center text-sm text-gray-200 xs:text-base sm:text-lg lg:text-xl`}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          className={`h-12 w-11 min-w-[2.5rem] rounded-l-lg border border-r border-neutral-600 bg-neutral-800 px-2 text-center text-xl focus:border-gray-500 focus:bg-[#313030] focus:font-medium focus:outline-none max-[360px]:text-base xs:w-14 ${isFocused ? "font-medium" : "font-normal"} ${className} `}
          style={{ backgroundColor: isLoadingSavedTimer ? "#353535" : "#242424" }}
          type="number"
          id={label + Math.random()}
          name={label}
          value={count}
          onChange={handleChange}
          onKeyDown={handleInvalidInput}
          onBlur={handleOnBlur}
        />

        <div className="h-12 rounded-e-lg border border-l-0 border-neutral-600 text-sm">
          <button
            className="flex h-1/2 w-5 items-center justify-center rounded-tr-md border-b border-neutral-600 hover:bg-neutral-700"
            onMouseLeave={timeoutClear}
            onMouseUp={timeoutClear}
            onMouseDown={incrementHold}
            onClick={incrementClick}
          >
            +
          </button>
          <button
            className="flex h-1/2 w-5 items-center justify-center rounded-br-md hover:bg-neutral-700"
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
