import { useMediaQuery } from "../../../../hooks";
import { Route, NavLink, useLocation } from "react-router-dom";
import { Badge, Tooltip } from "../../../UI";
import { NavigationItemPropTypes } from "../../../../ts/types";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../../../hoc/store";
import { pathActions } from "../../../../store/path";

export const NavigationItem = ({
  title,
  path,
  icon: Icon,
  isPrivateRoue,
  isExactPath,
  hasBadge,
  badge,
  showSidebar,
  onCloseSidebar,
}: NavigationItemPropTypes) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();
  const { isAuthenticated } = useContext(AuthContext);

  const loginPathHandler = () => {
    dispatch(
      pathActions.setLoginFullPath({
        prev: pathname,
        next: path,
      })
    );
  };

  const navigationItem = isMobile ? (
    <li
      onClick={() => !isAuthenticated() && isPrivateRoue && loginPathHandler()}
      className="flex flex-col items-center flex-1"
    >
      <Route
        exact={isExactPath}
        path={path}
        children={({ match }) => (
          <NavLink
            className="relative flex flex-col items-center w-max"
            to={path}
          >
            {hasBadge && badge && badge.show && <Badge />}
            <Icon isMatch={match ? true : false} />
            <span
              className={`text-sm font-semibold inline-block tracking-wide leading-snug mt-1 ${
                match
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-black dark:text-white"
              }`}
            >
              {title}
            </span>
          </NavLink>
        )}
      />
    </li>
  ) : (
    <li
      onClick={() => {
        showSidebar && onCloseSidebar && onCloseSidebar();
      }}
      className={`flex transition-width duration-150 ease-in-out mb-3 ${
        showSidebar ? "w-full justify-end items-end" : "w-12"
      }`}
    >
      <Route
        exact={isExactPath}
        path={path}
        children={({ match }) => (
          <NavLink
            exact={isExactPath}
            activeClassName={`bg-gradient-to-br from-blue-100 dark:from-blue-700 to-blue-200 dark:to-blue-500 transition-width duration-75 ease-in-out ${
              showSidebar ? "w-full" : "w-12"
            }`}
            className={`w-full flex flex-row items-center relative dark:text-white rounded-xl transition-all duration-150 ease-in-out group h-12 p-3 ${
              match
                ? "hover:bg-blue-500"
                : "hover:bg-blue-400 dark:hover:bg-gray-700"
            }`}
            to={path}
          >
            {hasBadge && badge && badge.show && (
              <Badge badgeNumber={badge.number} sidebarOpen={showSidebar} />
            )}
            <Icon isMatch={match ? true : false} />
            <span
              className={`text-lg font-semibold transition-navigation-items transform-gpu duration-100 ease-in-out leading-snug ${
                showSidebar
                  ? "opacity-100 scale-100 w-auto ml-5"
                  : "opacity-0 scale-0 w-0 ml-0"
              } ${match ? "text-black dark:text-white" : "text-white"}`}
            >
              {title}
            </span>
            {!showSidebar && <Tooltip title={title} match={match} />}
          </NavLink>
        )}
      />
    </li>
  );

  return navigationItem;
};
