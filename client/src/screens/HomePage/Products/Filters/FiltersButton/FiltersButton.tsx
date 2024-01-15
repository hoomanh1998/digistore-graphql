import { FilterIcon } from "../../../../../assets/svgs";
import { FiltersButtonPropTypes } from "../../../../../ts/types";

export function FiltersButton({
  activeFilter,
  showFiltersPanel,
  onShowFiltersPanel,
}: FiltersButtonPropTypes) {
  let extraClasses = showFiltersPanel
    ? "bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-inner"
    : "bg-white dark:bg-gray-600 border-gray-300 dark:border-transparent";

  if (activeFilter.active) {
    extraClasses = `bg-blue-500 border-transparent ${
      showFiltersPanel ? "shadow-inner bg-opacity-70" : ""
    }`;
  }

  return (
    <button
      onClick={onShowFiltersPanel}
      className={`btn flex justify-center items-center border rounded-xl md:cursor-pointer p-3 ${extraClasses}`}
    >
      <FilterIcon
        strokeColor={
          activeFilter.active
            ? "stroke-white"
            : "stroke-black dark:stroke-white"
        }
      />
    </button>
  );
}
