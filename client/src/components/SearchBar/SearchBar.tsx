import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NormalSearchBar } from "./NormalSearchBar";
import { SidebarSearchBar } from "./SidebarSearchBar";
import { SearchPropTypes } from "../../ts/types";
import { uiActions } from "../../store/ui";
import { useSearchQuery } from "../../hooks";
import { filterActions } from "../../store/filter";
import { useHistory } from "react-router-dom";

export const SearchBar = ({
  searchTabClicked,
  getSearchProducts,
  sidebarSearchBar,
  fetchedQueryData,
}: SearchPropTypes) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const searchQuery = useSearchQuery();
  const searchValue = searchQuery.get("search");

  const [state, setState] = useState({
    value: searchValue ? searchValue : "",
    isFocused: false,
  });

  const { value, isFocused } = state;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, value: event.target.value }));
    event.target.value === "" && dispatch(uiActions.setIsSearching(false));
    if (event.target.value) {
      dispatch(uiActions.setIsSearching(true));
      getSearchProducts({
        variables: { searchQuery: event.target.value },
      });
    }
  };

  const clearInputHandler = () => {
    setState({ value: "", isFocused: false });
    dispatch(uiActions.setIsSearching(false));
    searchQuery.delete("search");
    history.replace({
      search: searchQuery.toString(),
    });
  };

  const onFocus = () => {
    dispatch(filterActions.resetActiveFilter());
    setState((prevState) => ({ ...prevState, isFocused: true }));
  };

  const onBlur = () => {
    setState((prevState) => ({ ...prevState, isFocused: false }));
  };

  useEffect(() => {
    if (searchValue) {
      getSearchProducts({
        variables: { searchQuery: searchValue },
      });
      dispatch(uiActions.setIsSearching(true));
    }
  }, [searchValue, getSearchProducts, dispatch]);

  const searchBar = sidebarSearchBar ? (
    <SidebarSearchBar
      inputChangeHandler={inputChangeHandler}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      isFocused={isFocused}
      onClearInput={clearInputHandler}
      searchTabClicked={searchTabClicked}
      fetchedQueryData={fetchedQueryData}
    />
  ) : (
    <NormalSearchBar
      inputChangeHandler={inputChangeHandler}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      isFocused={isFocused}
      onClearInput={clearInputHandler}
    />
  );

  return searchBar;
};
