interface PropTypes {
  strokeColor?: string;
  smallIcon?: boolean;
}

export const CubeIcon = ({ strokeColor, smallIcon }: PropTypes) => {
  let className = `${smallIcon ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`;
  if (strokeColor) {
    className = `${strokeColor} ${smallIcon ? "w-5 h-5" : "w-6 h-6"}`;
  }
  return (
    <svg
      className={className}
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
};
