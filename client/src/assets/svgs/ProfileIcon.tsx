interface PropTypes {
  smallIcon?: boolean;
  strokeColor?: string;
  isMatch?: boolean;
}

export const ProfileIcon = ({ smallIcon, strokeColor, isMatch }: PropTypes) => {
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
};
