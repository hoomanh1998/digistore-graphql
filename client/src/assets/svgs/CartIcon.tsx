interface PropTypes {
  strokeColor?: string;
  isMatch?: boolean;
  smallIcon?: boolean;
}

export const CartIcon = ({ strokeColor, isMatch, smallIcon }: PropTypes) => {
  let className = `flex flex-shrink-0 w-6 h-6 ${
    isMatch
      ? "stroke-light-blue md:stroke-black dark:stroke-white"
      : "stroke-black md:stroke-white dark:stroke-white"
  }`;
  if (strokeColor) {
    className = `flex flex-shrink-0 ${
      smallIcon ? "w-5 h-5" : "w-6 h-6"
    } ${strokeColor}`;
  }
  if (isMatch) {
    className = `w-6 h-6 flex-shrink-0 ${
      isMatch
        ? "stroke-dark-blue dark:stroke-light-blue md:stroke-black md:dark:stroke-white"
        : "stroke-black dark:stroke-white"
    }`;
  }
  return (
    <svg
      className={className}
      fill="none"
      stroke={strokeColor}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
};
