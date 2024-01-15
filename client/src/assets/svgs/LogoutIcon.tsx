interface PropTypes {
  smallIcon?: boolean;
  strokeColor?: string;
}

export const LogoutIcon = ({ smallIcon, strokeColor }: PropTypes) => {
  let className = `${
    smallIcon ? "w-5 h-5" : "w-6 h-6"
  } stroke-black dark:stroke-white`;
  if (strokeColor) {
    className = `${smallIcon ? "w-5 h-5" : "w-6 h-6"} stroke-${strokeColor}`;
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
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
};
