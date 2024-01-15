import { TooltipPropTypes } from "../../../ts/types";

export const Tooltip = ({ title, match }: TooltipPropTypes) => {
  return (
    <div
      className={`absolute top-2 left-14 rounded-lg shadow-lg transition-opacity delay-75 duration-150 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-500 pointer-events-none px-3 py-1 ${
        match
          ? "text-blck dark:text-white bg-blue-100 dark:bg-blue-500"
          : "text-white bg-blue-400 dark:bg-gray-700"
      }`}
    >
      {title}
    </div>
  );
};
