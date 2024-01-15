import { useMediaQuery } from "../../../../../hooks";
import { FiltersPanelPropTypes } from "../../../../../ts/types";
import { FilterItem } from "./FilterItem";
import { FilterBadge } from "./FilterBadge";
import { Button } from "../../../../../components/UI";
import { CloseIcon } from "../../../../../assets/svgs";

export function FiltersPanel({
  filters,
  activeFilter,
  showFiltersPanel,
  onActiveFilter,
  onHideFiltersPanel,
}: FiltersPanelPropTypes) {
  const { isMobile } = useMediaQuery();

  const filtersPanel = isMobile ? (
    <div
      className={`fixed w-full h-full right-0 bottom-0 flex flex-col p-5 bg-white dark:bg-gray-700 transform transition-transform duration-300 ease-in-out shadow-md z-40 ${
        showFiltersPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex flex-col min-w-56 max-w-xs">
        <h4 className="font-bold text-3xl md:text-2xl dark:text-white mb-8 md:mb-5">
          Filters
        </h4>
        <div
          onClick={onHideFiltersPanel}
          className="absolute right-3 top-3 bg-gray-100 dark:bg-gray-800 shadow-md rounded-full p-3"
        >
          <CloseIcon />
        </div>
        {filters &&
          filters.map(({ id, name }) => (
            <FilterItem
              key={id}
              id={id}
              name={name}
              active={id === activeFilter.id}
              setActive={onActiveFilter}
            />
          ))}
        <div className="flex flex-row items-start flex-wrap">
          {activeFilter.name && activeFilter.name.length > 0 && (
            <div className="flex flex-row items-center w-full border-t border-gray-200 dark:border-gray-600 py-3">
              <span className="font-semibold dark:text-white mr-3">
                Selected Filters:
              </span>
              <FilterBadge
                name={activeFilter.name}
                onHideFiltersPanel={onHideFiltersPanel && onHideFiltersPanel}
              />
            </div>
          )}
        </div>
        {activeFilter.active && (
          <Button color="btn-blue" onClick={onHideFiltersPanel} positionFixed>
            Show Filtered Products
          </Button>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="flex flex-col min-w-56 max-w-xs mb-4">
        <h4 className="font-bold text-2xl md:text-1xl dark:text-white mb-5">
          Filters
        </h4>
        {filters &&
          filters.map(({ id, name }) => (
            <FilterItem
              key={id}
              id={id}
              name={name}
              active={id === activeFilter.id}
              setActive={onActiveFilter}
            />
          ))}
      </div>
      <div className="flex flex-row items-start flex-wrap">
        {activeFilter.name && activeFilter.name.length > 0 && (
          <div className="flex flex-row items-center w-full border-t border-gray-200 dark:border-gray-600 pt-3">
            <span className="font-semibold dark:text-white mr-3">
              Selected Filters:{" "}
            </span>
            <FilterBadge name={activeFilter.name} />
          </div>
        )}
      </div>
    </div>
  );

  return filtersPanel;
}
