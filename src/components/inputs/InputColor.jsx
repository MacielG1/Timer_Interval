import useStore from "../../store/useStore";

export default function InputColor({ inputType }) {
  const color = useStore((state) => state[inputType]);
  const setColor = useStore((state) => state[`set${inputType}`]);

  function handleColor(e) {
    setColor(e.target.value);
  }

  return (
    <input
      className=" w-7 h-8 mx-2 bg-transparent border-0 outline-none cursor-pointer focus:outline-none"
      type="color"
      name="workColor"
      onChange={handleColor}
      value={color}
    />
  );
}
