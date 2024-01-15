interface PropTypes {
  strokeColor?: string;
}

export const ArrowDownIcon = ({ strokeColor }: PropTypes) => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke={strokeColor}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};
