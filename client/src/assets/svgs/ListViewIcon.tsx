interface PropTypes {
  smallIcon?: boolean;
  strokeColor?: string;
}

export const ListViewIcon = ({ smallIcon, strokeColor }: PropTypes) => {
  let className = `${
    smallIcon ? "w-5 h-5" : "w-6 h-6"
  } stroke-black dark:stroke-white`;
  if (strokeColor) {
    className = smallIcon ? "w-5 h-5" : "w-6 h-6";
  }
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );
};
