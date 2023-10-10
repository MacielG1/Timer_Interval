type ToggleProps = {
  text: string;
  isActive: boolean;
  toggleActive: () => void;
};
export default function Toggle({ text, isActive, toggleActive }: ToggleProps) {
  return (
    <div className="relative flex w-max max-[500px]:w-fit max-[350px]:gap-2 max-[300px]:border-b max-[300px]:border-neutral-800  ">
      <label className=" cursor-pointer items-center  ">
        <input type="checkbox" value="" className="peer sr-only" checked={isActive} onChange={toggleActive} />
        <div className="peer-focus:ring-3  peer h-6  w-11 rounded-full  border-gray-600 bg-gray-950 px-5 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-gray-300 after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-blue-800"></div>
      </label>
      <span className=" text-md text-wrap text-gray-100 xs:ml-3 min-[350px]:w-60">{text}</span>
    </div>
  );
}
