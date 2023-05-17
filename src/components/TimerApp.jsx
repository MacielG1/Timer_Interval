import Button from "./Button";
import InputNumber from "./InputNumber";
import InputColor from "./InputColor";

export default function TimerApp() {
  return (
    <section
      className="relative flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-4 2xl:py-12 bg-neutral-950 border border-gray-200 mt-2 sm:mt-5 text-center rounded-xl
    max-w-sm  xs:max-w-lg sm:max-w-xl lg:max-w-2xl  2xl:max-w-3xl w-full "
    >
      {/* Reset Button  */}
      <div className=" p-2 xs:p-4 absolute top-0 left-0">
        <button
          className="rounded-xl py-1 px-2  text-center text-sm xs:text-lg text-white bg-neutral-700 cursor-pointer hover:bg-neutral-800 transition duration-300"
          type="reset"
        >
          Reset
        </button>
      </div>

      {/* Timer Display */}
      <div className="mx-auto ">
        <span className="  text-[14vw] sm:text-[6.5rem] 2xl:text[7.5rem] leading-none	 text-blue-700">
          00:00
        </span>
        <div className="right-0 sm:p-3 top-0 mt-1 flex flex-col text-xl md:text-xl lg:text-2xl 2xl:text-[3xl] sm:absolute ">
          <span className="">0/0</span>
          <span className="">00:00/00:00</span>
        </div>
      </div>

      {/* Setting Button */}

      {/* Center Menu  */}
      <div className="mt-1 2xl:mt-10  flex justify-center items-center text-5xl gap-4 ">
        <button
          type="button"
          className="
           rounded-lg px-3 py-2 text-gray-300 hover:scale-110
            transition duration-300"
          id="previousBtn"
        >
          <span>◀</span>
        </button>
        {/* <progress
          id="progressBar"
          className="h-8 min-w-[10rem] w-2/3 rounded-2xl bg-red-900 
          [&::-webkit-progress-bar]:rounded-lg 
          [&::-webkit-progress-value]:rounded-lg  
          [&::-webkit-progress-bar]:bg-slate-300 
          [&::-moz-progress-bar]:bg-slate-400"
          value="0"
          max="100"
        ></progress>
         */}

        <div className="w-full h-7 bg-neutral-500 rounded-lg ">
          <div
            className="h-7 bg-blue-700 rounded-lg "
            style={{ width: "45%" }}
          ></div>
        </div>
        <button
          type="button"
          className="
          rounded-lg px-3 py-2 text-gray-300 hover:scale-110
           transition duration-300"
          id="nextBtn"
        >
          <span>▶</span>
        </button>
      </div>
      {/* Control Menu */}
      <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4 2xl:mt-10   justify-center items-center">
        <Button
          text="Start"
          color="bg-green-600"
          hoverColor="hover:bg-green-700"
        />
        <Button
          text="Pause"
          color="bg-rose-700"
          hoverColor="hover:bg-rose-800"
        />
        <Button text="Reset" color="bg-sky-600" hoverColor="hover:bg-sky-700" />
      </div>
      {/* Input  Settings */}

      <div className="mt-6 2xl:mt-8 flex flex-col justify-center mx-auto gap-2 2xl:gap-3 ">
        {/* Rounds */}

        <div className="flex  ">
          <InputNumber
            label="Rounds"
            className="w-14 xs:w-24 sm:w-48"
            max="100000"
            defaultValue="10"
            inputStoreType={"Rounds"}
          />
        </div>

        {/* Work */}
        <div className="flex items-center">
          <InputNumber label="Work" width="w-12" defaultValue="00" />
          <InputNumber label=":" width="w-12" nogap />
          <InputColor defaultColor="#00993B" />
        </div>
        {/* Rest */}
        <div className="flex items-center">
          <InputNumber label="Rest" width="w-12" />
          <InputNumber label=":" width="w-12" nogap />
          <InputColor defaultColor="#DB0000" />
        </div>
        {/* Prepare */}
        <div className="flex items-center">
          <InputNumber label="Prepare" width="w-12" />
          <InputNumber label=":" width="w-12" nogap />
        </div>
      </div>

      {/* Save Settings */}
      <div className="mt-6 flex justify-center gap-3 ">
        <input
          type="text"
          className="placeholder:text-text-gray-300 ml-2 text-white bg-black border-2 border-gray-600 rounded-2xl py-2 px-1 text-center focus:bg-neutral-900 focus:outline-none focus:border-gray-500 focus:placeholder:text-transparent transition duration-300
          } "
          id="workout-name"
          maxLength="25"
          placeholder="Workout Name"
        />
        <button className="rounded-2xl px-3 text-center text-sky-600 text-md  sm:text-xl bg-neutral-800 cursor-pointer hover:bg-neutral-700/60 transition duration-300">
          Save
        </button>
      </div>
    </section>
  );
}
