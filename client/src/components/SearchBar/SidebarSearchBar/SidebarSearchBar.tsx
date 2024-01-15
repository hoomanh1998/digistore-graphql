import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useDidMount } from "../../../hooks";
import { uiActions } from "../../../store/ui";
import { SearchResult } from "../SearchResult";
import { SearchInputPropTypes, UI } from "../../../ts/types";
import { CloseIcon, SearchIcon } from "../../../assets/svgs";

export const SidebarSearchBar = ({
  inputChangeHandler,
  onFocus,
  onBlur,
  value,
  isFocused,
  searchTabClicked,
  onClearInput,
  fetchedQueryData,
}: SearchInputPropTypes) => {
  const dispatch = useDispatch();
  const { isSearching, showSidebar } = useSelector((state: UI) => state.ui);
  const location = useLocation();
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInputPlaceholder, setShowInputPlaceholder] = useState(true);

  const onClickHandler = () => {
    if (value.length > 0) {
      dispatch(uiActions.setIsSearching(true));
    }
  };

  useDidMount(setShowInputPlaceholder, showSidebar);

  return (
    <div
      className={`flex flex-row items-center dark:text-white rounded-xl transition-transform duration-200 ease-in-out group bg-white dark:bg-gray-700 ${
        showSidebar ? "p-0" : "p-3"
      }`}
    >
      <div
        className={`${
          showSidebar
            ? "absolute left-3 top-1/2 transform -translate-y-1/2"
            : "relative"
        }`}
      >
        <button
          aria-label="search"
          className="flex flex-row items-center focus:outline-none"
          type="submit"
        >
          <SearchIcon isFocused={isFocused} />
        </button>
      </div>
      {showSidebar && (
        <div>
          <input
            className={`input text-gray-800 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:text-white border-none dark:border-gray-600 focus:ring-gray-300 dark:focus:ring-gray-600 rounded-xl transition-spacing transition-placeholder-opacity duration-300 ${
              showInputPlaceholder
                ? "pl-11 show-input-placeholder"
                : "pl-0 hide-input-placeholder"
            }`}
            ref={inputRef}
            onChange={(event) => inputChangeHandler(event)}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClickHandler}
            onTransitionEnd={() =>
              searchTabClicked && inputRef.current?.focus()
            }
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                dispatch(uiActions.toggleSideBar());
                history.replace({
                  pathname: "/home/products",
                  search: `?search=${value}`,
                });
              }
            }}
            type="text"
            placeholder="Search products..."
            value={value}
          />
          <div
            className={`absolute right-0 mr-3 p-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-200 dark:bg-gray-500 active:bg-gray-100 transition-opacity cursor-pointer ${
              value.length > 0 ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
            onClick={() => value.length > 0 && onClearInput && onClearInput()}
          >
            <CloseIcon smallIcon />
          </div>
          {location.pathname !== "/home/products" && isSearching && (
            <SearchResult
              productsResult={
                fetchedQueryData &&
                fetchedQueryData.data &&
                fetchedQueryData.data.searchProducts
              }
              loading={fetchedQueryData && fetchedQueryData.loading}
              error={fetchedQueryData && fetchedQueryData.error}
              searchQuery={value}
            />
          )}
        </div>
      )}
    </div>
  );
};
