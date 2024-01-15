interface PropTypes {
  strokeColor?: string;
  smallIcon?: boolean;
}

export const CloseIcon = ({ strokeColor, smallIcon }: PropTypes) => {
  let defaultStrokeColor = "stroke-black dark:stroke-white";
  if (strokeColor) {
    defaultStrokeColor = strokeColor;
  }
  return (
    <svg
      className={`flex-shrink-0 ${
        smallIcon ? "w-4 h-4" : "w-5 h-5"
      } ${defaultStrokeColor}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
