import PropTypes from "prop-types";
import useStore from "../../store/useStore";

export default function InputColor({ inputType }) {
  const color = useStore((state) => state[inputType]);
  const setColor = useStore((state) => state[`set${inputType}`]);

  function handleColor(e) {
    setColor(e.target.value);
  }

  return (
    <input
      className="min-w-[1.8rem]  w-7 h-8 mx-3 max-[320px]:mx-1 bg-transparent border-0 outline-none cursor-pointer focus:outline-none"
      type="color"
      name="workColor"
      aria-label="Color Picker"
      onChange={handleColor}
      value={color}
      id={inputType}
    />
  );
}

InputColor.propTypes = {
  inputType: PropTypes.string.isRequired,
};
