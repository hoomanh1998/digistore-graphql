interface PropTypes {
  isFocused?: boolean;
  strokeColor?: string;
  forInput?: boolean;
  isMatch?: boolean;
}

export const SearchIcon = ({
  isFocused,
  strokeColor,
  forInput,
  isMatch,
}: PropTypes) => {
  let className = "flex flex-shrink-0 w-6 h-6 stroke-black dark:stroke-white";
  if (strokeColor) {
    className = "flex flex-shrink-0 w-6 h-6";
  }
  if (forInput) {
    className = `flex flex-shrink-0 w-6 h-6 ${
      isFocused
        ? "stroke-black dark:stroke-white"
        : "stroke-dark-gray dark:stroke-light-gray"
    }`;
  }
  if (isMatch) {
    className = `flex flex-shrink-0 w-6 h-6 ${
      isMatch
        ? "stroke-dark-blue dark:stroke-light-blue md:stroke-white"
        : "stroke-black dark:stroke-white"
    }}`;
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};
