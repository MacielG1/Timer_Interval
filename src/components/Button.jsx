export default function Button({ text, onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`
      ${className}
      text-xl sm:text-3xl text-black
      py-2 px-2 text-center rounded-3xl
    border w-24 sm:w-32 md:w-36 border-1 border-black hover:border-neutral-950
    transition-colors duration-200 focus:outline-none focus:border-transparent
    disabled:focus-border-transparent disabled:hover:border-transparent 
    `}
    >
      {text}
    </button>
  );
}
