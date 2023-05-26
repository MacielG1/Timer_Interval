import PropTypes from "prop-types";

export default function Toggle({ text, isActive, toggleActive }) {
  return (
    <div className="flex relative mx-2 w-max max-[350px]:w-fit max-[300px]:border-b max-[300px]:border-neutral-800 max-[350px]:gap-4">
      <label className=" items-center cursor-pointer  ">
        <input type="checkbox" value="" className="sr-only peer" checked={isActive} onChange={toggleActive} />
        <div className="w-11  h-6  peer-focus:outline-none peer-focus:ring-3  peer-focus:ring-blue-800 rounded-full peer bg-gray-950 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-500"></div>
      </label>
      <span className="ml-3 text-md text-gray-900 dark:text-gray-300">{text}</span>
    </div>
  );
}

Toggle.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleActive: PropTypes.func.isRequired,
};
