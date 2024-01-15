interface PropTypes {
  strokeColor?: string;
  isMatch?: boolean | string;
  smallIcon?: boolean;
}

export const HomeIcon = ({
  strokeColor,
  isMatch,
  smallIcon = false,
}: PropTypes) => {
  let className = `${smallIcon ? "w-5 h-5" : "w-6 h-6"} ${
    isMatch
      ? "stroke-dark-blue dark:stroke-light-blue md:stroke-black md:dark:stroke-white"
      : "stroke-black dark:stroke-white md:stroke-white"
  } flex-shrink-0`;
  if (strokeColor) {
    className = `${strokeColor} ${smallIcon ? "w-5 h-5" : "w-6 h-6"}`;
  }
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
};
