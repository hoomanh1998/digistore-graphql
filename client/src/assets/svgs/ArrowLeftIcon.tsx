interface PropTypes {
  disabled?: boolean;
  strokeColor?: string;
}

export const ArrowLeftIcon = ({ disabled, strokeColor }: PropTypes) => {
  let className = `w-5 h-5 ${
    disabled ? "stroke-dark-gray" : "stroke-black dark:stroke-white"
  }`;
  if (strokeColor) {
    className = `w-5 h-5 ${strokeColor}`;
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};
