import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { useLockBodyScroll } from "../../../hooks";
import { GET_SEARCH_PRODUCTS } from "../../../graphQL";
import { ProfileCard } from "../../ProfileCard";
import { NavigationItems } from "../NavigationItems";
import { SearchBar } from "../../SearchBar";
import { Tooltip } from "../../UI";
import { HamburgerMenuIcon } from "../../../assets/svgs";
import { uiActions } from "../../../store/ui";
import { UI } from "../../../ts/types";

export function DesktopSidebar() {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state: UI) => state.ui.showSidebar);
  const location = useLocation<string>();
  const [searchTabClicked, setSearchTabClicked] = useState(false);

  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSideBar());
  };

  const [getSearchProducts, fetchedQueryData] =
    useLazyQuery(GET_SEARCH_PRODUCTS);

  useLockBodyScroll(showSidebar);

  return (
    <nav className="flex flex-col select-none z-40">
      <div
        className={`fixed left-0 top-0 flex flex-col justify-between h-full w-64 bg-blue-500  dark:bg-gray-900 transition-transform transform-gpu duration-200 ease-in-out p-3 z-40 ${
          showSidebar ? "translate-x-0" : "-translate-x-46"
        }`}
      >
        <div className="flex flex-row justify-between items-center relative text-white pointer-events-auto mb-1 ml-3">
          <span className="inline-block font-bold text-2xl">DigiStore</span>
          <div
            onClick={() => {
              toggleSidebarHandler();
              setSearchTabClicked(false);
            }}
            className="relative p-3 cursor-pointer"
          >
            <HamburgerMenuIcon />
          </div>
        </div>
        <div
          className={`flex flex-col justify-between h-full ${
            showSidebar ? "items-start" : "items-end"
          }`}
        >
          <ul
            className={`w-full flex flex-col ${
              showSidebar ? "items-start" : "items-end"
            }`}
          >
            {location.pathname !== "/home/products" && (
              <li
                className={`relative group mb-3 cursor-pointer transition-width duration-150 ease-in-out z-50 ${
                  showSidebar ? "w-full" : "w-12"
                }`}
                onClick={() => {
                  if (!showSidebar && toggleSidebarHandler) {
                    toggleSidebarHandler();
                    setSearchTabClicked(true);
                  }
                }}
              >
                <SearchBar
                  searchTabClicked={searchTabClicked}
                  getSearchProducts={getSearchProducts}
                  sidebarSearchBar={true}
                  fetchedQueryData={fetchedQueryData}
                />
                {!showSidebar && <Tooltip title="Search" />}
              </li>
            )}
            <NavigationItems />
          </ul>
          <ProfileCard />
        </div>
      </div>
      {showSidebar && (
        <div
          onClick={toggleSidebarHandler}
          className="animate-appear fixed left-0 top-0 w-full h-full bg-black bg-opacity-60 dark:bg-opacity-80 z-30"
        />
      )}
    </nav>
  );
}
