import { NavLink, Route } from "react-router-dom";
import { ToggleTheme } from "../../../../../components/ToggleTheme";
import { profileNavigationItems } from "../../profileNavigationItems";
import { ProfileNavigationListPropTypes } from "../../../../../ts/types";
import { ArrowRightIcon, LogoutIcon } from "../../../../../assets/svgs";

export const ProfileNavigationList = ({
  openLogoutModal,
}: ProfileNavigationListPropTypes) => {
  return (
    <ul className="flex flex-col h-full w-full space-y-3 p-3 select-none">
      {profileNavigationItems.map(({ title, path, icon: Icon }, index) => (
        <li key={index}>
          <Route
            path={path}
            children={({ match }) => (
              <NavLink
                activeClassName="bg-gradient-to-br from-blue-500 dark:from-blue-700 to-blue-400 dark:to-blue-500"
                className="flex rounded-xl bg-white dark:bg-gray-700 dark:text-white font-semibold cursor-pointer px-3 py-3 border border-gray-300 dark:border-transparent"
                to={path}
              >
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-row">
                    <Icon
                      strokeColor={`${
                        match
                          ? "stroke-white"
                          : "stroke-black dark:stroke-white"
                      }`}
                      smallIcon
                    />
                    <p
                      className={`ml-3 leading-snug ${
                        match ? "text-white" : "text-dark"
                      }`}
                    >
                      {title}
                    </p>
                  </div>
                  <ArrowRightIcon
                    strokeColor={`${match ? "stroke-white" : ""}`}
                  />
                </div>
              </NavLink>
            )}
          />
        </li>
      ))}
      <ToggleTheme />
      <li
        onClick={(event) => {
          event.preventDefault();
          openLogoutModal();
        }}
      >
        <div className="flex justify-center rounded-xl bg-red-400 dark:text-white font-semibold cursor-pointer px-4 py-3 border border-gray-300 dark:border-transparent">
          <span className="font-bold text-white leading-snug mr-2">Logout</span>
          <LogoutIcon strokeColor="white" smallIcon />
        </div>
      </li>
    </ul>
  );
};
