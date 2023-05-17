import { useState } from "react";

export default function InputColor({ defaultColor }) {
  let [color, setColor] = useState(defaultColor || "#00993B");

  function handleColor(e) {
    setColor(e.target.value);
  }

  return (
    <input
      className=" w-7 h-8 mx-1 bg-transparent border-0 outline-none cursor-pointer "
      type="color"
      name="workColor"
      onChange={handleColor}
      value={color}
    />
  );
}
