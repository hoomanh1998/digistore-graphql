import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery, useSearchQuery } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { GET_CATEGORIES } from "../../../../graphQL";
import { uiActions } from "../../../../store/ui";
import { FiltersPanel } from "./FiltersPanel";
import { FiltersButton } from "./FiltersButton";
import { CategoriesData, FiltersPropTypes } from "../../../../ts/types";
import { filterActions } from "../../../../store/filter";

export function Filters({ activeFilter }: FiltersPropTypes) {
  const dispatch = useDispatch();

  const searchQuery = useSearchQuery();

  const filterId = searchQuery.get("filterId")!;

  const { isMobile } = useMediaQuery();

  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const { data } = useQuery<CategoriesData>(GET_CATEGORIES);

  const categoryFilters = data && data.categories;

  const setActiveFilterHandler = useCallback(
    (id: string) => {
      if (categoryFilters) {
        for (let categoryFilter of categoryFilters) {
          if (categoryFilter.id === id) {
            dispatch(uiActions.setIsSearching(false));
            dispatch(
              filterActions.setActiveFilter({
                id: categoryFilter.id,
                name: categoryFilter.name,
                active: true,
              })
            );
          }
        }
      }
    },
    [categoryFilters, dispatch]
  );

  const showFiltersPanelHandler = () => {
    setShowFiltersPanel(true);
  };

  const hideFiltersPanelHandler = () => {
    setShowFiltersPanel(false);
  };

  useEffect(() => {
    setActiveFilterHandler(filterId);
    return () => {
      dispatch(filterActions.resetActiveFilter());
    };
  }, [setActiveFilterHandler, dispatch, filterId]);

  return (
    <div className="flex flex-col relative">
      {isMobile && (
        <FiltersButton
          activeFilter={activeFilter}
          showFiltersPanel={showFiltersPanel}
          onShowFiltersPanel={showFiltersPanelHandler}
        />
      )}
      <FiltersPanel
        filters={categoryFilters}
        activeFilter={activeFilter}
        showFiltersPanel={showFiltersPanel}
        onActiveFilter={setActiveFilterHandler}
        onHideFiltersPanel={hideFiltersPanelHandler}
      />
    </div>
  );
}
