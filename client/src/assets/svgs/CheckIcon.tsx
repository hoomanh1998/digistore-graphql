interface PropTypes {
  strokeColor?: string;
}

export const CheckIcon = ({ strokeColor }: PropTypes) => {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0 stroke-white"
      fill="none"
      stroke={strokeColor}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};
