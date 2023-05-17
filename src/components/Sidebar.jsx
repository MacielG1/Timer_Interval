let items = [
  {
    id: 1,
    title: "Test",
    rounds: 10,
    work: 10,
    workColor: "#4287f5",
    rest: 10,
    restColor: "#DB0000",
    prepare: 10,
  },
];

let closeButton = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="12"
      fill="
      
      
      #bf0823


"
    />
    <line x1="7" y1="7" x2="17" y2="17" stroke="black" strokeWidth="2" />
    <line x1="7" y1="17" x2="17" y2="7" stroke="black" strokeWidth="2" />
  </svg>
);

export default function Sidebar() {
  return (
    <aside className="flex justify-center xl:absolute mt-5 xl:mt-0">
      <section className=" mt-2 p-2 xl:py-4 2xl-px-4  flex flex-col gap-3 overflow-x-auto overflow-y-auto  ">
        {items.map((i) => (
          <div
            className="relative bg-neutral-900 px-16 md:px-8 2xl:px-10 py-4 rounded-lg  border border-blue-700"
            key={i.id}
          >
            <div className="p-2 px-3 absolute top-0 right-0">
              <button>{closeButton}</button>
            </div>
            <div className="flex text-2xl justify-center ">
              <span>{i.title}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 py-2 sm:py-4 px-1 justify-center">
              <span>Rounds {i.rounds}</span>
              <div>
                <span>Work {i.work}</span>
                <span
                  className={`mt-1 mr-2 ml-2 rounded-full w-3 h-3 inline-block `}
                  style={{ backgroundColor: i.workColor }}
                ></span>
              </div>
              <span>Prepare {i.prepare}</span>
              <div>
                <span>Rest {i.rest}</span>
                <span
                  className={`mt-1 mr-2 ml-2 rounded-full w-3 h-3 inline-block`}
                  style={{ backgroundColor: i.restColor }}
                ></span>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-700  text-black  rounded-lg px-2 py-1 hover:bg-blue-800 transition duration-200">
                Load
              </button>
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}
