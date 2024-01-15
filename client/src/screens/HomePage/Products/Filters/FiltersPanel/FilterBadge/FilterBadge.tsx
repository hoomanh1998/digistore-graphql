import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CloseIcon } from "../../../../../../assets/svgs";
import { FilterBadgePropTypes } from "../../../../../../ts/types";
import { useSearchQuery } from "../../../../../../hooks";
import { filterActions } from "../../../../../../store/filter";

export const FilterBadge = ({
  name,
  onHideFiltersPanel,
}: FilterBadgePropTypes) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchQuery = useSearchQuery();

  return (
    <div className="relative flex flex-row justify-between bg-gray-200 dark:bg-gray-800 select-none rounded-2xl mr-2 mb-2 last:mb-0 px-4 md:px-3 py-2 md:py-1.5">
      <div className="font-semibold dark:text-white mr-2 pr-5">{name}</div>
      <div
        onClick={() => {
          searchQuery.delete("filterId");
          history.replace({
            search: searchQuery.toString(),
          });
          dispatch(filterActions.resetActiveFilter());
          onHideFiltersPanel && onHideFiltersPanel();
        }}
        className="absolute right-2 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer p-1"
      >
        <CloseIcon smallIcon />
      </div>
    </div>
  );
};
