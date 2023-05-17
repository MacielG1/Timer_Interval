import { useState, useRef } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  function incrementHold() {
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => setCount((prev) => prev + 1), 100);
    }, 200);
  }

  function decrementHold() {
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => setCount((prev) => prev - 1), 100);
    }, 200);
  }

  function timeoutClear() {
    clearInterval(timerRef.current);
  }

  function incrementClick() {
    setCount((prev) => prev + 1);
  }

  function decrementClick() {
    setCount((prev) => prev - 1);
  }

  return (
    <>
      <button
        onMouseLeave={timeoutClear}
        onMouseUp={timeoutClear}
        onMouseDown={decrementHold}
        onClick={decrementClick}
      >
        -
      </button>
      <div>count = {count} </div>
      <button
        onMouseLeave={timeoutClear}
        onMouseUp={timeoutClear}
        onMouseDown={incrementHold}
        onClick={incrementClick}
      >
        +
      </button>
    </>
  );
}
