interface PropTypes {
  strokeColor?: string;
}

export const HamburgerMenuIcon = ({ strokeColor }: PropTypes) => {
  return (
    <svg
      className="w-6 h-6 flex flex-shrink-0 stroke-white"
      fill="none"
      stroke={strokeColor}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};
