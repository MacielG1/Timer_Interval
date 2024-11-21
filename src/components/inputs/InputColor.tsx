import { useShallow } from "zustand/shallow";
import useStore from "../../store/useStore";

type InputColorProps = {
  inputType: "WorkColor" | "RestColor" | "PrepColor";
};
export default function InputColor({ inputType }: InputColorProps) {
  const color = useStore(useShallow((state) => state[inputType]));
  const setColor = useStore(useShallow((state) => state[`set${inputType}`]));

  function handleColor(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  return (
    <input
      className="mx-3 h-8 w-7 min-w-[1.8rem] cursor-pointer border-0 bg-transparent outline-none focus-visible:scale-110 focus-visible:outline-none max-[320px]:mx-1"
      type="color"
      name="workColor"
      aria-label="Color Picker"
      onChange={handleColor}
      value={color}
      id={inputType}
    />
  );
}
