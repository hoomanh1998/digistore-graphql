import { useMediaQuery } from "../../../hooks";
import { BadgePropTypes } from "../../../ts/types";

export const Badge = ({ badgeNumber, sidebarOpen }: BadgePropTypes) => {
  const { isMobile } = useMediaQuery();
  const badge = isMobile ? (
    <div className="flex justify-center items-center w-2 h-2 absolute top-0 -right-2 rounded-full bg-red-400" />
  ) : (
    <div
      className={`absolute text-sm text-center text-white font-semibold w-5 h-5 rounded-full bg-red-400 opacity-0 ${
        sidebarOpen ? "animate-badge-full" : "animate-badge-min"
      }`}
    >
      {badgeNumber && badgeNumber > 0 && <span>{badgeNumber}</span>}
    </div>
  );
  return badge;
};
