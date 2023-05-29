import PropTypes from "prop-types";

export default function Button(props) {
  const { text, onClick, className, ...restProps } = props;

  return (
    <button
      onClick={onClick}
      {...restProps}
      className={`
      ${className}
      text-md xs:text-xl sm:text-2xl md:text-3xl  
      w-[5.5rem] xs:w-28 sm:w-36 md:w-44
      text-black py-2 px-2 text-center rounded-3xl
    border border-1 border-black hover:border-neutral-950
    transition-colors duration-200 focus:outline-none focus:border-transparent
    disabled:focus-border-transparent 
    `}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
