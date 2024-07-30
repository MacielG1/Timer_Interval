type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};
export default function Button(props: ButtonProps) {
  const { text, onClick, className, disabled, ...restProps } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      {...restProps}
      className={`text-md border-1 disabled:focus-visible-border-transparent w-[5.5rem] rounded-3xl border border-black py-2 text-center text-black transition-colors duration-200 hover:border-neutral-950 focus-visible:scale-110 focus-visible:border-transparent focus-visible:outline-none xs:w-28 xs:px-2 xs:text-xl sm:w-36 sm:text-2xl md:text-[1.6rem] lg:w-36 xl:w-40 2xl:text-3xl ${className} `}
    >
      {text}
    </button>
  );
}
