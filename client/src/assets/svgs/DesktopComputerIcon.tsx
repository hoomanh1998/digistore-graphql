interface PropTypes {
  strokeColor?: string;
  smallIcon?: boolean;
}

export const CogIcon = ({ smallIcon, strokeColor }: PropTypes) => {
  let className = `${
    smallIcon ? "w-5 h-5" : "w-6 h-6"
  } stroke-black dark:stroke-white`;
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
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
};
