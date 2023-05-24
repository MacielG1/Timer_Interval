export default function Button({ text, onClick, color, hoverColor, textColor, width }) {
  return (
    <button
      onClick={onClick}
      className={`
        ${color ? color : "bg-green-600"}
        ${hoverColor ? hoverColor : "hover:bg-green-700"}
        ${textColor ? textColor : "text-black"}
        text-xl sm:text-3xl
        py-2 px-4 text-center rounded-3xl
    border w-24 sm:w-32 border-transparent hover:border-black 
    transition-colors duration-200 focus:outline-none focus:border-neutral-600`}
    >
      {text}
    </button>
  );
}
