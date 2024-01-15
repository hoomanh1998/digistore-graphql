interface PropTypes {
  smallIcon?: boolean;
}

export const DarkModeIcon = ({ smallIcon }: PropTypes) => {
  return (
    <svg
      className={`${smallIcon ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`}
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
};
